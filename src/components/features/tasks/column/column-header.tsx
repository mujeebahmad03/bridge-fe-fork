import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { GripHorizontal, Plus } from "lucide-react";

import { CardHeader } from "@/components/ui/card";
import { CollapsibleTrigger } from "@/components/ui/collapsible";

import { Button, Checkbox } from "@/components/ui";

interface ColumnHeaderProps {
  title: string;
  taskCount: number;
  isOpen: boolean;
  onAddTask: () => void;
  dragHandleProps: SyntheticListenerMap | undefined;
  onSelectAll?: (checked: boolean) => void;
  hasSelectedAll?: boolean;
  hasTasksToSelect?: boolean;
}

export const ColumnHeader = ({
  title,
  taskCount,
  onAddTask,
  dragHandleProps,
  hasSelectedAll,
  hasTasksToSelect,
  onSelectAll,
}: ColumnHeaderProps) => {
  return (
    <CardHeader className="flex flex-row justify-between space-y-0 border-b p-4">
      <div className="flex items-center gap-2">
        <div className="cursor-move" {...dragHandleProps}>
          <GripHorizontal size={16} className="text-muted-foreground" />
        </div>
        {hasTasksToSelect && (
          <Checkbox
            checked={hasSelectedAll}
            onCheckedChange={(checked) => onSelectAll?.(checked as boolean)}
          />
        )}
        <CollapsibleTrigger asChild>
          <div className="flex cursor-pointer items-center gap-2">
            <span className="font-semibold">{title}</span>
            <span className="text-xs text-muted-foreground">({taskCount})</span>
          </div>
        </CollapsibleTrigger>
      </div>
      <Button variant="ghost" size="icon" onClick={onAddTask}>
        <Plus className="h-4 w-4" />
      </Button>
    </CardHeader>
  );
};
