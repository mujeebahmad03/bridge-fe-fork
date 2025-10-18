import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TaskCardProps {
  hasNewTasks: boolean;
  onNewTask: () => void;
}

export const NewTaskCard = ({ onNewTask }: TaskCardProps) => {
  return (
    <Card className="w-full border-0 shadow-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-sm font-medium text-foreground">
              No new tasks
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              All tasks are done — you&apos;ve earned a break!
            </p>
          </div>
        </div>
        <Button size="sm" variant="outline" onClick={onNewTask}>
          <Plus className="mr-1 h-4 w-4" />
          New task
        </Button>
      </div>
    </Card>
  );
};
