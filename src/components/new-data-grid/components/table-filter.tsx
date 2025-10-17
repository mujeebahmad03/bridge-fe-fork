import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterOption } from "../types";

interface TableFilterProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}

export function TableFilter({
  title,
  options,
  selectedValues,
  onSelectionChange,
}: TableFilterProps) {
  const handleValueChange = (checked: boolean, value: string) => {
    const newValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);
    onSelectionChange(newValues);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter />
          {title}
          {selectedValues.length > 0 && (
            <Badge variant="outline">{selectedValues.length}</Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-3" align="start">
        <div className="space-y-3">
          <div className="text-xs font-medium text-muted-foreground">
            Filters
          </div>
          <div className="space-y-3">
            {options.map((option) => (
              <div key={option.value} className="flex items-center gap-2.5">
                <Checkbox
                  id={option.value}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleValueChange(checked === true, option.value)
                  }
                />
                <Label
                  htmlFor={option.value}
                  className="flex grow items-center justify-between gap-1.5 font-normal"
                >
                  {option.label}
                  {option.count && (
                    <span className="text-muted-foreground">
                      {option.count}
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
