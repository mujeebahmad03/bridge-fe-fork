"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useState } from "react";

import { CardTitle } from "./card-title";
import { TaskCardDropDown } from "../task-details";
import { TaskDialog, TaskSheet } from "../dialog";
import { Card, Checkbox } from "@/components/ui";

import { cn } from "@/lib/utils";
import { Task } from "@/types/task";
import { useTaskBoardStore } from "@/lib/stores/tasks";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const [taskEdit, setTaskEdit] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const toggleTaskSelection = useTaskBoardStore(
    (state) => state.toggleTaskSelection,
  );
  const selectedTasks = useTaskBoardStore((state) => state.selectedTasks);

  const isSelected = selectedTasks.includes(task.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto",
    position: isDragging ? "relative" : ("static" as "relative" | "static"),
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className={cn(
          "mb-3 p-4 shadow-sm transition-shadow duration-200 hover:shadow-md",
          "border border-border/40",
          "dark:border-border/30",
          isSelected && "ring-2 ring-primary",
        )}
      >
        <div className="relative">
          <div className="absolute left-0 top-0 flex items-center gap-2 p-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => toggleTaskSelection(task.id)}
              onClick={(e) => e.stopPropagation()}
            />

            <div className="cursor-move" {...attributes} {...listeners}>
              <GripVertical size={16} className="text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center justify-between pl-16">
            <CardTitle
              title={task.title}
              handleClick={() => setIsViewingDetails(true)}
            />
            <TaskCardDropDown
              setTaskEdit={setTaskEdit}
              onViewDetails={() => setIsViewingDetails(true)}
            />
          </div>
        </div>
      </Card>

      {taskEdit && (
        <TaskDialog
          taskTitle={task.title}
          isOpen={taskEdit}
          setIsOpen={setTaskEdit}
          task={task}
          isEditing={true}
        />
      )}

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
