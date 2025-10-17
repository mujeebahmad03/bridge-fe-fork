"use client";

import { Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { labelOptions } from "@/emails/dashboard/constants";
import { cn } from "@/lib/utils";

export function LabelDropdown() {
  const onAddLabel = (labelId: string) => {
    // Logic to add label to selected emails
    console.log(`Adding label ${labelId} to selected emails`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Tag className="h-4 w-4" />
          <span className="text-sm">Label</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {labelOptions.map((label) => (
          <DropdownMenuItem
            key={label.id}
            onClick={() => onAddLabel(label.id)}
            className="flex items-center gap-2"
          >
            <div className={cn("h-3 w-3 rounded-full", label.color)} />
            <span>{label.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
