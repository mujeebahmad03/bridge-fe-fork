import { useState, useMemo, useCallback } from "react";
import { DateRange } from "react-day-picker";
import { isAfter, isBefore, isEqual } from "date-fns";

import { taskColumns } from "@/config/task-columns";
import { ColumnType, Task, TaskFiltersType, TaskStatus } from "@/types/task";

interface SavedFilter {
  id: string;
  name: string;
  filters: TaskFiltersType;
}

export const useTaskBoard = () => {
  const [columns, setColumns] = useState<ColumnType[]>(taskColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [showTaskList, setShowTaskList] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [filters, setFilters] = useState<TaskFiltersType>({
    priority: "all",
    associatedWith: "all",
    dateRange: undefined,
    singleDate: undefined,
    searchQuery: "",
    assignedToFilter: "",
    campaignFilter: "all",
    showAssignedOnly: false,
  });
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  };

  const selectAllInColumn = (columnId: string, taskIds: string[]) => {
    setSelectedTasks((prev) => {
      const otherColumnSelections = prev.filter(
        (id) =>
          !columns
            .find((col) => col.id === columnId)
            ?.tasks.some((task) => task.id === id),
      );
      return [...otherColumnSelections, ...taskIds];
    });
  };

  const assignSelectedTasks = (userId: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks: col.tasks.map((task) =>
          selectedTasks.includes(task.id)
            ? { ...task, assignedTo: userId }
            : task,
        ),
      })),
    );
    setSelectedTasks([]);
  };

  const moveSelectedTasks = (targetColumnId: string) => {
    const targetColumn = columns.find((col) => col.id === targetColumnId);

    if (!targetColumn) return;

    const newStatus =
      targetColumnId === "done"
        ? TaskStatus.DONE
        : targetColumnId === "inProgress"
          ? TaskStatus.IN_PROGRESS
          : TaskStatus.TODO;

    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks:
          col.id === targetColumnId
            ? [
                ...col.tasks,
                ...selectedTasks
                  .map((taskId) => {
                    const task = prev
                      .flatMap((c) => c.tasks)
                      .find((t) => t.id === taskId);
                    return task ? { ...task, status: newStatus } : null;
                  })
                  .filter((task): task is Task => task !== null),
              ]
            : col.tasks.filter((task) => !selectedTasks.includes(task.id)),
      })),
    );
    setSelectedTasks([]);
  };

  const isDateInRange = useCallback(
    (taskDate: Date, dateRange?: DateRange, singleDate?: Date) => {
      if (singleDate) {
        return isEqual(taskDate, singleDate);
      }

      if (dateRange?.from) {
        const isAfterFrom =
          isAfter(taskDate, dateRange.from) ||
          isEqual(taskDate, dateRange.from);
        if (dateRange.to) {
          return (
            isAfterFrom &&
            (isBefore(taskDate, dateRange.to) ||
              isEqual(taskDate, dateRange.to))
          );
        }
        return isAfterFrom;
      }

      return true;
    },
    [],
  );

  const matchesSearchQuery = useCallback((task: Task, query: string) => {
    if (!query) return true;

    const searchLower = query.toLowerCase();
    return (
      task.title.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower) ||
      task.campaign.toLowerCase().includes(searchLower)
    );
  }, []);

  const filteredColumns = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter(
        (task) =>
          // Existing filters
          (filters.priority === "all" || task.priority === filters.priority) &&
          (filters.associatedWith === "all" ||
            task.associatedWith === filters.associatedWith) &&
          matchesSearchQuery(task, filters.searchQuery) &&
          isDateInRange(task.dueDate, filters.dateRange, filters.singleDate) &&
          // New filters
          (filters.assignedToFilter === "" ||
            task.assignedTo === filters.assignedToFilter) &&
          (filters.campaignFilter === "all" ||
            task.campaign === filters.campaignFilter) &&
          (!filters.showAssignedOnly ||
            (task.assignedTo && task.assignedTo !== "")),
      ),
    }));
  }, [columns, filters, isDateInRange, matchesSearchQuery]);

  const updateFilter = useCallback(
    <K extends keyof TaskFiltersType>(key: K, value: TaskFiltersType[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleSaveFilter = useCallback(() => {
    const newFilter: SavedFilter = {
      id: `filter-${Date.now()}`,
      name: `Filter ${savedFilters.length + 1}`,
      filters: { ...filters },
    };
    setSavedFilters((prev) => [...prev, newFilter]);
  }, [filters, savedFilters.length]);

  const handleApplyFilter = useCallback(
    (filterId: string) => {
      const filter = savedFilters.find((f) => f.id === filterId);
      if (filter) {
        setFilters(filter.filters);
      }
    },
    [savedFilters],
  );

  const clearFilters = useCallback(() => {
    setFilters({
      priority: "all",
      associatedWith: "all",
      dateRange: undefined,
      singleDate: undefined,
      searchQuery: "",
      assignedToFilter: "",
      campaignFilter: "all",
      showAssignedOnly: false,
    });
  }, []);

  return {
    columns,
    setColumns,
    activeTask,
    setActiveTask,
    showTaskList,
    setShowTaskList,

    filters,
    updateFilter,
    savedFilters,
    clearFilters,

    selectedTasks,
    toggleTaskSelection,
    assignSelectedTasks,
    selectAllInColumn,
    moveSelectedTasks,

    filteredColumns,
    handleSaveFilter,
    handleApplyFilter,
  };
};
