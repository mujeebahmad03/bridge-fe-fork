"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Contact } from "@/crmContacts/types";

interface LinkedInModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact;
}

export function LinkedInModal({
  isOpen,
  onClose,
  contact,
}: LinkedInModalProps) {
  const [linkedinForm, setLinkedinForm] = useState({
    message: "",
  });

  const handleSendLinkedIn = () => {
    if (!linkedinForm.message) {
      toast.error("Please enter a message");
      return;
    }

    console.log("Sending LinkedIn message:", linkedinForm);
    setLinkedinForm({ message: "" });
    onClose();
    toast.success("LinkedIn message sent successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send LinkedIn Message to {contact.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin-message">Message</Label>
            <Textarea
              id="linkedin-message"
              placeholder="Enter your LinkedIn message..."
              value={linkedinForm.message}
              onChange={(e) =>
                setLinkedinForm({ ...linkedinForm, message: e.target.value })
              }
              className="min-h-[120px]"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
            <Button onClick={handleSendLinkedIn} className="flex-1">
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
