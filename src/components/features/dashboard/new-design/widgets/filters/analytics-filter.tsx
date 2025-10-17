"use client";

import { useState } from "react";
import { FilterIcon, ChevronDown } from "lucide-react";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { DateRangeSelector } from "./date-range-selector";
import { CampaignSelector } from "./campaign-filter";

import { SAMPLE_CAMPAIGNS } from "@/data/campaign";
import { cn, formatDateRange } from "@/lib/utils";
import {
  DateRange,
  DateRangePresetType,
  AnalyticsFilters,
} from "@/types/widget";

interface AnalyticsFilterProps {
  onFilterChange: (filters: AnalyticsFilters) => void;
  className?: string;
}

export const AnalyticsFilter = ({
  onFilterChange,
  className,
}: AnalyticsFilterProps) => {
  // Filter state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRangePreset, setDateRangePreset] =
    useState<DateRangePresetType>("monthly");
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [campaignId, setCampaignId] = useState<string>("all");
  const [campaigns] = useState(SAMPLE_CAMPAIGNS);

  // Use the date range effect hook
  // useDateRangeEffect(dateRangePreset, dateRange, setDateRange);

  const handleFilter = () => {
    const filters: AnalyticsFilters = {
      dateRangePreset,
      dateRange,
      campaignId,
    };
    onFilterChange(filters);
    setIsFilterOpen(false);
  };

  const campaignName =
    campaigns.find((c) => c.id === campaignId)?.name || "Select campaign";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <FilterIcon className="mr-1 h-3 w-3" />
              Filters
              <ChevronDown
                className={cn(
                  "ml-1 h-3 w-3 transition-transform",
                  isFilterOpen ? "rotate-180" : "",
                )}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4 p-1">
              <DateRangeSelector
                dateRangePreset={dateRangePreset}
                dateRange={dateRange}
                onDateRangePresetChange={setDateRangePreset}
                onDateRangeChange={setDateRange}
              />

              <CampaignSelector
                campaignId={campaignId}
                campaigns={campaigns}
                onCampaignChange={setCampaignId}
              />

              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={handleFilter}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">
              {formatDateRange(dateRange, dateRangePreset)}
            </span>
            <span className="mx-1 text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              {campaignId === "all" ? "All Campaigns" : campaignName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
