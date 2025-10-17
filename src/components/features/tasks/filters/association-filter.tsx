import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskAssociatedWith } from "@/types/task";

interface AssociationFilterProps {
  value: TaskAssociatedWith | "all";
  onChange: (value: TaskAssociatedWith | "all") => void;
}

export const AssociationFilter = ({
  value,
  onChange,
}: AssociationFilterProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Task Association</h3>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by association" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Associations</SelectItem>
          <SelectItem value={TaskAssociatedWith.CONTACT}>Contacts</SelectItem>
          <SelectItem value={TaskAssociatedWith.COMPANY}>Companies</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
