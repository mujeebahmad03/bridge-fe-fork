"use client";

import type { Editor } from "@tiptap/react";
import { AlertTriangle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TooltipWrapper } from "./menubar-components";

import { cn } from "@/lib/utils";

interface CharacterCounterProps {
  editor: Editor;
  maxCharacters: number;
}

export const CharacterCounter = ({
  editor,
  maxCharacters,
}: CharacterCounterProps) => {
  const characterCount = editor.storage.characterCount.characters();
  const percentage = (characterCount / maxCharacters) * 100;
  const isNearLimit = percentage >= 80;
  const isOverLimit = percentage >= 100;

  const getVariant = () => {
    if (isOverLimit) return "destructive";
    if (isNearLimit) return "secondary";
    return "outline";
  };

  const getTooltipContent = () => {
    if (isOverLimit) {
      return `${characterCount - maxCharacters} characters over limit`;
    }
    if (isNearLimit) {
      return `${maxCharacters - characterCount} characters remaining`;
    }
    return `${characterCount} of ${maxCharacters} characters used`;
  };

  return (
    <div className="absolute bottom-16 right-4 z-10">
      <TooltipWrapper content={getTooltipContent()} side="left">
        <Badge
          variant={getVariant()}
          className={cn(
            "shadow-sm backdrop-blur-sm transition-all duration-200",
            "border border-border/50 bg-background/95",
            isOverLimit &&
              "animate-pulse border-destructive/50 bg-destructive/10 text-destructive",
            isNearLimit &&
              !isOverLimit &&
              "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300",
          )}
        >
          <div className="flex items-center gap-1.5">
            {isOverLimit && <AlertTriangle className="h-3 w-3" />}
            <span className="text-xs font-medium">
              {characterCount.toLocaleString()}
              <span className="mx-1 text-muted-foreground">/</span>
              {maxCharacters.toLocaleString()}
            </span>
          </div>
        </Badge>
      </TooltipWrapper>

      {/* Progress bar */}
      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted/50">
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out",
            isOverLimit
              ? "bg-destructive"
              : isNearLimit
                ? "bg-orange-500"
                : "bg-primary",
          )}
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        />
      </div>
    </div>
  );
};
