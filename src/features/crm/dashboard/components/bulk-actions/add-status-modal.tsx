"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  entityType: "contacts" | "companies" | "leads";
  onConfirm: (status: string) => void;
}

const EXISTING_STATUSES = {
  contacts: ["Active", "Inactive", "Prospect", "Customer", "Former Customer"],
  companies: ["Active", "Inactive", "Prospect", "Customer", "Partner"],
  leads: [
    "New",
    "Contacted",
    "Qualified",
    "Proposal",
    "Negotiation",
    "Closed Won",
    "Closed Lost",
  ],
};

export function AddStatusModal({
  open,
  onOpenChange,
  selectedCount,
  entityType,
  onConfirm,
}: AddStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleSelectStatus = (status: string) => {
    setSelectedStatus(status);
    setComboboxOpen(false);
    setIsCreatingNew(false);
  };

  const handleCreateNew = () => {
    if (newStatus.trim()) {
      setSelectedStatus(newStatus.trim());
      setIsCreatingNew(false);
    }
  };

  const handleConfirm = () => {
    if (selectedStatus) {
      onConfirm(selectedStatus);
      setSelectedStatus("");
      setNewStatus("");
      setIsCreatingNew(false);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setSelectedStatus("");
    setNewStatus("");
    setIsCreatingNew(false);
    onOpenChange(false);
  };

  const availableStatuses = EXISTING_STATUSES[entityType];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add Status to {selectedCount} {entityType}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!isCreatingNew ? (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select status</label>
              <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={comboboxOpen}
                    className="w-full justify-between bg-transparent"
                  >
                    {selectedStatus || "Select status..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search status..." />
                    <CommandList>
                      <CommandEmpty>No status found.</CommandEmpty>
                      <CommandGroup>
                        {availableStatuses.map((status) => (
                          <CommandItem
                            key={status}
                            value={status}
                            onSelect={() => handleSelectStatus(status)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedStatus === status
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {status}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCreatingNew(true)}
                className="w-full justify-start text-primary"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create new status
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium">Create new status</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter status name"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateNew()}
                />
                <Button
                  onClick={handleCreateNew}
                  size="sm"
                  disabled={!newStatus.trim()}
                >
                  Create
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCreatingNew(false)}
                className="w-full"
              >
                Back to existing statuses
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedStatus}>
            Add Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
