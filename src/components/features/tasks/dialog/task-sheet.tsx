import { toast } from "sonner";

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui";
import { TaskDetails } from "../task-details";
import { TasksInterface } from "@/components/features/crm";

import { Task } from "@/types/task";

interface TaskDrawerProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskSheet = ({ task, isOpen, onClose }: TaskDrawerProps) => {
  const handleComplete = () => {
    onClose();
    toast.success("Task marked as completed");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[80vw] sm:max-w-[80vw]">
        <SheetHeader className="flex justify-between border-b pb-4">
          <SheetTitle>{task.title}</SheetTitle>
          <SheetDescription className="sr-only">
            {task.description}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex justify-end gap-4">
          <Button onClick={handleComplete}>Mark as completed</Button>
        </div>

        <div className="grid w-full grid-cols-[400px_1fr] gap-6 overflow-y-auto p-4">
          <TaskDetails task={task} />
          <TasksInterface />
        </div>
      </SheetContent>
    </Sheet>
  );
};
