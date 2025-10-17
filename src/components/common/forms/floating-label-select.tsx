"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FloatingLabelSelectProps {
  label: string;
  error?: string;
  valid?: boolean;
  leftIcon?: React.ReactNode;
  options?: SelectOption[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export const FloatingLabelSelect = React.forwardRef<
  HTMLButtonElement,
  FloatingLabelSelectProps
>(
  (
    {
      label,
      error,
      leftIcon,
      valid,
      options = [],
      defaultValue,
      onValueChange,
      className,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(!!defaultValue);

    const handleValueChange = (value: string) => {
      setHasValue(!!value);
      onValueChange?.(value);
    };

    return (
      <div className={cn("relative", className)}>
        <Select defaultValue={defaultValue} onValueChange={handleValueChange}>
          <SelectTrigger
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            iconClassName="mb-3"
            className={cn(
              "h-[60px] w-full rounded-lg border bg-background px-3 text-sm ring-offset-background",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "items-end disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus:ring-destructive",
              valid && "border-green-500 focus:ring-green-500",
              leftIcon && "pl-10",
            )}
          >
            <SelectValue className="mt-3" placeholder=" " />
          </SelectTrigger>
          <SelectContent>
            {options.length > 0 ? (
              options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-options" disabled>
                No options available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <label
          className={cn(
            "absolute left-3 transition-all duration-200 ease-in-out",
            "pointer-events-none",
            isFocused || hasValue ? "top-2 text-xs" : "top-4 text-sm",
            "text-muted-foreground",
            error && "text-destructive",
            valid && "text-green-500",
            leftIcon && "left-10",
          )}
        >
          {label}
        </label>
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          {error && <AlertCircle className="h-5 w-5 text-destructive" />}
          {valid && <CheckCircle2 className="h-5 w-5 text-green-500" />}
        </div>
      </div>
    );
  },
);

FloatingLabelSelect.displayName = "FloatingLabelSelect";
