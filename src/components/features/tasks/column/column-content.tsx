import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { TaskCard } from "../card";
import { CardContent, CollapsibleContent } from "@/components/ui";

import { cn } from "@/lib/utils";
import { Task } from "@/types/task";

interface ColumnContentProps {
  tasks: Task[];
}

export const ColumnContent = ({ tasks }: ColumnContentProps) => {
  return (
    <CollapsibleContent
      className={cn(
        "task-column-expand-content flex min-h-0 flex-1 flex-col overflow-hidden",
        "data-[state=closed]:animate-collapse data-[state=open]:animate-expand",
      )}
    >
      <CardContent className="flex-1 overflow-y-auto p-4">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </CardContent>
    </CollapsibleContent>
  );
};
