"use client";

import { useState } from "react";

import {
  Label,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { PrioritySelector } from "../shared";

import { Priority } from "@/types/campaign";

interface ManualModeToggleProps {
  manualMode: boolean;
  setManualMode: (value: boolean) => void;
}

export const ManualModeToggle = ({
  manualMode,
  setManualMode,
}: ManualModeToggleProps) => {
  const [priority, setPriority] = useState<Priority>("medium");

  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="flex items-center space-x-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-3">
              <Switch
                id="manual-mode"
                checked={manualMode}
                onCheckedChange={setManualMode}
                className="data-[state=checked]:bg-primary"
              />
              <Label
                htmlFor="manual-mode"
                className="cursor-pointer text-sm font-medium text-foreground"
              >
                Mark as manual
              </Label>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-sm">
            <p className="text-xs">
              This step won&apos;t be sent automatically. It will create a new
              task and will require the linkedin message to be sent manually.
              You can find all your tasks in the task section of your account.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Priority selector only shows when manual mode is enabled */}
      {manualMode && (
        <>
          <span className="text-sm text-muted-foreground">with</span>
          <PrioritySelector value={priority} onChange={setPriority} />
          <span className="text-sm text-muted-foreground">priority</span>
        </>
      )}
    </div>
  );
};
