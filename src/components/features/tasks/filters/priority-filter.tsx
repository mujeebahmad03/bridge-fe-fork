import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskPriority } from "@/types/task";

interface PriorityFilterProps {
  value: TaskPriority | "all";
  onChange: (value: TaskPriority | "all") => void;
}

export const PriorityFilter = ({ value, onChange }: PriorityFilterProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Task Priority</h3>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value={TaskPriority.HIGH}>High Priority</SelectItem>
          <SelectItem value={TaskPriority.MEDIUM}>Medium Priority</SelectItem>
          <SelectItem value={TaskPriority.LOW}>Low Priority</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
