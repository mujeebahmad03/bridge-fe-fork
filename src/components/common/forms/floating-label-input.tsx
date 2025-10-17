"use client";

import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import {
  useId,
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export interface FloatingLabelInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  valid?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const FloatingLabelInput = forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(
  (
    { className, label, error, leftIcon, rightIcon, valid, type, ...props },
    ref,
  ) => {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={cn("relative", className)}>
        <div
          className={cn(
            "relative rounded-lg border border-input bg-background shadow-sm shadow-black/5 transition-shadow",
            "focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20",
            "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
            "[&:has(input:is(:disabled))_*]:pointer-events-none",
            error && "border-destructive focus-within:ring-destructive/20",
            valid && "border-green-500 focus-within:ring-green-500/20",
          )}
        >
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={cn(
              "floating-input peer h-14 w-full bg-transparent px-3 pb-2 pt-6 text-sm text-foreground",
              "placeholder-transparent focus:outline-none focus:ring-0",
              leftIcon ? "pl-10" : "pl-3",
              rightIcon || isPassword || error || valid ? "pr-10" : "pr-3",
              "pb-2 pt-6",
            )}
            placeholder={label}
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute left-3 transition-all duration-300",
              "top-4 text-base text-muted-foreground/70", // Default state
              "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base", // When placeholder is shown (input is empty)
              "peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary", // When input is focused
              leftIcon && "left-10",
              error && "text-destructive", // Error state
              valid && "text-green-500", // Valid state
            )}
          >
            {label}
          </label>
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
            {isPassword && (
              <button
                type="button"
                onClick={handleTogglePassword}
                className="text-muted-foreground hover:text-foreground focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            )}
            {!isPassword && rightIcon && (
              <div className="text-muted-foreground">{rightIcon}</div>
            )}
            {error && <AlertCircle className="ml-2 h-5 w-5 text-destructive" />}
            {valid && <CheckCircle2 className="ml-2 h-5 w-5 text-green-500" />}
          </div>
        </div>
      </div>
    );
  },
);

FloatingLabelInput.displayName = "FloatingLabelInput";
