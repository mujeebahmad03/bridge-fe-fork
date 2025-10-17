"use client";

import type { Editor } from "@tiptap/react";
import { Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "./tooltip-wrapper";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface AIPersonalizationControlProps {
  editor: Editor;
}

interface AIOption {
  id: string;
  name: string;
  action?: string; // Optional action key for direct execution
  subOptions?: AIOption[];
}

const aiOptions: AIOption[] = [
  {
    id: "improveText",
    name: "Improve text",
    subOptions: [
      { id: "fixGrammar", name: "Fix grammar", action: "fixGrammar" },
      { id: "shorten", name: "Shorten", action: "shorten" },
      { id: "expand", name: "Expand", action: "expand" },
      {
        id: "simplify",
        name: "Simplify",
        action: "simplify",
      },
    ],
  },
  {
    id: "changeTone",
    name: "Change tone",
    subOptions: [
      { id: "casualTone", name: "Casual tone", action: "casualTone" },
      { id: "neutralTone", name: "Neutral tone", action: "neutralTone" },
      { id: "formalTone", name: "Formal tone", action: "formalTone" },
      { id: "confidentTone", name: "Confident tone", action: "confidentTone" },
      { id: "friendlyTone", name: "Friendly tone", action: "friendlyTone" },
    ],
  },
  {
    id: "translate",
    name: "Translate",
    subOptions: [
      {
        id: "translateToEnglish",
        name: "To English",
        action: "translateToEnglish",
      },
      {
        id: "translateToSpanish",
        name: "To Spanish",
        action: "translateToSpanish",
      },
      {
        id: "translateToFrench",
        name: "To French",
        action: "translateToFrench",
      },
    ],
  },
  {
    id: "summarize",
    name: "Summarize",
    action: "summarize",
  },
  {
    id: "continueWriting",
    name: "Continue writing",
    action: "continueWriting",
  },
];

export const AIPersonalizationControl = ({
  editor,
}: AIPersonalizationControlProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<AIOption | null>(
    null,
  );

  const isEditorEmpty = editor.isEmpty;

  const handleAction = (actionId: string) => {
    // Placeholder for AI personalization logic
    alert(`AI Action: ${actionId} triggered!`);
    console.log(`AI Action: ${actionId} triggered!`);
    setIsOpen(false);
    setSelectedCategory(null);
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setSelectedCategory(null); // Reset category when popover closes
      }}
    >
      <TooltipWrapper
        content={
          isEditorEmpty
            ? "Add content to enable AI personalization"
            : "Personalize with AI"
        }
      >
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            disabled={isEditorEmpty}
            className={cn(
              "h-8 gap-2 px-3 transition-all duration-200",
              isEditorEmpty
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-accent/50 hover:shadow-sm",
            )}
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI Personalize</span>
          </Button>
        </PopoverTrigger>
      </TooltipWrapper>
      <PopoverContent
        className="w-64 border border-border/50 bg-popover/95 p-0 shadow-lg backdrop-blur-sm"
        align="start"
      >
        <div className="space-y-2 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h4 className="font-medium leading-none">AI Personalization</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Choose an AI action to enhance your content.
          </p>
        </div>
        <Separator className="my-0" />
        <ScrollArea className="h-48">
          <div className="p-2">
            {!selectedCategory ? (
              aiOptions.map((option) => (
                <Button
                  key={option.id}
                  variant="ghost"
                  className="h-auto w-full justify-between p-3 transition-all duration-200 hover:bg-accent/50"
                  onClick={() =>
                    option.subOptions
                      ? setSelectedCategory(option)
                      : handleAction(option.action!)
                  }
                >
                  <span className="text-sm font-medium">{option.name}</span>
                  {option.subOptions && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              ))
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="mb-1 h-auto w-full justify-start p-3 transition-all duration-200 hover:bg-accent/50"
                  onClick={() => setSelectedCategory(null)}
                >
                  <ChevronRight className="mr-2 h-4 w-4 rotate-180 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {selectedCategory.name}
                  </span>
                </Button>
                <Separator className="my-0" />
                {selectedCategory.subOptions?.map((subOption) => (
                  <Button
                    key={subOption.id}
                    variant="ghost"
                    className="h-auto w-full justify-start p-3 transition-all duration-200 hover:bg-accent/50"
                    onClick={() => handleAction(subOption.action!)}
                  >
                    <span className="ml-6 text-sm font-medium">
                      {subOption.name}
                    </span>
                  </Button>
                ))}
              </>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
