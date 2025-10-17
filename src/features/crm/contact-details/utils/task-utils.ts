/**
 * Shared task management utility functions
 */

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground";
    case "medium":
      return "bg-warning text-warning-foreground";
    case "low":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export interface TaskBase {
  id: string;
  completed: boolean;
  updatedAt?: string;
}

export function toggleTaskComplete<T extends TaskBase>(
  tasks: T[],
  taskId: string,
): T[] {
  return tasks.map((task) =>
    task.id === taskId
      ? ({
          ...task,
          completed: !task.completed,
          updatedAt: new Date().toISOString(),
        } as T)
      : task,
  );
}
