"use client";

import { SortAsc } from "lucide-react";
import { useState } from "react";

import { useDataGrid } from "../data-grid-context";
import { SortList } from "./sort-list";
import { SortActions } from "./sort-actions";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import type { Sort } from "@/types/leads";

export function SortPanel() {
  const { columns, data, setData } = useDataGrid();
  const [isOpen, setIsOpen] = useState(false);
  const [sorts, setSorts] = useState<Sort[]>([]);

  const addSort = () => {
    const availableColumns = columns.filter(
      (col) => !sorts.some((sort) => sort.columnId === col.id),
    );
    if (availableColumns.length === 0) return;

    const newSort: Sort = {
      id: `sort_${Date.now()}`,
      columnId: availableColumns[0].id,
      direction: "desc",
    };
    setSorts([...sorts, newSort]);
  };

  const updateSort = (id: string, updates: Partial<Sort>) => {
    setSorts(
      sorts.map((sort) => (sort.id === id ? { ...sort, ...updates } : sort)),
    );
  };

  const removeSort = (id: string) => {
    setSorts(sorts.filter((s) => s.id !== id));
  };

  const removeAllSorts = () => {
    setSorts([]);
  };

  const applySorts = () => {
    if (sorts.length === 0) {
      setIsOpen(false);
      return;
    }

    const sortedData = [...data].sort((a, b) => {
      for (const sort of sorts) {
        const aValue = a[sort.columnId].toLowerCase();
        const bValue = b[sort.columnId].toLowerCase();

        if (aValue !== bValue) {
          return sort.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
      }
      return 0;
    });

    setData(sortedData);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <SortAsc className="h-4 w-4" />
              {sorts.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {sorts.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">Sort</TooltipContent>
      </Tooltip>

      <PopoverContent className="w-[400px] p-0" align="start">
        <div className="flex items-center gap-2 border-b p-2">
          <SortAsc className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">Sort</h2>
        </div>

        <div className="space-y-4 p-4">
          {sorts.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No sort options are applied
            </div>
          ) : (
            <SortList
              sorts={sorts}
              columns={columns}
              onSortsChange={setSorts}
              onUpdate={updateSort}
              onRemove={removeSort}
            />
          )}

          <SortActions
            hasSorts={sorts.length > 0}
            canAddSort={sorts.length < columns.length}
            onAddSort={addSort}
            onRemoveAll={removeAllSorts}
            onApply={applySorts}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
