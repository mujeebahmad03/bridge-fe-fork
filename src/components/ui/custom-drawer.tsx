"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export function CustomDrawer({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
}: CustomDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Glassy Overlay */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-300",
          "bg-black/20 dark:bg-black/40",
          "backdrop-blur-md backdrop-saturate-150",
          "before:absolute before:inset-0",
          "before:bg-gradient-to-br before:from-white/10 before:via-white/5 before:to-transparent",
          "dark:before:via-white/2 dark:before:from-white/5 dark:before:to-transparent",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div
        ref={drawerRef}
        className={cn(
          "absolute bottom-0 left-0 right-0 max-h-[85vh]",
          "w-full overflow-hidden", // Added overflow-hidden and explicit width
          "bg-background/95 dark:bg-background/90",
          "backdrop-blur-xl backdrop-saturate-150",
          "border-t border-white/20 dark:border-white/10",
          "rounded-t-2xl shadow-2xl",
          "before:absolute before:inset-0 before:rounded-t-2xl",
          "before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-white/5",
          "dark:before:to-white/2 dark:before:from-white/5 dark:before:via-transparent",
          "before:pointer-events-none",
          "transform transition-all duration-300 ease-out",
          isOpen ? "translate-y-0" : "translate-y-full",
          className,
        )}
      >
        {/* Drag Handle */}
        <div className="relative z-10 flex justify-center pb-2 pt-3">
          <div className="h-1 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* Header with Close Button */}
        {showCloseButton && (
          <div className="relative z-10 flex items-center justify-between px-4 pb-2">
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className={cn(
                "h-8 w-8 rounded-full",
                "bg-white/10 dark:bg-white/5",
                "hover:bg-white/20 dark:hover:bg-white/10",
                "backdrop-blur-sm",
                "border border-white/20 dark:border-white/10",
                "transition-all duration-200",
              )}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="relative z-10 max-h-[75vh] w-full overflow-y-auto overflow-x-hidden">
          <div className="w-full max-w-full px-4 pb-4">{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
