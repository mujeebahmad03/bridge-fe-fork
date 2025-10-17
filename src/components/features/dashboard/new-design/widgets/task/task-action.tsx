import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssignTask } from "@/components/features/tasks/filters/assign-task";

interface TaskActionsProps {
  selectedCount: number;
  onMarkCompleted: () => void;
  onDelete: () => void;
  onAssignTask: () => void;
}

export const TaskActions = ({
  selectedCount,
  onMarkCompleted,
  onDelete,
  onAssignTask,
}: TaskActionsProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="mb-4 flex items-center gap-2 rounded-md bg-gray-50 p-2 dark:bg-gray-500/20">
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {selectedCount} task(s) selected
      </span>
      <div className="flex-grow"></div>
      <AssignTask onAssignTask={onAssignTask} />
      <Button
        size="sm"
        variant="outline"
        className="h-8 text-xs"
        onClick={onMarkCompleted}
      >
        Mark as completed
      </Button>
      <Button
        size="sm"
        variant="destructive"
        className="h-8 text-xs"
        onClick={onDelete}
      >
        <Trash2 className="mr-1 h-3 w-3" />
        Delete
      </Button>
    </div>
  );
};
