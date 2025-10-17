"use client";

import { useId, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

import type { TextareaHTMLAttributes } from "react";

export interface FloatingLabelTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FloatingLabelTextarea = forwardRef<
  HTMLTextAreaElement,
  FloatingLabelTextareaProps
>(({ className, label, error, ...props }, ref) => {
  const id = useId();
  const [hasContent, setHasContent] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "relative rounded-lg border border-input bg-background shadow-sm shadow-black/5 transition-shadow",
          "focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20",
          "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
          "[&:has(textarea:is(:disabled))_*]:pointer-events-none",
          error && "border-destructive focus-within:ring-destructive/20",
        )}
      >
        <textarea
          id={id}
          ref={ref}
          className={cn(
            "peer h-32 w-full resize-y bg-transparent px-3 pb-2 pt-6 text-sm text-foreground", // Adjusted padding for textarea
            "placeholder-transparent focus:outline-none focus:ring-0",
          )}
          placeholder={label}
          onFocus={() => setHasContent(true)}
          onBlur={(e) => setHasContent(e.target.value !== "")}
          onChange={(e) => setHasContent(e.target.value !== "")}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-3 transition-all duration-300",
            "top-4 text-base text-muted-foreground/70", // Default state
            hasContent && "top-2 text-xs text-primary", // When textarea has content
            error && "text-destructive", // Error state
          )}
        >
          {label}
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
});

FloatingLabelTextarea.displayName = "FloatingLabelTextarea";
