"use client";

import { X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useEmailStore } from "@/emails/dashboard/stores";

export function SelectionInfo() {
  const { selectedCount, onClearSelection } = useEmailStore(
    useShallow((state) => ({
      selectedCount: state.selectedEmails.size,
      onClearSelection: state.clearSelection,
    })),
  );

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="secondary"
        className="border-primary/20 bg-primary/10 text-primary"
      >
        {selectedCount} selected
      </Badge>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear selection</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
