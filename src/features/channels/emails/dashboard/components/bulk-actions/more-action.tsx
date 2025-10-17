"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEmailStore } from "@/emails/dashboard/stores";
import { ActionItem } from "@/emails/dashboard/types";

interface MoreActionsDropdownProps {
  actions: ActionItem[];
}

export function MoreActionsDropdown({ actions }: MoreActionsDropdownProps) {
  const selectedEmails = useEmailStore((state) => state.selectedEmails);

  if (actions.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <DropdownMenuItem
              key={action.label}
              onClick={() => action.action(Array.from(selectedEmails))}
              className={`flex items-center gap-2 ${
                action.variant === "destructive" ? "text-destructive" : ""
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{action.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
