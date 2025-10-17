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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddOwnersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  entityType: "contacts" | "companies" | "leads";
  onConfirm: (ownerId: string) => void;
}

const AVAILABLE_OWNERS = [
  {
    id: "stephen-ogundele",
    name: "Stephen Ogundele",
    email: "stephen@company.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    email: "michael@company.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "tim-cook",
    name: "Tim Cook",
    email: "tim@company.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    email: "jane@company.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export function AddOwnersModal({
  open,
  onOpenChange,
  selectedCount,
  entityType,
  onConfirm,
}: AddOwnersModalProps) {
  const [selectedOwner, setSelectedOwner] = useState("");
  const [comboboxOpen, setComboboxOpen] = useState(false);

  const handleSelectOwner = (ownerId: string) => {
    setSelectedOwner(ownerId);
    setComboboxOpen(false);
  };

  const handleConfirm = () => {
    if (selectedOwner) {
      onConfirm(selectedOwner);
      setSelectedOwner("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setSelectedOwner("");
    onOpenChange(false);
  };

  const selectedOwnerData = AVAILABLE_OWNERS.find(
    (owner) => owner.id === selectedOwner,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Assign Owner to {selectedCount} {entityType}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select owner</label>
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={comboboxOpen}
                  className="w-full justify-between bg-transparent"
                >
                  {selectedOwnerData ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={selectedOwnerData.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {selectedOwnerData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{selectedOwnerData.name}</span>
                    </div>
                  ) : (
                    "Select owner..."
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search owners..." />
                  <CommandList>
                    <CommandEmpty>No owners found.</CommandEmpty>
                    <CommandGroup>
                      {AVAILABLE_OWNERS.map((owner) => (
                        <CommandItem
                          key={owner.id}
                          value={owner.name}
                          onSelect={() => handleSelectOwner(owner.id)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedOwner === owner.id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={owner.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {owner.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm">{owner.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {owner.email}
                              </span>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedOwner}>
            Assign Owner
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
