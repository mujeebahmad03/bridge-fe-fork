"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Variable {
  id: string;
  name: string;
  syntax: string;
}

interface VariableFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  variables: Variable[];
  label?: string;
  required?: boolean;
  variant?: "default" | "error";
  showCharacterCount?: boolean;
  showAddVariablesButton?: boolean;
}

export function VariableField({
  value,
  onChange,
  placeholder,
  maxLength,
  variables,
  label,
  required = false,
  variant = "default",
  showCharacterCount = false,
  showAddVariablesButton = false,
}: VariableFieldProps) {
  const [showVariables, setShowVariables] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!maxLength || newValue.length <= maxLength) {
      const position = e.target.selectionStart || 0;
      onChange(newValue);
      setCursorPosition(position);

      // Show variables dropdown if user types {{
      const beforeCursor = newValue.slice(0, position);
      const showDropdown =
        beforeCursor.endsWith("{{") ||
        (beforeCursor.includes("{{") && !beforeCursor.includes("}}"));
      setShowVariables(showDropdown);
    }
  };

  const handleVariableSelect = (variable: Variable) => {
    if (inputRef.current) {
      const input = inputRef.current;
      const currentPosition = input.selectionStart || value.length;

      // Check if adding the variable would exceed max length
      const newValue =
        value.slice(0, currentPosition) +
        variable.syntax +
        value.slice(currentPosition);
      if (!maxLength || newValue.length <= maxLength) {
        onChange(newValue);

        // Set cursor position after the inserted variable
        setTimeout(() => {
          const newPosition = currentPosition + variable.syntax.length;
          input.setSelectionRange(newPosition, newPosition);
          input.focus();
        }, 0);
      }
    }
    setShowVariables(false);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const position = (e.target as HTMLInputElement).selectionStart || 0;
    setCursorPosition(position);
  };

  const handleVariableButtonClick = () => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || value.length);
    }
    setShowVariables(true);
  };

  const borderClass =
    variant === "error"
      ? "border-2 border-destructive"
      : "border border-border";
  const rightPadding =
    showCharacterCount && showAddVariablesButton
      ? "pr-32"
      : showCharacterCount || showAddVariablesButton
        ? "pr-16"
        : "pr-12";

  console.log({ cursorPosition });

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {label} {required && <span className="text-destructive">*</span>}
          </span>
        </div>
      )}

      <div className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={placeholder}
          className={`h-12 px-4 text-base ${rightPadding} ${borderClass} rounded-xl focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0`}
        />

        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center gap-2">
          {showCharacterCount && maxLength && (
            <span className="text-sm font-medium text-muted-foreground">
              {value.length}/{maxLength}
            </span>
          )}

          {showAddVariablesButton ? (
            <Popover open={showVariables} onOpenChange={setShowVariables}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleVariableButtonClick}
                  className="h-8 px-3 text-sm text-primary hover:bg-accent"
                >
                  Add variables
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 shadow-lg" align="end">
                <div className="max-h-[300px] overflow-y-auto">
                  {variables.map((variable) => (
                    <Button
                      key={variable.id}
                      variant="ghost"
                      onClick={() => handleVariableSelect(variable)}
                      className="h-auto w-full justify-between rounded-none border-b border-border p-3 transition-colors last:border-b-0 hover:bg-accent"
                    >
                      <span className="font-medium text-foreground">
                        {variable.name}
                      </span>
                      <span className="font-mono text-sm font-medium text-primary">
                        {variable.syntax}
                      </span>
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Popover open={showVariables} onOpenChange={setShowVariables}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleVariableButtonClick}
                  className="h-8 w-8 p-0 text-primary hover:bg-accent"
                >
                  {"{ }"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 shadow-lg" align="end">
                <div className="max-h-[300px] overflow-y-auto">
                  {variables.map((variable) => (
                    <Button
                      key={variable.id}
                      variant="ghost"
                      onClick={() => handleVariableSelect(variable)}
                      className="h-auto w-full justify-between rounded-none border-b border-border p-3 transition-colors last:border-b-0 hover:bg-accent"
                    >
                      <span className="font-medium text-foreground">
                        {variable.name}
                      </span>
                      <span className="font-mono text-sm font-medium text-primary">
                        {variable.syntax}
                      </span>
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}
