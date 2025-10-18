"use client";

import { useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Contact } from "@/crmContacts/types";
import { RiBardFill } from "@remixicon/react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact;
}

export function EmailModal({ isOpen, onClose, contact }: EmailModalProps) {
  const [emailForm, setEmailForm] = useState({
    subject: "",
    message: "",
  });

  const handleSendEmail = () => {
    if (!emailForm.subject || !emailForm.message) {
      toast.error("Please fill in both subject and message");
      return;
    }

    console.log("Sending email:", emailForm);
    setEmailForm({ subject: "", message: "" });
    onClose();
    toast.success("Email sent successfully!");
  };

  const useAi = () => {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send Email to {contact.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-subject">Subject</Label>
            <Input
              id="email-subject"
              placeholder="Enter email subject..."
              value={emailForm.subject}
              onChange={(e) =>
                setEmailForm({ ...emailForm, subject: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-message">Message</Label>
            {/* <Textarea
              id="email-message"
              placeholder="Enter your message..."
              value={emailForm.message}
              onChange={(e) =>
                setEmailForm({ ...emailForm, message: e.target.value })
              }
              className="min-h-[120px]"
            /> */}
            <div>
              <ReactQuill
                value={emailForm.message}
                onChange={(value) =>
                  setEmailForm({ ...emailForm, message: value })
                }
                placeholder="Write your message..."
                className="rounded-md border"
                style={{ minHeight: "200px" }}
              />
            </div>
          </div>

          <div className="flex justify-between gap-2 pt-4">
            <Button
              onClick={useAi}
              className="w-fit bg-purple-100 text-purple-500 hover:bg-purple-200"
            >
              <RiBardFill className="h-2 w-2" />
              Help me write
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={handleSendEmail} className="flex-1">
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
