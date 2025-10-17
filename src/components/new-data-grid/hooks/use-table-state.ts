import { useState, useMemo } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { BaseTableItem } from "../types";

interface UseTableStateProps<T extends BaseTableItem> {
  data: T[];
  initialPageSize?: number;
  initialSorting?: SortingState;
}

export function useTableState<T extends BaseTableItem>({
  data,
  initialPageSize = 5,
  initialSorting = [],
}: UseTableStateProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Filter by selected filters
      const matchesFilters = Object.entries(selectedFilters).every(
        ([key, values]) => {
          if (!values.length) return true;
          const itemValue = item[key as keyof T] as string;
          return values.includes(itemValue);
        },
      );

      // Filter by search query
      if (!searchQuery) return matchesFilters;

      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchLower);

      return matchesFilters && matchesSearch;
    });
  }, [data, searchQuery, selectedFilters]);

  const updateFilter = (filterKey: string, values: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: values,
    }));
  };

  const clearSearch = () => setSearchQuery("");

  const clearFilters = () => setSelectedFilters({});

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    searchQuery,
    setSearchQuery,
    selectedFilters,
    filteredData,
    columnOrder,
    setColumnOrder,
    updateFilter,
    clearSearch,
    clearFilters,
  };
}
