import { TaskItem } from "./task-item";
import { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  selectedTasks: string[];
  onToggleTaskSelection: (taskId: string) => void;
}

export const TaskList = ({
  tasks,
  selectedTasks,
  onToggleTaskSelection,
}: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">
        No tasks found for this category
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isSelected={selectedTasks.includes(task.id)}
          onToggleSelect={onToggleTaskSelection}
        />
      ))}
    </div>
  );
};
