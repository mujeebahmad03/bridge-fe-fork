"use client";

import { CheckSquare, Hourglass, MoveHorizontalIcon } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";

import { useTaskBoardStore } from "@/lib/stores/tasks";
import { AssignTask } from "./assign-task";

export const TaskActions = () => {
  const moveSelectedTasks = useTaskBoardStore(
    (state) => state.moveSelectedTasks,
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="max-w-max gap-2">
            <MoveHorizontalIcon className="mr-2 h-4 w-4" />
            Move to
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => moveSelectedTasks("inProgress")}>
            <Hourglass className="mr-2 h-4 w-4" />
            In Progress
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => moveSelectedTasks("done")}>
            <CheckSquare className="mr-2 h-4 w-4" />
            Done
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="sm"
        onClick={() => moveSelectedTasks("done")}
        className="max-w-max gap-2"
      >
        <CheckSquare className="h-4 w-4" />
        Mark Complete
      </Button>

      <AssignTask />
    </>
  );
};
