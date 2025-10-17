import { useMemo } from "react";
import { BaseTableItem, FilterOption } from "../types";

export function useTableFilters<T extends BaseTableItem>(
  data: T[],
  filterableColumns: (keyof T)[],
) {
  return useMemo(() => {
    const filterOptions: Record<string, FilterOption[]> = {};

    filterableColumns.forEach((column) => {
      const counts = data.reduce(
        (acc, item) => {
          const value = item[column] as string;
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      filterOptions[column as string] = Object.entries(counts).map(
        ([value, count]) => ({
          value,
          label: value,
          count,
        }),
      );
    });

    return filterOptions;
  }, [data, filterableColumns]);
}
