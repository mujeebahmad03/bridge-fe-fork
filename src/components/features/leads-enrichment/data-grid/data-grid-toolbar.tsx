"use client";

import { useState } from "react";
import { Eye, Play } from "lucide-react";

import { useDataGrid } from "./data-grid-context";
import { FilterPanel } from "./filters";
import {
  Button,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import { SortPanel } from "./sort";
import { RowHeightSelector } from "./row-height";

import { cn } from "@/lib/utils";
import { SearchPanel } from "./search/search-panel";
import { CSVImport, ExportCSV } from "./csv-import-export";

export function DataGridToolbar() {
  const { columns, setColumns, rowHeight, setRowHeight } = useDataGrid();

  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);

  const hiddenColumns = columns.filter((col) => col.hidden);
  const visibilityLabel =
    hiddenColumns.length === 0
      ? "Show/hide columns"
      : `${hiddenColumns.length} hidden column${hiddenColumns.length === 1 ? "" : "s"}`;

  const handleColumnVisibility = (columnId: string, isVisible: boolean) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, hidden: !isVisible } : col,
      ),
    );
  };

  const handleHideAll = () => {
    setColumns(columns.map((col) => ({ ...col, hidden: true })));
  };

  const handleShowAll = () => {
    setColumns(columns.map((col) => ({ ...col, hidden: false })));
  };

  return (
    <TooltipProvider>
      <div className="flex items-center justify-between gap-4 border-b p-2">
        <div className="flex items-center gap-1">
          <Popover open={isVisibilityOpen} onOpenChange={setIsVisibilityOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      hiddenColumns.length > 0 && "text-primary",
                    )}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">{visibilityLabel}</TooltipContent>
            </Tooltip>

            <PopoverContent
              className="w-[240px] p-0"
              align="start"
              side="bottom"
            >
              <div className="border-b p-2 text-sm font-medium">
                {visibilityLabel}
              </div>
              <div className="space-y-2 p-2">
                {columns.map((column) => (
                  <label
                    key={column.id}
                    className="flex cursor-pointer items-center space-x-2"
                  >
                    <Checkbox
                      checked={!column.hidden}
                      onCheckedChange={(checked) =>
                        handleColumnVisibility(column.id, !!checked)
                      }
                      className="border-primary data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                    />
                    <span className="text-sm">{column.name}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center justify-between border-t p-2">
                <Button variant="outline" size="sm" onClick={handleHideAll}>
                  Hide all
                </Button>
                <Button variant="outline" size="sm" onClick={handleShowAll}>
                  Show all
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <FilterPanel />
          <SortPanel />
          <RowHeightSelector value={rowHeight} onChange={setRowHeight} />
          <SearchPanel />
        </div>

        <div className="flex items-center gap-2">
          <CSVImport />
          <ExportCSV />
          <Button>
            <Play className="mr-2 size-4" />
            Run
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}
