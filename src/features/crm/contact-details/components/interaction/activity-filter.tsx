"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface ActivityType {
  id: string;
  label: string;
  color: string;
}

interface ActivityFilterProps {
  activityTypes: ActivityType[];
  currentFilter: string;
  onFilterChange: (filterId: string) => void;
}

export function ActivityFilter({
  activityTypes,
  currentFilter,
  onFilterChange,
}: ActivityFilterProps) {
  const currentType = activityTypes.find((type) => type.id === currentFilter);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          {currentType?.label || "All"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {activityTypes.map((type) => (
          <DropdownMenuItem
            key={type.id}
            onClick={() => onFilterChange(type.id)}
            className="flex items-center gap-2"
          >
            <div className={`h-2 w-2 rounded-full bg-current ${type.color}`} />
            {type.label}
            {currentFilter === type.id && (
              <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
