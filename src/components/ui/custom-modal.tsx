"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export function CustomModal({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
}: CustomModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={cn(
          "relative max-h-[90vh] w-full max-w-5xl overflow-hidden",
          "bg-background/95 dark:bg-background/90",
          "backdrop-blur-xl backdrop-saturate-150",
          "border border-white/20 dark:border-white/10",
          "rounded-2xl shadow-2xl",
          "before:absolute before:inset-0 before:rounded-2xl",
          "before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-white/5",
          "dark:before:to-white/2 dark:before:from-white/5 dark:before:via-transparent",
          "before:pointer-events-none",
          "transform transition-all duration-300 ease-out",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
          className,
        )}
      >
        {/* Close Button */}
        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className={cn(
              "absolute right-4 top-8 z-20 h-8 w-8 cursor-pointer rounded-full",
              "bg-white/10 dark:bg-white/5",
              "hover:bg-white/20 dark:hover:bg-white/10",
              "backdrop-blur-sm",
              "border border-white/20 dark:border-white/10",
              "transition-all duration-200",
            )}
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {/* Scrollable Content */}
        <div className="relative z-10 max-h-[90vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
