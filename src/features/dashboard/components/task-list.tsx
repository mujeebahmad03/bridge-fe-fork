"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Phone, Mail, Linkedin, ChevronRight } from "lucide-react";
import { ContactTooltip } from "./contact-tooltip";
import { Task, TaskType } from "../types";

interface TaskListProps {
  tasks: Task[];
  maxDisplay?: number;
  onViewAll?: () => void;
}

const taskIcons: Record<TaskType, React.ReactNode> = {
  call: <Phone className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />,
  email: <Mail className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />,
  linkedIn: <Linkedin className="h-3.5 w-3.5 text-[#0A66C2]" />,
};

const priorityColors = {
  high: "text-red-600 dark:text-red-400",
  medium: "text-orange-600 dark:text-orange-400",
  low: "text-blue-600 dark:text-blue-400",
};

export function TaskList({ tasks, maxDisplay = 6, onViewAll }: TaskListProps) {
  const displayedTasks = tasks.slice(0, maxDisplay);
  const hasMore = tasks.length > maxDisplay;

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Today&apos;s tasks
        </h2>
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className="text-primary hover:text-primary/80"
          >
            View all ({tasks.length})
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {displayedTasks.map((task) => (
          <div
            key={task.id}
            className="cursor-pointer rounded-lg border-l-4 border-primary bg-card p-3 transition-colors hover:bg-accent/50"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <div>{taskIcons[task.taskType]}</div>
                  <ContactTooltip
                    contact={task.contactData}
                    company={task.companyData}
                  >
                    <span className="cursor-help font-semibold text-foreground transition-colors hover:text-primary">
                      {task.contact || task.company || "Untitled"}
                    </span>
                  </ContactTooltip>
                  {task.isOverdue && (
                    <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-800 dark:bg-red-900/30 dark:text-red-200">
                      Overdue
                    </span>
                  )}
                </div>
                <p className="mb-1.5 text-xs text-muted-foreground">
                  {task.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className={priorityColors[task.priority]}>
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </span>
                  <span>•</span>
                  <span>{task.dueTime}</span>
                  {task.campaign && (
                    <>
                      <span>•</span>
                      <span className="truncate">{task.campaign}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
