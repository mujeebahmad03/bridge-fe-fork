"use client";

import { ChevronDown, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { LayoutConfig } from "@/types/dashboard-widget";

interface LayoutSelectorProps {
  layouts: LayoutConfig[];
  currentLayoutId: string;
  onLayoutChange: (layoutId: string) => void;
  onDeleteLayout: (layoutId: string) => void;
}

export function LayoutSelector({
  layouts,
  currentLayoutId,
  onLayoutChange,
  onDeleteLayout,
}: LayoutSelectorProps) {
  const [open, setOpen] = useState(false);
  const currentLayout = layouts.find((l) => l.id === currentLayoutId);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="max-w-max justify-between">
          {currentLayout?.name || "Select layout"}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px]">
        {layouts.map((layout) => (
          <DropdownMenuItem
            key={layout.id}
            className={cn(
              "flex items-center justify-between",
              layout.id === currentLayoutId && "bg-muted",
            )}
            onSelect={(e) => {
              e.preventDefault();
              onLayoutChange(layout.id);
              setOpen(false);
            }}
          >
            <span>{layout.name}</span>
            {layout.id !== "default" && (
              <Button
                variant="destructive"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteLayout(layout.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
