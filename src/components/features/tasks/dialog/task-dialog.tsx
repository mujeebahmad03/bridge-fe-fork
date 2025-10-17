"use client";

import { useState } from "react";

import { TaskForm } from "../form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from "@/components/ui";
import { Task } from "@/types/task";

interface TaskDialogProps {
  taskTitle: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isEditing?: boolean;
  task?: Task;
}

export const TaskDialog = ({
  taskTitle,
  isOpen,
  setIsOpen,
  isEditing: initialEditMode = true,
}: TaskDialogProps) => {
  const [isEditing, setIsEditing] = useState(initialEditMode);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex h-[90vh] flex-col sm:max-w-[1000px]">
        <DialogHeader className="flex flex-shrink-0 flex-row items-center justify-between">
          <div className="flex-1">
            <DialogTitle>{taskTitle}</DialogTitle>
            <DialogDescription className="sr-only">
              {isEditing ? `Edit ${taskTitle} task` : "Create task"}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <TaskForm
              onCancel={() => {
                setIsEditing(false);
                setIsOpen(false);
              }}
            />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
