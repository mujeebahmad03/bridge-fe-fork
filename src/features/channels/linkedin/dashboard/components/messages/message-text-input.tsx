"use client";

import type React from "react";
import { useEffect } from "react";

interface MessageTextInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onBlur: () => void;
  disabled?: boolean;
  hasFiles: boolean;
  ref?: React.RefObject<HTMLTextAreaElement | null>;
}

export const MessageTextInput = ({
  value,
  onChange,
  onKeyPress,
  onBlur,
  disabled = false,
  hasFiles,
  ref,
}: MessageTextInputProps) => {
  const placeholder = disabled
    ? "Sending..."
    : hasFiles
      ? "Add a message (optional)..."
      : "Write a message...";

  // Auto-resize textarea based on content
  useEffect(() => {
    if (ref?.current) {
      const textarea = ref.current;
      textarea.style.height = "auto";
      // Limit max height to prevent it from growing too large
      const maxHeight = 120; // About 5-6 lines
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY =
        textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [value, ref]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyPress}
      onBlur={onBlur}
      disabled={disabled}
      placeholder={placeholder}
      rows={1}
      className="max-h-[120px] min-h-[40px] w-full resize-none rounded-lg border border-border bg-muted px-4 py-2 pr-20 text-sm placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
      style={{ minHeight: "40px", paddingRight: "84px" }}
    />
  );
};
