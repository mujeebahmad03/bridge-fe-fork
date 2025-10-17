"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Check,
  MoreHorizontal,
  User,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate, isOverdue } from "@/crmContacts/utils";
import { AvatarDisplay } from "@/crmContacts/components/avatar-display";
import { PriorityBadge } from "@/crmContacts/components/priority-badge";

interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: { name: string; avatar: string; id: string };
  dueDate: string;
  dueTime?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskCardProps) {
  return (
    <Card
      className={`transition-all duration-200 hover:shadow-sm ${
        task.completed ? "opacity-60" : ""
      } ${isOverdue(task.dueDate) && !task.completed ? "border-destructive/50" : ""}`}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Button
              size="sm"
              variant="ghost"
              className="mt-0.5 h-6 w-6 shrink-0 p-0"
              onClick={() => onToggleComplete(task.id)}
            >
              {task.completed ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <div className="h-4 w-4 rounded-sm border-2 border-muted-foreground" />
              )}
            </Button>

            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3
                  className={`text-sm font-medium ${task.completed ? "text-muted-foreground line-through" : ""}`}
                >
                  {task.title}
                </h3>
                <div className="flex shrink-0 items-center gap-2">
                  <PriorityBadge priority={task.priority} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(task)}>
                        Edit Task
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onToggleComplete(task.id)}
                      >
                        {task.completed
                          ? "Mark as Incomplete"
                          : "Mark as Complete"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(task.id)}
                        className="text-destructive"
                      >
                        Delete Task
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {task.description && (
                <p className="text-xs text-muted-foreground">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          <div className="ml-9 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span
                className={
                  isOverdue(task.dueDate) && !task.completed
                    ? "font-medium text-destructive"
                    : ""
                }
              >
                {formatDate(task.dueDate)}
                {isOverdue(task.dueDate) && !task.completed && (
                  <AlertCircle className="ml-1 inline h-3 w-3" />
                )}
              </span>
            </div>

            {task.dueTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{task.dueTime}</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <div className="flex items-center gap-1">
                <AvatarDisplay
                  name={task.assignee.name}
                  avatar={task.assignee.avatar}
                  size="sm"
                />
                <span>{task.assignee.name}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
