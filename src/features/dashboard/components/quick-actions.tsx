"use client";

import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const quickActions = [
  { label: "What can you do", value: "What can you do?" },
  { label: "Get new lead", value: "Get new lead" },
  { label: "Send new email", value: "Send new email" },
  { label: "Today's tasks", value: "Today's tasks" },
];

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {quickActions.map((action) => (
        <Button
          key={action.value}
          variant="outline"
          className="rounded-full border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={() => onActionClick(action.value)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
