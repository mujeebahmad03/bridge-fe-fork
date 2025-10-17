"use client";

import {
  Plus,
  Calendar,
  Clock,
  Check,
  MoreHorizontal,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarDisplay } from "@/crmContacts/components/avatar-display";

import { formatDate, isOverdue, toggleTaskComplete } from "@/crmContacts/utils";
import { TaskButton } from "./task-button";

export interface Task {
  id: string;
  title: string;
  assignee: { name: string; avatar: string };
  dueDate: string;
  dueTime: string;
  completed: boolean;
  createdAt: string;
}

interface TasksSectionProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  onCreateTask: () => void;
}

export function TasksSection({
  tasks,
  setTasks,
  onCreateTask,
}: TasksSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggleComplete = (taskId: string) => {
    setTasks(toggleTaskComplete(tasks, taskId));
  };

  return (
    <div className="space-y-4">
      <TaskButton
        tasks={tasks}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        onCreateTask={onCreateTask}
      />

      {isExpanded && (
        <div className="animate-fade-in space-y-3">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className={`transition-all duration-200 hover:shadow-sm ${
                task.completed ? "opacity-60" : ""
              } ${
                isOverdue(task.dueDate) && !task.completed
                  ? "border-destructive/50"
                  : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="mt-0.5 h-6 w-6 p-0"
                      onClick={() => handleToggleComplete(task.id)}
                    >
                      {task.completed ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <div className="h-4 w-4 rounded-sm border-2 border-muted-foreground" />
                      )}
                    </Button>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium ${
                          task.completed
                            ? "text-muted-foreground line-through"
                            : ""
                        }`}
                      >
                        {task.title}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                        >
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleToggleComplete(task.id)}
                        >
                          {task.completed ? (
                            <>
                              <RotateCcw className="mr-2 h-4 w-4" />
                              Mark as Incomplete
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Mark as Complete
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="ml-9 flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span
                        className={
                          isOverdue(task.dueDate) && !task.completed
                            ? "text-destructive"
                            : ""
                        }
                      >
                        {formatDate(task.dueDate)}
                      </span>
                    </div>
                    {task.dueTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{task.dueTime}</span>
                      </div>
                    )}
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
              </CardContent>
            </Card>
          ))}

          {tasks.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <p className="text-sm">No tasks yet</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCreateTask}
                className="mt-2"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create your first task
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
