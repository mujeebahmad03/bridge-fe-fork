"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Assignee } from "@/types/task";

interface AssigneeSelectorProps {
  value?: Assignee;
  onChange: (assignee: Assignee | undefined) => void;
  assignees: Assignee[];
  label: string;
  required?: boolean;
  variant?: "default" | "error";
}

export function AssigneeSelector({
  value,
  onChange,
  assignees,
  label,
  required = false,
  variant = "default",
}: AssigneeSelectorProps) {
  const borderClass =
    variant === "error"
      ? "border-2 border-destructive"
      : "border border-border";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`h-12 w-full justify-between px-4 text-left font-normal ${borderClass} rounded-xl shadow-sm transition-colors hover:bg-accent`}
          >
            {value ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 bg-primary shadow-sm">
                  <AvatarFallback className="text-sm font-semibold text-primary-foreground">
                    {value.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {value.name}
                  </span>
                  {value.email && (
                    <span className="text-sm text-muted-foreground">
                      ({value.email})
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <span className="text-muted-foreground">Select assignee...</span>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-full min-w-[400px] shadow-lg"
        >
          {assignees.map((assignee) => (
            <DropdownMenuItem
              key={assignee.id}
              onClick={() => onChange(assignee)}
              className="flex items-center gap-3 p-4 transition-colors hover:bg-accent"
            >
              <div className="flex flex-1 items-center gap-3">
                <Avatar className="h-9 w-9 bg-primary shadow-sm">
                  <AvatarFallback className="text-sm font-semibold text-primary-foreground">
                    {assignee.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {assignee.name}
                  </span>
                  {assignee.email && (
                    <span className="text-sm text-muted-foreground">
                      ({assignee.email})
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
          {assignees.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onChange(undefined)}
                className="justify-center p-4 text-center text-muted-foreground transition-colors hover:bg-accent"
              >
                Clear Selection
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
