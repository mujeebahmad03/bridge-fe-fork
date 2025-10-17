import { create } from "zustand";
import { TaskStatus, TaskBoardState, Task } from "@/types/task";
import { taskColumns } from "@/config/task-columns";

export const useTaskBoardStore = create<TaskBoardState>()((set) => ({
  columns: taskColumns,
  activeTask: null,
  showTaskList: true,
  selectedTasks: [],

  setColumns: (columns) => set({ columns }),
  setActiveTask: (activeTask) => set({ activeTask }),
  setShowTaskList: (showTaskList) => set({ showTaskList }),

  toggleTaskSelection: (taskId) =>
    set((state) => ({
      selectedTasks: state.selectedTasks.includes(taskId)
        ? state.selectedTasks.filter((id) => id !== taskId)
        : [...state.selectedTasks, taskId],
    })),

  selectAllInColumn: (columnId, taskIds) =>
    set((state) => {
      const otherColumnSelections = state.selectedTasks.filter(
        (id) =>
          !state.columns
            .find((col) => col.id === columnId)
            ?.tasks.some((task) => task.id === id),
      );
      return { selectedTasks: [...otherColumnSelections, ...taskIds] };
    }),

  assignSelectedTasks: (userId) =>
    set((state) => ({
      columns: state.columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((task) =>
          state.selectedTasks.includes(task.id)
            ? { ...task, assignedTo: userId }
            : task,
        ),
      })),
      selectedTasks: [],
    })),

  moveSelectedTasks: (targetColumnId) =>
    set((state) => {
      const targetColumn = state.columns.find(
        (col) => col.id === targetColumnId,
      );
      if (!targetColumn) return state;

      const newStatus =
        targetColumnId === "done"
          ? TaskStatus.DONE
          : targetColumnId === "inProgress"
            ? TaskStatus.IN_PROGRESS
            : TaskStatus.TODO;

      // Get the IDs of tasks already in the target column
      const existingTaskIds = targetColumn.tasks.map((task) => task.id);

      return {
        columns: state.columns.map((col) => ({
          ...col,
          tasks:
            col.id === targetColumnId
              ? [
                  ...col.tasks,
                  ...state.selectedTasks
                    .filter((taskId) => !existingTaskIds.includes(taskId)) // Filter out tasks that already exist in target column
                    .map((taskId) => {
                      const task = state.columns
                        .flatMap((c) => c.tasks)
                        .find((t) => t.id === taskId);
                      return task ? { ...task, status: newStatus } : null;
                    })
                    .filter((task): task is Task => task !== null),
                ]
              : col.tasks.filter(
                  (task) =>
                    !state.selectedTasks.includes(task.id) ||
                    existingTaskIds.includes(task.id),
                ),
        })),
        selectedTasks: [],
      };
    }),
}));
