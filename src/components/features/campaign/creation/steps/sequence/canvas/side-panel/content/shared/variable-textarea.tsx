"use client";

import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { VariableSelector } from "./variable-selector";
import { AIImprovementPopover } from "./ai-improvement-popover";

interface VariableTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  variant?: "default" | "error";
  showCharacterCount?: boolean;
  maxCharacters?: number;
}

export function VariableTextarea({
  value,
  onChange,
  placeholder,
  label,
  variant = "default",
  showCharacterCount = false,
  maxCharacters = 8000,
}: VariableTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleVariableSelect = (variable: { syntax: string }) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = `${value.slice(0, start)} ${variable.syntax}${value.slice(end)}`;
      onChange(newValue);

      // Set cursor position after the inserted variable
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + variable.syntax.length + 1,
          start + variable.syntax.length + 1,
        );
      }, 0);
    }
  };

  const borderClass =
    variant === "error"
      ? "border-2 border-destructive"
      : "border border-border";

  return (
    <div className="space-y-4">
      {label && (
        <span className="text-sm font-medium text-foreground">{label}</span>
      )}

      <div
        className={`relative ${borderClass} overflow-hidden rounded-xl bg-card shadow-sm`}
      >
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[320px] resize-none border-0 bg-transparent p-6 text-base leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        {showCharacterCount && (
          <div className="absolute bottom-20 right-6 text-sm font-medium text-muted-foreground">
            {value.length}/{maxCharacters}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border bg-muted/50 p-4">
          <div className="flex items-center gap-3">
            <VariableSelector onVariableSelect={handleVariableSelect} />

            <AIImprovementPopover
              disabled={!value.trim()}
              onImprovement={(type, option) => {
                console.log("AI Improvement:", type, option);
              }}
            />
          </div>

          <Button
            variant="outline"
            className="h-10 px-4 text-sm font-medium transition-colors hover:bg-accent"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
}
