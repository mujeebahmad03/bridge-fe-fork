import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterHeaderProps {
  hasActiveFilters: boolean;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export function FilterHeader({
  hasActiveFilters,
  onApplyFilters,
  onClearFilters,
  showFilters,
  onToggleFilters,
}: FilterHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <Button
        variant="outline"
        onClick={onToggleFilters}
        className="flex w-fit items-center gap-2"
      >
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">
          {showFilters ? "Hide Filters" : "Show Filters"}
        </span>
        {hasActiveFilters && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {/* Count indicator */}
          </span>
        )}
      </Button>

      {/* Action Buttons - Only show when filters are visible */}
      {showFilters && (
        <div className="flex flex-col gap-2 sm:flex-row">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="w-full text-muted-foreground hover:text-foreground sm:w-auto"
            >
              Clear all
            </Button>
          )}
          <Button
            onClick={onApplyFilters}
            size="sm"
            disabled={!hasActiveFilters}
            className="w-full sm:w-auto"
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
}
