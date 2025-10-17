"use client";

import type { Editor } from "@tiptap/react";
import { Code, Settings, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui";
import {
  AlignmentControls,
  FontControls,
  ImageControl,
  LinkControl,
  ListControls,
  TextFormatControls,
  VariableControl,
  TooltipWrapper,
  AIPersonalizationControl,
} from "./menubar-components";

import { cn } from "@/lib/utils";

interface MenuBarProps {
  editor: Editor | null;
  showMenuBar?: boolean;
}

export const MenuBar = ({ editor, showMenuBar = true }: MenuBarProps) => {
  const [isMenuBarVisible, setIsMenuBarVisible] = useState(showMenuBar);

  if (!editor) return null;

  // If showMenuBar is false, only show the variable control and toggle button
  if (!showMenuBar) {
    return (
      <div className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between p-3">
          <VariableControl editor={editor} />
          <TooltipWrapper content="Show formatting toolbar">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMenuBarVisible(true)}
              className="h-8 w-8 p-0 hover:bg-accent/50"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </TooltipWrapper>
        </div>
      </div>
    );
  }

  // Full menubar with option to hide
  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-background/95 backdrop-blur-sm">
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isMenuBarVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="border-b border-border/30 p-4">
          <div className="flex flex-wrap items-center gap-1">
            <FontControls editor={editor} />

            <div className="mx-2 h-6 w-px bg-border/50" />
            <TextFormatControls editor={editor} />

            <div className="mx-2 h-6 w-px bg-border/50" />
            <ListControls editor={editor} />

            <div className="mx-2 h-6 w-px bg-border/50" />
            <AlignmentControls editor={editor} />

            <div className="mx-2 h-6 w-px bg-border/50" />
            <TooltipWrapper content="Code block">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={cn(
                  "h-8 w-8 p-0 transition-all duration-200",
                  editor.isActive("codeBlock")
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-accent/50",
                )}
              >
                <Code className="h-4 w-4" />
              </Button>
            </TooltipWrapper>

            <div className="mx-2 h-6 w-px bg-border/50" />
            <LinkControl editor={editor} />
            <ImageControl editor={editor} />
          </div>
        </div>
      </div>

      {/* Always visible bottom bar with variable control and toggle */}
      <div className="flex items-center justify-between p-3">
        <div className="flex gap-2">
          <VariableControl editor={editor} />
          <AIPersonalizationControl editor={editor} />
        </div>

        <TooltipWrapper
          content={
            isMenuBarVisible
              ? "Hide formatting toolbar"
              : "Show formatting toolbar"
          }
        >
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMenuBarVisible(!isMenuBarVisible)}
            className="h-8 w-8 p-0 transition-all duration-200 hover:bg-accent/50"
          >
            {isMenuBarVisible ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </TooltipWrapper>
      </div>
    </div>
  );
};
