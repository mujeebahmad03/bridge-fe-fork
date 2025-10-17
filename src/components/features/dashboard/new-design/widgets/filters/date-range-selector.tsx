"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { DynamicSelect } from "@/components/common/select";

import {
  DateRange,
  DateRangePreset,
  DateRangePresetType,
} from "@/types/widget";

interface DateRangeSelectorProps {
  dateRangePreset: DateRangePresetType;
  dateRange: DateRange | null;
  onDateRangePresetChange: (preset: DateRangePresetType) => void;
  onDateRangeChange: (range: DateRange | null) => void;
}

export const DateRangeSelector = ({
  dateRangePreset,
  dateRange,
  onDateRangePresetChange,
  onDateRangeChange,
}: DateRangeSelectorProps) => {
  // Handle start date selection
  const handleStartDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const newRange: DateRange = {
      start: date,
      end: dateRange?.end || date,
    };

    onDateRangeChange(newRange);
  };

  // Handle end date selection
  const handleEndDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const newRange: DateRange = {
      start: dateRange?.start || date,
      end: date,
    };

    onDateRangeChange(newRange);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Date Range</h4>
        <DynamicSelect
          value={dateRangePreset}
          onChange={(value: string) =>
            onDateRangePresetChange(value as DateRangePresetType)
          }
          className="w-full"
          options={[
            { value: DateRangePreset.daily, label: "Today" },
            { value: DateRangePreset.weekly, label: "Last 7 days" },
            { value: DateRangePreset.monthly, label: "Last 30 days" },
            { value: DateRangePreset.quarterly, label: "Last 90 days" },
            { value: DateRangePreset.custom, label: "Custom range" },
          ]}
        />
      </div>

      {dateRangePreset === "custom" && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Custom Date Range</h4>
          <div className="grid grid-cols-2 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-xs">
                  <CalendarIcon className="mr-2 h-3 w-3" />
                  {dateRange?.start
                    ? format(dateRange.start, "MMM d, yyyy")
                    : "Start Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange?.start}
                  onSelect={handleStartDateSelect}
                  initialFocus
                  className="pointer-events-auto p-3"
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-xs">
                  <CalendarIcon className="mr-2 h-3 w-3" />
                  {dateRange?.end
                    ? format(dateRange.end, "MMM d, yyyy")
                    : "End Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange?.end}
                  onSelect={handleEndDateSelect}
                  initialFocus
                  className="pointer-events-auto p-3"
                  disabled={(date) =>
                    dateRange?.start ? date < dateRange.start : false
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};
