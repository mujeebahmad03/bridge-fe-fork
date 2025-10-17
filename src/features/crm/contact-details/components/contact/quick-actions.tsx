"use client";

import {
  Mail,
  MessageCircle,
  Phone,
  CheckSquare,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const actions = [
    { id: "email", icon: Mail, label: "Email", variant: "outline" as const },
    {
      id: "linkedin",
      icon: MessageCircle,
      label: "LinkedIn",
      variant: "outline" as const,
    },
    { id: "call", icon: Phone, label: "Call", variant: "outline" as const },
    {
      id: "task",
      icon: CheckSquare,
      label: "Task",
      variant: "default" as const,
    },
    { id: "note", icon: FileText, label: "Note", variant: "outline" as const },
  ];

  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
    >
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.id}
            variant={action.variant}
            size="sm"
            className="h-auto flex-col gap-1 px-2 py-3 transition-all duration-200 hover:scale-105 hover:shadow-sm"
            onClick={() => onActionClick(action.id)}
          >
            <Icon className="h-4 w-4" />
            <span className="text-xs">{action.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
