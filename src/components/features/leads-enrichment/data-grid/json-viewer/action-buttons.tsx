"use client";

import { Copy } from "lucide-react";

interface ActionButtonsProps {
  onCopy: () => void;
  onAddToColumn: () => void;
}

export function ActionButtons({ onCopy, onAddToColumn }: ActionButtonsProps) {
  return (
    <div className="ml-2 hidden items-center group-hover:flex">
      <button
        onClick={onCopy}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <Copy className="h-4 w-4" />
      </button>
      <button
        onClick={onAddToColumn}
        className="ml-1 text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="text-muted-foreground">→</span>
        <span className="ml-1 text-sm text-muted-foreground">To column</span>
      </button>
    </div>
  );
}
