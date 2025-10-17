"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useDataGrid } from "../data-grid-context";

import type { Filter, FilterOperator } from "@/types/leads";

interface FilterRowProps {
  filter: Filter;
  onChange: (updates: Partial<Filter>) => void;
}

const OPERATORS = [
  { value: "contains", label: "Contains" },
  { value: "does_not_contain", label: "Does not contain" },
  { value: "is", label: "Is" },
  { value: "is_not", label: "Is not" },
  { value: "is_empty", label: "Is empty" },
  { value: "is_not_empty", label: "Is not empty" },
] as const;

export function FilterRow({ filter, onChange }: FilterRowProps) {
  const { columns } = useDataGrid();
  const showValueInput = !["is_empty", "is_not_empty"].includes(
    filter.operator,
  );

  return (
    <div className="flex flex-1 items-center gap-2">
      <Select
        value={filter.columnId}
        onValueChange={(value) => onChange({ columnId: value })}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {columns.map((column) => (
            <SelectItem key={column.id} value={column.id}>
              {column.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filter.operator}
        onValueChange={(value) =>
          onChange({ operator: value as FilterOperator })
        }
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {OPERATORS.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showValueInput && (
        <Input
          className="flex-1"
          placeholder="Value"
          value={filter.value}
          onChange={(e) => onChange({ value: e.target.value })}
        />
      )}
    </div>
  );
}
