"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalHeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  className?: string;
}

export function ModalHeader({
  showBackButton = false,
  onBack,
  className,
}: ModalHeaderProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-20",
        "bg-background/80 dark:bg-background/70",
        "backdrop-blur-xl backdrop-saturate-150",
        "border-b border-white/10 dark:border-white/5",
        "px-6 py-4",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-white/5 before:to-transparent",
        "dark:before:from-white/2 dark:before:to-transparent",
        "before:pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {showBackButton && onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className={cn(
              "flex items-center gap-2",
              "bg-white/10 dark:bg-white/5",
              "hover:bg-white/20 dark:hover:bg-white/10",
              "backdrop-blur-sm",
              "border border-white/20 dark:border-white/10",
              "transition-all duration-200",
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
        <div className="flex-1" />
      </div>
    </div>
  );
}
