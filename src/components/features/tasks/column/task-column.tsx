"use client";

import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { useState, useEffect } from "react";

import { ColumnHeader } from "./column-header";
import { ColumnContent } from "./column-content";
import { Card } from "@/components/ui/card";
import { Collapsible } from "@/components/ui/collapsible";

import { cn } from "@/lib/utils";
import { ColumnType } from "@/types/task";
import { useTaskBoardStore } from "@/lib/stores/tasks";

interface TaskColumnProps {
  column: ColumnType;
  onAddTask: (columnId: string) => void;
  isCollapsed?: boolean;
}

export const TaskColumn = ({
  column,
  onAddTask,
  isCollapsed = false,
}: TaskColumnProps) => {
  const [isOpen, setIsOpen] = useState(!isCollapsed);

  const selectedTasks = useTaskBoardStore((state) => state.selectedTasks);
  const selectAllInColumn = useTaskBoardStore(
    (state) => state.selectAllInColumn,
  );

  useEffect(() => {
    setIsOpen(!isCollapsed);
  }, [isCollapsed]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: column.id,
  });

  const setRefs = (el: HTMLElement | null) => {
    setNodeRef(el);
    setDroppableRef(el);
  };

  const columnTaskIds = column.tasks.map((task) => task.id);
  const hasSelectedAll =
    columnTaskIds.length > 0 &&
    columnTaskIds.every((id) => selectedTasks.includes(id));

  const handleSelectAll = (checked: boolean) => {
    selectAllInColumn(column.id, checked ? columnTaskIds : []);
  };

  return (
    <Card
      ref={setRefs}
      style={style}
      className={cn(
        "relative mx-2 flex max-h-[calc(100vh-8rem)] min-h-[100px] w-80 touch-none flex-col rounded-lg bg-card text-card-foreground",
        "border border-border/40 shadow-sm backdrop-blur-sm",
        "dark:bg-card/90 dark:shadow-none",
        column.color && `border-t-4 ${column.color}`,
        isDragging && "opacity-50",
        isOver && "bg-accent/10 dark:bg-accent/5",
      )}
      {...attributes}
    >
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex h-full flex-col"
      >
        <ColumnHeader
          title={column.title}
          taskCount={column.tasks.length}
          isOpen={isOpen}
          onAddTask={() => onAddTask(column.id)}
          dragHandleProps={listeners}
          onSelectAll={handleSelectAll}
          hasSelectedAll={hasSelectedAll}
          hasTasksToSelect={column.tasks.length > 0}
        />
        <ColumnContent tasks={column.tasks} />
      </Collapsible>
    </Card>
  );
};
