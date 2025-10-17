"use client";

import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { TaskColumn } from "./column";
import { TaskActions, TaskFilters } from "./filters";
import { Button } from "@/components/ui";

import { useDragAndDrop, useFilteredColumns } from "@/hooks/ui";
import { cn } from "@/lib/utils";
import { useTaskBoardStore } from "@/lib/stores/tasks";
import {
  Task,
  TaskAssociatedWith,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "@/types/task";

export const Tasks = () => {
  const [allCollapsed, setAllCollapsed] = useState(false);

  const columns = useTaskBoardStore((state) => state.columns);
  const setColumns = useTaskBoardStore((state) => state.setColumns);
  const setActiveTask = useTaskBoardStore((state) => state.setActiveTask);
  const selectedTasks = useTaskBoardStore((state) => state.selectedTasks);

  // Using our filtered columns selector
  const filteredColumns = useFilteredColumns();

  const { handleDragStart, handleDragOver, handleDragEnd } = useDragAndDrop(
    columns,
    setColumns,
    setActiveTask,
  );

  const handleAddTask = (columnId: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: "New Task",
      description: "Click to edit",
      priority: TaskPriority.LOW,
      associatedWith: TaskAssociatedWith.CONTACT,
      campaign: "",
      dueDate: new Date(),
      assignedTo: "John Doe",
      taskType: TaskType.EMAIL,
      dueTime: "12:00",
      status: TaskStatus.TODO,
      isOverdue: false,
      hasReplies: false,
    };

    setColumns(
      columns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            tasks: [...col.tasks, newTask],
          };
        }
        return col;
      }),
    );
  };

  return (
    <div className="w-full overflow-hidden bg-background p-8">
      <div className="mx-auto max-w-[1440px] space-y-4">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-4">
            {selectedTasks.length > 0 && <TaskActions />}
            <TaskFilters />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAllCollapsed((prev) => !prev)}
              className="max-w-max gap-2"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  allCollapsed && "rotate-180",
                )}
              />
              {allCollapsed ? "Expand All" : "Collapse All"}
            </Button>
          </div>
        </div>

        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <div className="max-h-[calc(100vh-12rem)] w-full flex-1 overflow-x-auto">
            <SortableContext
              items={columns.map((col) => col.id)}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex min-w-max gap-4 pb-4">
                {filteredColumns.map((column) => (
                  <TaskColumn
                    key={column.id}
                    column={column}
                    onAddTask={handleAddTask}
                    isCollapsed={allCollapsed}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        </DndContext>
      </div>
    </div>
  );
};
