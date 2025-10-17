import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTaskFiltersStore } from "@/lib/stores/tasks";

export const SavedFilters = () => {
  const savedFilters = useTaskFiltersStore((state) => state.savedFilters);
  const deleteFilter = useTaskFiltersStore((state) => state.deleteFilter);
  const saveFilter = useTaskFiltersStore((state) => state.saveFilter);
  const applyFilter = useTaskFiltersStore((state) => state.applyFilter);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Saved Filters</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => saveFilter(`Filter ${savedFilters.length + 1}`)}
        >
          Save Current Filter
        </Button>
      </div>

      {savedFilters.length > 0 ? (
        <div className="space-y-2">
          {savedFilters.map((filter) => (
            <div
              key={filter.id}
              className="flex items-center justify-between rounded-md bg-primary/10 p-2"
            >
              <button
                onClick={() => applyFilter(filter.id)}
                className="text-sm transition-colors hover:text-blue-600"
              >
                {filter.name}
              </button>
              <button
                onClick={() => deleteFilter(filter.id)}
                className="text-gray-400 transition-colors hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No saved filters yet</p>
      )}
    </div>
  );
};
