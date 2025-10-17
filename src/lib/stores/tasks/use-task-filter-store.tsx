import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TaskFiltersType } from "@/types/task";

interface SavedFilter {
  id: string;
  name: string;
  filters: TaskFiltersType;
}

// Filters state with persistence
export interface TaskFiltersState {
  filters: TaskFiltersType;
  savedFilters: SavedFilter[];
  updateFilter: <K extends keyof TaskFiltersType>(
    key: K,
    value: TaskFiltersType[K],
  ) => void;
  saveFilter: (name: string) => void;
  applyFilter: (filterId: string) => void;
  deleteFilter: (filterId: string) => void;
  clearFilters: () => void;
  renameFilter: (filterId: string, newName: string) => void;
}

const defaultFilters: TaskFiltersType = {
  priority: "all",
  associatedWith: "all",
  dateRange: undefined,
  singleDate: undefined,
  searchQuery: "",
  assignedToFilter: "",
  campaignFilter: "all",
  showAssignedOnly: false,
};

export const useTaskFiltersStore = create<TaskFiltersState>()(
  persist(
    (set) => ({
      filters: defaultFilters,
      savedFilters: [],

      updateFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      saveFilter: (name) =>
        set((state) => ({
          savedFilters: [
            ...state.savedFilters,
            {
              id: `filter-${Date.now()}`,
              name,
              filters: { ...state.filters },
            },
          ],
        })),

      applyFilter: (filterId) =>
        set((state) => {
          const filter = state.savedFilters.find((f) => f.id === filterId);
          return filter ? { filters: filter.filters } : state;
        }),

      deleteFilter: (filterId) =>
        set((state) => ({
          savedFilters: state.savedFilters.filter((f) => f.id !== filterId),
        })),

      clearFilters: () =>
        set(() => ({
          filters: defaultFilters,
        })),

      renameFilter: (filterId, newName) =>
        set((state) => ({
          savedFilters: state.savedFilters.map((filter) =>
            filter.id === filterId ? { ...filter, name: newName } : filter,
          ),
        })),
    }),
    {
      name: "task-filters-storage",
      // Only persist the savedFilters
      partialize: (state) => ({ savedFilters: state.savedFilters }),
    },
  ),
);
