import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateFiltersProps {
  singleDate: Date | undefined;
  onSingleDateChange: (date: Date | undefined) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export const DueDateFilters = ({
  singleDate,
  onSingleDateChange,
  dateRange,
  onDateRangeChange,
}: DateFiltersProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Due Date</h3>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <h4 className="text-sm text-gray-600">Single Date</h4>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !singleDate && "text-muted-foreground",
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {singleDate ? (
                  format(singleDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={singleDate}
                onSelect={(date) => {
                  onSingleDateChange(date);
                  onDateRangeChange(undefined);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm text-gray-600">Date Range</h4>
          <DatePickerWithRange
            date={dateRange}
            onSelect={(range) => {
              onDateRangeChange(range);
              onSingleDateChange(undefined);
            }}
          />
        </div>
      </div>
    </div>
  );
};
