"use client";

import { Plus, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Task } from "./tasks-section";

interface TaskButtonProps {
  tasks: Task[];
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  onCreateTask: () => void;
}

export function TaskButton({
  tasks,
  isExpanded,
  setIsExpanded,
  onCreateTask,
}: TaskButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const incompleteTasksCount = mounted
    ? tasks.filter((t) => !t.completed).length
    : 0;

  return (
    <Button
      variant="ghost"
      className="h-auto w-full justify-between p-0 text-xs font-medium uppercase tracking-wide text-muted-foreground hover:bg-transparent lg:text-sm"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center gap-2">
        Tasks
        {mounted && (
          <Badge variant="secondary" className="text-xs">
            {incompleteTasksCount}
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span
          onClick={(e) => {
            e.stopPropagation();
            onCreateTask();
          }}
        >
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
            <Plus className="h-3 w-3" />
          </Button>
        </span>
        {mounted &&
          (isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ))}
      </div>
    </Button>
  );
}
