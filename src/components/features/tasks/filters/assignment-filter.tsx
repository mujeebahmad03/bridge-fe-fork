import {
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

interface AssignmentFilterProps {
  assignedToFilter: string;
  setAssignedToFilter: (assignedTo: string) => void;
  showAssignedOnly: boolean;
  setShowAssignedOnly: (showAssignedOnly: boolean) => void;
}

export const AssignmentFilter = ({
  assignedToFilter,
  setAssignedToFilter,
  showAssignedOnly,
  setShowAssignedOnly,
}: AssignmentFilterProps) => {
  const users = ["John Doe", "Jane Smith", "Bob Johnson"];

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Assignment</h3>
      <Select value={assignedToFilter} onValueChange={setAssignedToFilter}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by assignee" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Users</SelectItem>
          {users.map((user) => (
            <SelectItem key={user} value={user}>
              {user}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="assigned-only"
          checked={showAssignedOnly}
          onCheckedChange={setShowAssignedOnly}
        />
        <label
          htmlFor="assigned-only"
          className="text-sm text-muted-foreground"
        >
          Show assigned tasks only
        </label>
      </div>
    </div>
  );
};
