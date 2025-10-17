"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";

import { cn } from "@/lib/utils";

interface FloatingLabelDatePickerProps {
  label: string;
  onSelect?: (date: Date | undefined) => void;
  error?: string;
  valid?: boolean;
  className?: string;
  disabledDates?: (date: Date) => boolean;
}

export function FloatingLabelDatePicker({
  label,
  onSelect,
  error,
  valid,
  className,
  disabledDates,
}: FloatingLabelDatePickerProps) {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onSelect?.(selectedDate);
    setOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "h-[60px] w-full justify-start rounded-lg border bg-background px-3 pt-4 text-left text-sm font-normal",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus:ring-destructive",
              valid && "border-green-500 focus:ring-green-500",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date && format(date, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            disabled={disabledDates}
          />
        </PopoverContent>
      </Popover>
      <label
        className={cn(
          "absolute left-10 transition-all duration-200 ease-in-out",
          "pointer-events-none",
          open || date ? "top-2 text-xs" : "top-[18px] text-sm",
          "text-muted-foreground",
          error && "text-destructive",
          valid && "text-green-500",
        )}
      >
        {label}
      </label>
    </div>
  );
}
