"use client";

import { format } from "date-fns";
import React from "react";
import { CalendarIcon, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import {
  DateRange,
  DateRangePresetType,
  Campaign,
  DateRangePreset,
} from "@/types/dashboard-widget";

interface WidgetHeaderProps {
  title: string;
  icon: React.ReactNode;
  iconClassName?: string;
  dateRange: DateRange;
  datePreset: DateRangePresetType;
  campaigns: Campaign[];
  selectedCampaigns: Campaign[];
  onDateRangeChange: (range: DateRange) => void;
  onDatePresetChange: (preset: DateRangePresetType) => void;
  onCampaignsChange: (campaigns: Campaign[]) => void;
}

export const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  title,
  icon,
  iconClassName,
  dateRange,
  datePreset,
  campaigns,
  selectedCampaigns,
  onDateRangeChange,
  onDatePresetChange,
  onCampaignsChange,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={cn("shrink-0 rounded-lg p-2", iconClassName)}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto min-w-[320px]"
          align="end"
          side="bottom"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Date Range</h4>
              <Select
                value={datePreset}
                onValueChange={(value) =>
                  onDatePresetChange(value as DateRangePresetType)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(DateRangePreset).map((value) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="capitalize"
                    >
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {datePreset === "custom" && (
              <div className="space-y-2">
                <h4 className="font-medium">Custom Range</h4>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground",
                    )}
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.start ? (
                      dateRange.end ? (
                        <>
                          {format(dateRange.start, "LLL dd, y")} -{" "}
                          {format(dateRange.end, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.start, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </div>
                {isCalendarOpen && (
                  <div className="rounded-md border">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.start}
                      selected={{
                        from: dateRange?.start,
                        to: dateRange?.end,
                      }}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          onDateRangeChange({
                            start: range.from,
                            end: range.to,
                          });
                          setIsCalendarOpen(false);
                        }
                      }}
                      numberOfMonths={2}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-medium">Campaigns</h4>
              <Select
                value={selectedCampaigns[0]?.id}
                onValueChange={(value) => {
                  const campaign = campaigns.find((c) => c.id === value);
                  if (campaign) {
                    onCampaignsChange([campaign]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
