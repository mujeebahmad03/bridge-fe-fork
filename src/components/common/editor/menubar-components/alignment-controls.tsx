"use client";

import type { Editor } from "@tiptap/react";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "./tooltip-wrapper";

import { cn } from "@/lib/utils";

interface AlignmentControlsProps {
  editor: Editor;
}

export const AlignmentControls = ({ editor }: AlignmentControlsProps) => {
  return (
    <>
      <TooltipWrapper content="Align left">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={cn(
            "h-8 w-8 p-0 transition-all duration-200",
            editor.isActive({ textAlign: "left" })
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-accent/50",
          )}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
      </TooltipWrapper>

      <TooltipWrapper content="Align center">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={cn(
            "h-8 w-8 p-0 transition-all duration-200",
            editor.isActive({ textAlign: "center" })
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-accent/50",
          )}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
      </TooltipWrapper>

      <TooltipWrapper content="Align right">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={cn(
            "h-8 w-8 p-0 transition-all duration-200",
            editor.isActive({ textAlign: "right" })
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-accent/50",
          )}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
    </>
  );
};
