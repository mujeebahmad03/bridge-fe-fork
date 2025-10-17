"use client";

import { Database } from "lucide-react";
import { JSX } from "react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { MediumIcon, ShortIcon, TallIcon } from "@/components/common/icons";

import type { RowHeight } from "@/types/leads";

interface RowHeightSelectorProps {
  value: RowHeight;
  onChange: (height: RowHeight) => void;
}

const ROW_HEIGHT_OPTIONS: {
  value: RowHeight;
  label: string;
  icon: (className: string) => JSX.Element;
}[] = [
  {
    value: "short",
    label: "Short",
    icon: (className) => <ShortIcon className={className} />,
  },
  {
    value: "medium",
    label: "Medium",
    icon: (className) => <MediumIcon className={className} />,
  },
  {
    value: "tall",
    label: "Tall",
    icon: (className) => <TallIcon className={className} />,
  },
];

export function RowHeightSelector({ value, onChange }: RowHeightSelectorProps) {
  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Database className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Change row height</TooltipContent>

        <DropdownMenuContent align="start">
          <div className="px-2 py-1 text-sm font-medium text-muted-foreground">
            Select row height
          </div>
          {ROW_HEIGHT_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
              className="flex items-center gap-2"
            >
              {option.icon(
                value === option.value
                  ? "stroke-primary"
                  : "stroke-muted-foreground",
              )}
              <span className={value === option.value ? "text-primary" : ""}>
                {option.label}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Tooltip>
  );
}
