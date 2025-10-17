"use client";

import { X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DragHandle } from "./drag-handle";
import type { LeadsColumn, Sort, SortDirection } from "@/types/leads";

interface SortItemProps {
  sort: Sort;
  columns: LeadsColumn[];
  availableColumns: LeadsColumn[];
  onUpdate: (id: string, updates: Partial<Sort>) => void;
  onRemove: (id: string) => void;
}

export function SortItem({
  sort,
  columns,
  availableColumns,
  onUpdate,
  onRemove,
}: SortItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sort.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const column = columns.find((col) => col.id === sort.columnId);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 bg-background"
    >
      <DragHandle listeners={listeners} attributes={attributes} />

      <Select
        value={sort.columnId}
        onValueChange={(value) => onUpdate(sort.id, { columnId: value })}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue>{column?.name || "Select column"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableColumns.map((column) => (
            <SelectItem key={column.id} value={column.id}>
              {column.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sort.direction ?? ""}
        onValueChange={(value) =>
          onUpdate(sort.id, { direction: value as SortDirection })
        }
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">A → Z</SelectItem>
          <SelectItem value="desc">Z → A</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10"
        onClick={() => onRemove(sort.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
