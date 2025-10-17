"use client";

import type { Editor } from "@tiptap/react";
import { Bold, Italic, Underline } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TooltipWrapper } from "./tooltip-wrapper";

interface TextFormatControlsProps {
  editor: Editor;
}

export const TextFormatControls = ({ editor }: TextFormatControlsProps) => {
  return (
    <>
      <TooltipWrapper content="Bold">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "h-8 w-8 p-0 transition-all duration-200",
            editor.isActive("bold")
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-accent/50",
          )}
        >
          <Bold className="h-4 w-4" />
        </Button>
      </TooltipWrapper>

      <TooltipWrapper content="Italic">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "h-8 w-8 p-0 transition-all duration-200",
            editor.isActive("italic")
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-accent/50",
          )}
        >
          <Italic className="h-4 w-4" />
        </Button>
      </TooltipWrapper>

      <TooltipWrapper content="Underline">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "h-8 w-8 p-0 transition-all duration-200",
            editor.isActive("underline")
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-accent/50",
          )}
        >
          <Underline className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
    </>
  );
};
