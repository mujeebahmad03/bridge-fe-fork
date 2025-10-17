import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { ColumnType, Task, TaskType } from "@/types/task";

export const useDragAndDrop = (
  columns: ColumnType[],
  setColumns: (columns: ColumnType[]) => void,
  setActiveTask: (task: Task | null) => void,
) => {
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = columns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const isColumnCompatibleWithTask = (
    columnId: UniqueIdentifier,
    taskType: TaskType,
  ) => {
    if (
      ["todo", "inProgress", "done"].includes(String(columnId).toLowerCase())
    ) {
      return true;
    }

    switch (columnId) {
      case "callsTodo":
        return taskType === TaskType.CALL;
      case "emailTodo":
        return taskType === TaskType.EMAIL;
      case "linkedInTodo":
        return taskType === TaskType.LINKEDIN;
      default:
        return true;
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
    const overColumnIndex = columns.findIndex((col) => col.id === overId);

    // Handle column reordering
    if (activeColumnIndex !== -1 && overColumnIndex !== -1) {
      const newColumns = arrayMove(columns, activeColumnIndex, overColumnIndex);
      setColumns(newColumns);
      return;
    }

    const activeTask = columns
      .flatMap((col) => col.tasks)
      .find((task) => task.id === activeId);
    const activeColumnId = columns.find((col) =>
      col.tasks.some((task) => task.id === activeId),
    )?.id;
    const overColumnId = overId;

    if (
      !activeColumnId ||
      !overColumnId ||
      activeColumnId === overColumnId ||
      !activeTask
    )
      return;

    if (!isColumnCompatibleWithTask(overColumnId, activeTask.taskType)) {
      return;
    }

    // Create new columns array instead of using map on prev
    const newColumns = columns.map((col) => {
      if (col.id === activeColumnId) {
        return {
          ...col,
          tasks: col.tasks.filter((task) => task.id !== activeId),
        };
      }
      if (col.id === overColumnId) {
        return {
          ...col,
          tasks: [...col.tasks, activeTask],
        };
      }
      return col;
    });

    setColumns(newColumns);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = columns.find((col) =>
      col.tasks.some((task) => task.id === active.id),
    )?.id;
    const overColumnId = columns.find((col) =>
      col.tasks.some((task) => task.id === over.id),
    )?.id;

    if (!activeColumnId || !overColumnId || activeColumnId !== overColumnId)
      return;

    const columnIndex = columns.findIndex((col) => col.id === activeColumnId);
    const activeIndex = columns[columnIndex].tasks.findIndex(
      (t) => t.id === active.id,
    );
    const overIndex = columns[columnIndex].tasks.findIndex(
      (t) => t.id === over.id,
    );

    // Create new columns array directly
    const newColumns = [...columns];
    newColumns[columnIndex] = {
      ...newColumns[columnIndex],
      tasks: arrayMove(newColumns[columnIndex].tasks, activeIndex, overIndex),
    };

    setColumns(newColumns);
    setActiveTask(null);
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
