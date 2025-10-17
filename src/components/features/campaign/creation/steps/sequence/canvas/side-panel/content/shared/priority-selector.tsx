"use client";

import { ChevronDown } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Priority } from "@/types/campaign";

interface PrioritySelectorProps {
  value: Priority;
  onChange: (priority: Priority) => void;
}

const priorityOptions = [
  {
    value: "none" as Priority,
    label: "None",
    color: "bg-gray-400",
  },
  { value: "low" as Priority, label: "Low", color: "bg-green-400" },
  {
    value: "medium" as Priority,
    label: "Medium",
    color: "bg-yellow-400",
  },
  {
    value: "high" as Priority,
    label: "High",
    color: "bg-red-400",
  },
];

export function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  const selectedOption = priorityOptions.find(
    (option) => option.value === value,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-9 min-w-[130px] justify-between px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
        >
          <div className="flex items-center gap-2">
            {selectedOption && (
              <div
                className={cn(
                  "h-2.5 w-2.5 rounded-full shadow-sm",
                  selectedOption.color,
                )}
              />
            )}
            <span>{selectedOption?.label}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[130px] shadow-lg">
        {priorityOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className="flex items-center gap-3 py-2.5 transition-colors hover:bg-muted"
          >
            {option.value && (
              <div
                className={cn(
                  "h-2.5 w-2.5 rounded-full shadow-sm",
                  option.color,
                )}
              />
            )}
            <span className="font-medium">{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
