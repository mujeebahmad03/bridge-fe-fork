"use client";

import * as React from "react";
import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface FloatingLabelTimePickerProps {
  label: string;
  onSelect?: (time: string) => void;
  error?: string;
  valid?: boolean;
  className?: string;
}

export function FloatingLabelTimePicker({
  label,
  onSelect,
  error,
  valid,
  className,
}: FloatingLabelTimePickerProps) {
  const [time, setTime] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedTime: string) => {
    setTime(selectedTime);
    onSelect?.(selectedTime);
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
            <Clock className="mr-2 h-4 w-4" />
            {time && time}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex flex-col space-y-2">
            <Input
              type="time"
              value={time}
              onChange={(e) => handleSelect(e.target.value)}
              className="w-full"
            />
          </div>
        </PopoverContent>
      </Popover>
      <label
        className={cn(
          "absolute left-10 transition-all duration-200 ease-in-out",
          "pointer-events-none",
          open || time ? "top-2 text-xs" : "top-[18px] text-sm",
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
