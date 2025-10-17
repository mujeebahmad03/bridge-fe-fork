"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Contact } from "@/crmContacts/types";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact;
}

export function CallModal({ isOpen, onClose, contact }: CallModalProps) {
  const handleCall = () => {
    toast.success(`Calling ${contact.name} at ${contact.phone}...`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Call {contact.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl font-semibold text-primary">
                {contact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <p className="text-lg font-medium">{contact.name}</p>
            <p className="text-muted-foreground">{contact.phone}</p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
            <Button onClick={handleCall} className="flex-1">
              Start Call
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
