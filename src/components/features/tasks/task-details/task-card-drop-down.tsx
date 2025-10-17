import { Edit, ExternalLink, MoreVertical, Trash2 } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";

interface TaskCardDropDownProps {
  setTaskEdit: (taskEdit: boolean) => void;
  onViewDetails: () => void;
}

export const TaskCardDropDown = ({
  setTaskEdit,
  onViewDetails,
}: TaskCardDropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onViewDetails}>
          <ExternalLink className="mr-2 size-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTaskEdit(true)}>
          <Edit className="mr-2 size-4" />
          Edit Task
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash2 className="mr-2 size-4" />
          Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
