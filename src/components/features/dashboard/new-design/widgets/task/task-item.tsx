"use client";

import { CheckCircle2, Circle, MoreVertical } from "lucide-react";
import { useState } from "react";

import { TaskSheet } from "@/components/features/tasks/dialog";

import { cn } from "@/lib/utils";
import { Task, TaskStatus } from "@/types/task";

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  onToggleSelect: (taskId: string) => void;
}

export const TaskItem = ({
  task,
  isSelected,
  onToggleSelect,
}: TaskItemProps) => {
  const [isViewingDetails, setIsViewingDetails] = useState(false);

  return (
    <>
      <div
        className={cn("task-item", {
          "opacity-50": task.status === TaskStatus.DONE,
        })}
      >
        <div
          className="task-checkbox cursor-pointer"
          onClick={() => onToggleSelect(task.id)}
        >
          {isSelected ? (
            <CheckCircle2 className="h-4 w-4 text-primary" />
          ) : task.status === TaskStatus.DONE ? (
            <CheckCircle2 className="h-4 w-4 text-gray-400" />
          ) : (
            <Circle
              className={cn("h-4 w-4", {
                "text-red-500": task.isOverdue,
                "text-blue-500": task.hasReplies && !task.isOverdue,
                "text-gray-400": !task.isOverdue && !task.hasReplies,
              })}
            />
          )}
        </div>
        <div className="task-details">
          <p
            className={cn("task-title cursor-pointer", {
              "line-through": task.status === TaskStatus.DONE,
            })}
            onClick={() => setIsViewingDetails(true)}
          >
            {task.title}
            {task.isOverdue && (
              <span className="ml-2 text-xs font-medium text-red-500">
                Overdue
              </span>
            )}
            {task.hasReplies && !task.isOverdue && (
              <span className="ml-2 text-xs font-medium text-blue-500">
                Replies
              </span>
            )}
          </p>
          <p className="task-company">{task.company || task.contact}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {isViewingDetails && (
        <TaskSheet
          isOpen={isViewingDetails}
          task={task}
          onClose={() => setIsViewingDetails(false)}
        />
      )}
    </>
  );
};
