"use client";

import { useState } from "react";

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { useTaskBoardStore } from "@/lib/stores/tasks";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

const users = ["John Doe", "Jane Smith", "Bob Johnson"];

export const AssignTask = ({ onAssignTask }: { onAssignTask?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const assignSelectedTasks = useTaskBoardStore(
    (state) => state.assignSelectedTasks,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team member"
          className="w-[200px] justify-between gap-2"
        >
          <div className="flex items-center gap-2 truncate">
            <User className="h-4 w-4 shrink-0" />
            <span className="truncate">{selectedUser || "Reassign to..."}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search team member..." />
          <CommandList>
            <CommandEmpty>No team member found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user}
                  value={user}
                  onSelect={(currentValue) => {
                    setSelectedUser(
                      currentValue === selectedUser ? "" : currentValue,
                    );
                    assignSelectedTasks(
                      currentValue === selectedUser ? "" : currentValue,
                    );
                    setOpen(false);
                    onAssignTask?.();
                  }}
                >
                  <User
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedUser === user ? "opacity-100" : "opacity-40",
                    )}
                  />
                  {user}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
