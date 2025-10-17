"use client";

import {
  ChevronDown,
  Type,
  Scissors,
  Smile,
  Meh,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";

interface AIImprovementPopoverProps {
  disabled?: boolean;
  onImprovement: (type: string, option?: string) => void;
}

export function AIImprovementPopover({
  disabled = false,
  onImprovement,
}: AIImprovementPopoverProps) {
  const [open, setOpen] = useState(false);

  const handleOptionClick = (type: string, option?: string) => {
    onImprovement(type, option);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className="h-10 px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          Ask AI
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0 shadow-lg" align="start">
        <div className="space-y-4 p-4">
          {/* Improve Text Section */}
          <div className="space-y-1">
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              Improve text
            </h3>

            <Button
              variant="ghost"
              onClick={() => handleOptionClick("fix-grammar")}
              className="h-auto w-full justify-start rounded-lg p-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-purple-100 p-1.5 dark:bg-purple-900/30">
                  <Type className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-medium text-foreground">Fix grammar</span>
              </div>
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleOptionClick("shorten")}
              className="h-auto w-full justify-start rounded-lg p-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-purple-100 p-1.5 dark:bg-purple-900/30">
                  <Scissors className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-medium text-foreground">Shorten</span>
              </div>
            </Button>
          </div>

          {/* Change Tone Section */}
          <div className="space-y-1">
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              Change tone
            </h3>

            <Button
              variant="ghost"
              onClick={() => handleOptionClick("change-tone", "casual")}
              className="h-auto w-full justify-start rounded-lg p-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-purple-100 p-1.5 dark:bg-purple-900/30">
                  <Smile className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-medium text-foreground">Casual tone</span>
              </div>
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleOptionClick("change-tone", "neutral")}
              className="h-auto w-full justify-start rounded-lg p-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-purple-100 p-1.5 dark:bg-purple-900/30">
                  <Meh className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-medium text-foreground">
                  Neutral tone
                </span>
              </div>
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleOptionClick("change-tone", "formal")}
              className="h-auto w-full justify-start rounded-lg p-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-purple-100 p-1.5 dark:bg-purple-900/30">
                  <Briefcase className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-medium text-foreground">Formal tone</span>
              </div>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
