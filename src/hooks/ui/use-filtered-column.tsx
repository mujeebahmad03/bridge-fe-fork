import { isAfter, isBefore, isEqual } from "date-fns";
import { DateRange } from "react-day-picker";

import { useTaskBoardStore, useTaskFiltersStore } from "@/lib/stores/tasks";
import { Task } from "@/types/task";

// Selector for filtered columns
export const useFilteredColumns = () => {
  const columns = useTaskBoardStore((state) => state.columns);
  const filters = useTaskFiltersStore((state) => state.filters);

  const isDateInRange = (
    taskDate: Date,
    dateRange?: DateRange,
    singleDate?: Date,
  ) => {
    if (singleDate) {
      return isEqual(taskDate, singleDate);
    }

    if (dateRange?.from) {
      const isAfterFrom =
        isAfter(taskDate, dateRange.from) || isEqual(taskDate, dateRange.from);
      if (dateRange.to) {
        return (
          isAfterFrom &&
          (isBefore(taskDate, dateRange.to) || isEqual(taskDate, dateRange.to))
        );
      }
      return isAfterFrom;
    }

    return true;
  };

  const matchesSearchQuery = (task: Task, query: string) => {
    if (!query) return true;

    const searchLower = query.toLowerCase();
    return (
      task.title.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower) ||
      task.campaign.toLowerCase().includes(searchLower)
    );
  };

  return columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter(
      (task) =>
        (filters.priority === "all" || task.priority === filters.priority) &&
        (filters.associatedWith === "all" ||
          task.associatedWith === filters.associatedWith) &&
        matchesSearchQuery(task, filters.searchQuery) &&
        isDateInRange(task.dueDate, filters.dateRange, filters.singleDate) &&
        (filters.assignedToFilter === "" ||
          task.assignedTo === filters.assignedToFilter) &&
        (filters.campaignFilter === "all" ||
          task.campaign === filters.campaignFilter) &&
        (!filters.showAssignedOnly ||
          (task.assignedTo && task.assignedTo !== "")),
    ),
  }));
};
