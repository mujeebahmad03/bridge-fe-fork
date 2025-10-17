"use client";

import type React from "react";

import { Smile } from "lucide-react";
import { useState } from "react";

import { EmojiPicker } from "./emoji-picker";

import type { UseEmojiPickerOptions } from "@/linkedin/dashboard/hooks/client";
import { cn } from "@/lib/utils";

interface EmojiButtonProps extends UseEmojiPickerOptions {
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost" | "outline";
  position?: "top" | "bottom";
  children?: React.ReactNode;
}

export function EmojiButton({
  className = "",
  disabled = false,
  size = "md",
  variant = "ghost",
  position = "top",
  children,
  ...pickerOptions
}: EmojiButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: "w-6 h-6 text-sm",
    md: "w-8 h-8 text-base",
    lg: "w-10 h-10 text-lg",
  };

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-muted",
    outline: "border border-border hover:bg-muted",
  };

  const iconSizes = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex items-center justify-center rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        title="Add emoji"
      >
        {children || <Smile className={iconSizes[size]} />}
      </button>

      <EmojiPicker
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
        {...pickerOptions}
      />
    </div>
  );
}
