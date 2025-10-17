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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddToListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  entityType: "contacts" | "companies" | "leads";
  onConfirm: (listId: string) => void;
}

const AVAILABLE_LISTS = {
  contacts: [
    { id: "vip-contacts", name: "VIP Contacts" },
    { id: "newsletter-subscribers", name: "Newsletter Subscribers" },
    { id: "event-attendees", name: "Event Attendees" },
    { id: "high-value-prospects", name: "High Value Prospects" },
  ],
  companies: [
    { id: "enterprise-clients", name: "Enterprise Clients" },
    { id: "partner-companies", name: "Partner Companies" },
    { id: "target-accounts", name: "Target Accounts" },
    { id: "inactive-accounts", name: "Inactive Accounts" },
  ],
  leads: [
    { id: "hot-leads", name: "Hot Leads" },
    { id: "nurture-campaign", name: "Nurture Campaign" },
    { id: "demo-scheduled", name: "Demo Scheduled" },
    { id: "follow-up-required", name: "Follow Up Required" },
  ],
};

export function AddToListModal({
  open,
  onOpenChange,
  selectedCount,
  entityType,
  onConfirm,
}: AddToListModalProps) {
  const [selectedList, setSelectedList] = useState("");

  const handleConfirm = () => {
    if (selectedList) {
      onConfirm(selectedList);
      setSelectedList("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setSelectedList("");
    onOpenChange(false);
  };

  const availableLists = AVAILABLE_LISTS[entityType];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add {selectedCount} {entityType} to List
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select list</label>
            <Select value={selectedList} onValueChange={setSelectedList}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a list..." />
              </SelectTrigger>
              <SelectContent>
                {availableLists.map((list) => (
                  <SelectItem key={list.id} value={list.id}>
                    {list.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedList}>
            Add to List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
