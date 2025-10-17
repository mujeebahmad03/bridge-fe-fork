"use client";

import type { Editor } from "@tiptap/react";
import { List, ListOrdered } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TooltipWrapper } from "./tooltip-wrapper";

interface ListControlsProps {
  editor: Editor;
}

export const ListControls = ({ editor }: ListControlsProps) => {
  return (
    <>
      <TooltipWrapper content="Bullet list">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "h-8 w-8 p-0 transition-all duration-200",
            editor.isActive("bulletList")
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-accent/50",
          )}
        >
          <List className="h-4 w-4" />
        </Button>
      </TooltipWrapper>

      <TooltipWrapper content="Numbered list">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "h-8 w-8 p-0 transition-all duration-200",
            editor.isActive("orderedList")
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-accent/50",
          )}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
    </>
  );
};
