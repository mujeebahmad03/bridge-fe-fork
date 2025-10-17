"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui";

interface ScrollToBottomButtonProps {
  show: boolean;
  onClick: () => void;
}

export function ScrollToBottomButton({
  show,
  onClick,
}: ScrollToBottomButtonProps) {
  if (!show) return null;

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <Button
        onClick={onClick}
        title="Scroll to bottom"
        size="icon"
        variant="outline"
        className="group h-10 w-10 rounded-full shadow-lg transition-all duration-200 hover:bg-muted hover:shadow-xl"
      >
        <ChevronDown className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
      </Button>
    </div>
  );
}
