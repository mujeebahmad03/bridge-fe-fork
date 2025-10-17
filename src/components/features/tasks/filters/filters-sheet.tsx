import { Filter } from "lucide-react";

import { AssignmentFilter } from "./assignment-filter";
import { AssociationFilter } from "./association-filter";
import { CampaignFilter } from "./campaign-filter";
import { DueDateFilters } from "./due-date-filters";
import { PriorityFilter } from "./priority-filter";
import { SavedFilters } from "./saved-filters";
import { ReusableSheet } from "@/components/common/modals";
import { Button, ScrollArea, Separator } from "@/components/ui";

import { useTaskFiltersStore } from "@/lib/stores/tasks";

export const FiltersSheet = () => {
  const {
    priority: priorityFilter,
    associatedWith: associatedWithFilter,
    campaignFilter,
    dateRange,
    singleDate,
    assignedToFilter,
    showAssignedOnly,
  } = useTaskFiltersStore((state) => state.filters);

  const updateFilter = useTaskFiltersStore((state) => state.updateFilter);

  return (
    <ReusableSheet
      trigger={
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      }
      title="Task Filters"
      description="Filter your tasks"
      side="right"
      className="w-md"
    >
      <ScrollArea className="h-full pb-10">
        <div className="space-y-4 overflow-y-auto pr-4 pt-4">
          <PriorityFilter
            value={priorityFilter}
            onChange={(value) => updateFilter("priority", value)}
          />
          <AssociationFilter
            value={associatedWithFilter}
            onChange={(value) => updateFilter("associatedWith", value)}
          />
          <DueDateFilters
            singleDate={singleDate}
            onSingleDateChange={(value) => updateFilter("singleDate", value)}
            dateRange={dateRange}
            onDateRangeChange={(value) => updateFilter("dateRange", value)}
          />

          <CampaignFilter
            value={campaignFilter}
            onChange={(value) => updateFilter("campaignFilter", value)}
          />
          <AssignmentFilter
            assignedToFilter={assignedToFilter}
            setAssignedToFilter={(value) =>
              updateFilter("assignedToFilter", value)
            }
            showAssignedOnly={showAssignedOnly}
            setShowAssignedOnly={(value) =>
              updateFilter("showAssignedOnly", value)
            }
          />
          <Separator />
          <SavedFilters />
        </div>
      </ScrollArea>
    </ReusableSheet>
  );
};
