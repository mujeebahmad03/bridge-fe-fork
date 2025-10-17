import { X } from "lucide-react";

import { FiltersSheet } from "./filters-sheet";
import { SearchInput } from "./search-input";
import { Button } from "@/components/ui";

import { useTaskFiltersStore } from "@/lib/stores/tasks";

export const TaskFilters = () => {
  const {
    searchQuery,
    priority: priorityFilter,
    associatedWith: associatedWithFilter,
    dateRange,
    singleDate,
    assignedToFilter,
    showAssignedOnly,
  } = useTaskFiltersStore((state) => state.filters);

  const updateFilter = useTaskFiltersStore((state) => state.updateFilter);

  const clearFilters = useTaskFiltersStore((state) => state.clearFilters);

  const hasActiveFilters =
    searchQuery !== "" ||
    priorityFilter !== "all" ||
    associatedWithFilter !== "all" ||
    dateRange !== undefined ||
    singleDate !== undefined ||
    assignedToFilter !== "" ||
    showAssignedOnly;

  return (
    <div className="flex items-center gap-2">
      <SearchInput
        value={searchQuery}
        onChange={(value) => updateFilter("searchQuery", value)}
      />

      <FiltersSheet />

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};
