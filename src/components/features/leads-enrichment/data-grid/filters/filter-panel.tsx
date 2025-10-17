"use client";

import { useState } from "react";
import { FilterIcon, Plus, Copy, Trash2, MoreHorizontal } from "lucide-react";

import { FilterRow } from "./filter-row";
import { useDataGrid } from "../data-grid-context";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";

import type { Filter, LogicalOperator } from "@/types/leads";

export function FilterPanel() {
  const { columns, data, setData } = useDataGrid();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);

  const addFilter = () => {
    const newFilter: Filter = {
      id: `filter_${Date.now()}`,
      columnId: columns[0].id,
      operator: "contains",
      value: "",
      logicalOperator: "and",
    };
    setFilters([...filters, newFilter]);
  };

  const updateFilter = (id: string, updates: Partial<Filter>) => {
    setFilters(
      filters.map((filter) =>
        filter.id === id ? { ...filter, ...updates } : filter,
      ),
    );
  };

  const updateLogicalOperator = (
    id: string,
    logicalOperator: LogicalOperator,
  ) => {
    setFilters(
      filters.map((filter) =>
        filter.id === id ? { ...filter, logicalOperator } : filter,
      ),
    );
  };

  const duplicateFilter = (id: string) => {
    const filterToDuplicate = filters.find((f) => f.id === id);
    if (filterToDuplicate) {
      const newFilter = {
        ...filterToDuplicate,
        id: `filter_${Date.now()}`,
      };
      setFilters([...filters, newFilter]);
    }
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const removeAllFilters = () => {
    setFilters([]);
  };

  const applyFilters = () => {
    // If no filters, return all data
    if (filters.length === 0) {
      setIsOpen(false);
      return;
    }

    // Apply the first filter (Where)
    const firstFilter = filters[0];
    let filteredData = data.filter((row) => {
      const value = row[firstFilter.columnId];
      switch (firstFilter.operator) {
        case "contains":
          return value.toLowerCase().includes(firstFilter.value.toLowerCase());
        case "does_not_contain":
          return !value.toLowerCase().includes(firstFilter.value.toLowerCase());
        case "is":
          return value.toLowerCase() === firstFilter.value.toLowerCase();
        case "is_not":
          return value.toLowerCase() !== firstFilter.value.toLowerCase();
        case "is_empty":
          return !value;
        case "is_not_empty":
          return !!value;
        default:
          return true;
      }
    });

    // Apply subsequent filters with logical operators
    if (filters.length > 1) {
      for (let i = 1; i < filters.length; i++) {
        const filter = filters[i];
        const logicalOp = filter.logicalOperator || "and";

        if (logicalOp === "and") {
          // AND: Filter the already filtered data
          filteredData = filteredData.filter((row) => {
            const value = row[filter.columnId];
            switch (filter.operator) {
              case "contains":
                return value.toLowerCase().includes(filter.value.toLowerCase());
              case "does_not_contain":
                return !value
                  .toLowerCase()
                  .includes(filter.value.toLowerCase());
              case "is":
                return value.toLowerCase() === filter.value.toLowerCase();
              case "is_not":
                return value.toLowerCase() !== filter.value.toLowerCase();
              case "is_empty":
                return !value;
              case "is_not_empty":
                return !!value;
              default:
                return true;
            }
          });
        } else {
          // OR: Add rows that match this filter but weren't in the filtered data
          const additionalRows = data.filter((row) => {
            // Skip if already in filtered data
            if (filteredData.some((r) => r.id === row.id)) return false;

            const value = row[filter.columnId];
            switch (filter.operator) {
              case "contains":
                return value.toLowerCase().includes(filter.value.toLowerCase());
              case "does_not_contain":
                return !value
                  .toLowerCase()
                  .includes(filter.value.toLowerCase());
              case "is":
                return value.toLowerCase() === filter.value.toLowerCase();
              case "is_not":
                return value.toLowerCase() !== filter.value.toLowerCase();
              case "is_empty":
                return !value;
              case "is_not_empty":
                return !!value;
              default:
                return false;
            }
          });

          // Combine the filtered data with additional rows
          filteredData = [...filteredData, ...additionalRows];
        }
      }
    }

    setData(filteredData);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FilterIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">Filter</TooltipContent>
      </Tooltip>

      <PopoverContent className="w-[800px] p-0" align="start">
        <div className="flex items-center gap-2 border-b p-2">
          <FilterIcon className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">Filters</h2>
        </div>

        <div className="space-y-4 p-4">
          {filters.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No filter conditions are applied
            </div>
          ) : (
            <div className="space-y-4">
              {filters.map((filter, index) => (
                <div key={filter.id} className="flex items-start gap-2">
                  {index === 0 ? (
                    <div className="w-16 py-2 text-sm">Where</div>
                  ) : (
                    <div className="w-20">
                      <Select
                        value={filter.logicalOperator || "and"}
                        onValueChange={(value: string) =>
                          updateLogicalOperator(
                            filter.id,
                            value as LogicalOperator,
                          )
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue className="capitalize" />
                        </SelectTrigger>
                        <SelectContent>
                          {["and", "or"].map((op) => (
                            <SelectItem
                              key={op}
                              value={op}
                              className="capitalize"
                            >
                              {op}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <FilterRow
                    filter={filter}
                    onChange={(updates) => updateFilter(filter.id, updates)}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => duplicateFilter(filter.id)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => removeFilter(filter.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={addFilter}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add filter
          </Button>

          {filters.length > 0 && (
            <>
              <div className="flex items-center justify-between border-t pt-4">
                <Button variant="ghost" size="sm" onClick={removeAllFilters}>
                  Remove all
                </Button>
                <Button size="sm" onClick={applyFilters}>
                  Run
                </Button>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
