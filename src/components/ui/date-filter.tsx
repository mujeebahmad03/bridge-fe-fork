"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format, subDays, subMonths } from "date-fns";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

interface DateFilterProps {
  onDateChange?: (range: DateRange | undefined, preset: string) => void;
  className?: string;
}

export function DateFilter({ onDateChange, className }: DateFilterProps) {
  const [selectedPreset, setSelectedPreset] = useState("last30days");
  const [customRange, setCustomRange] = useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const presets = [
    {
      id: "last7days",
      label: "Last 7 Days",
      range: {
        from: subDays(new Date(), 7),
        to: new Date(),
      },
    },
    {
      id: "last30days",
      label: "Last 30 Days",
      range: {
        from: subDays(new Date(), 30),
        to: new Date(),
      },
    },
    {
      id: "lastquarter",
      label: "Last Quarter",
      range: {
        from: subMonths(new Date(), 3),
        to: new Date(),
      },
    },
    {
      id: "custom",
      label: "Custom Range",
      range: customRange,
    },
  ];

  const handlePresetSelect = (preset: (typeof presets)[0]) => {
    setSelectedPreset(preset.id);
    if (preset.id !== "custom") {
      onDateChange?.(preset.range, preset.id);
      setIsOpen(false);
    }
  };

  const handleCustomRangeSelect = (range: DateRange | undefined) => {
    setCustomRange(range);
    if (range?.from && range?.to) {
      setSelectedPreset("custom");
      onDateChange?.(range, "custom");
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    const preset = presets.find((p) => p.id === selectedPreset);
    if (selectedPreset === "custom" && customRange?.from && customRange?.to) {
      return `${format(customRange.from, "MMM dd")} - ${format(customRange.to, "MMM dd")}`;
    }
    return preset?.label || "Select Date Range";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
        Time Period:
      </span>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "min-w-[200px] justify-between bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20",
              "border-blue-200 hover:from-blue-100 hover:to-purple-100 dark:border-blue-800",
              "transition-all duration-200 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30",
            )}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-blue-600" />
              <span className="font-medium">{getDisplayText()}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            {/* Preset Options */}
            <div className="min-w-[160px] space-y-2 border-r p-4">
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Quick Select
              </h4>
              {presets.map((preset) => (
                <Button
                  key={preset.id}
                  variant={selectedPreset === preset.id ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-start text-left",
                    selectedPreset === preset.id && "bg-blue-600 text-white",
                  )}
                  onClick={() => handlePresetSelect(preset)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            {/* Custom Calendar */}
            {selectedPreset === "custom" && (
              <div className="p-4">
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  Custom Range
                </h4>
                <Calendar
                  mode="range"
                  selected={customRange}
                  onSelect={handleCustomRangeSelect}
                  numberOfMonths={2}
                  className="rounded-md"
                />
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
