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
import { Badge } from "@/components/ui";
import { X } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact;
  isReply?: boolean;
  existingSubject?: string;
  existingEmail?: string;
}

export function EmailModal({
  isOpen,
  onClose,
  contact,
  isReply = false,
  existingSubject = "",
  existingEmail,
}: EmailModalProps) {
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const [toInput, setToInput] = useState("");
  const [ccInput, setCcInput] = useState("");
  const [bccInput, setBccInput] = useState("");

  const [emailForm, setEmailForm] = useState({
    to: existingEmail ? [existingEmail] : [],
    cc: [] as string[],
    bcc: [] as string[],
    subject: isReply ? `Re: ${existingSubject}` : "",
    message: "",
  });

  const addRecipient = (email: string, field: "to" | "cc" | "bcc") => {
    if (email && email.includes("@")) {
      setEmailForm((prev) => {
        const current = prev[field];
        if (!current.includes(email)) {
          return { ...prev, [field]: [...current, email] };
        }
        return prev;
      });
    }
  };

  const removeRecipient = (email: string, field: "to" | "cc" | "bcc") => {
    setEmailForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((e) => e !== email),
    }));
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    field: "to" | "cc" | "bcc",
    value: string,
    setter: (v: string) => void,
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addRecipient(value.trim(), field);
      setter("");
    }
  };

  const handleSendEmail = () => {
    if (
      emailForm.to.length === 0 ||
      !emailForm.subject.trim() ||
      !emailForm.message.trim()
    ) {
      toast.error("Please fill in To, Subject, and Message fields.");
      return;
    }

    console.log("Sending email:", emailForm);
    setEmailForm({
      to: contact.email ? [contact.email] : [],
      cc: [],
      bcc: [],
      subject: "",
      message: "",
    });
    onClose();
    toast.success("Email sent successfully!");
  };

  const useAi = () => {
    toast("AI writing assistant not yet implemented.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isReply ? "Reply" : "New Message"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!isReply && (
            <div className="space-y-2">
              <label className="text-sm text-gray-600">From</label>
              <Input
                placeholder="Recipient email"
                value={contact.email}
                onChange={() => {}}
                className="mt-1"
                disabled
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>To</Label>
            <div className="mb-1 flex flex-wrap gap-1">
              {emailForm.to.map((email) => (
                <Badge key={email} variant="secondary" className="text-xs">
                  {email}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0"
                    onClick={() => removeRecipient(email, "to")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Add recipient..."
              value={toInput}
              onChange={(e) => setToInput(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, "to", toInput, setToInput)}
              onBlur={() => {
                if (toInput.trim()) {
                  addRecipient(toInput.trim(), "to");
                  setToInput("");
                }
              }}
            />
            <div className="mt-2 flex items-center space-x-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowCc(!showCc)}
                className="h-auto p-0 text-xs text-muted-foreground"
              >
                Cc
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowBcc(!showBcc)}
                className="h-auto p-0 text-xs text-muted-foreground"
              >
                Bcc
              </Button>
            </div>
          </div>

          {showCc && (
            <div className="space-y-2">
              <Label>Cc</Label>
              <div className="mb-1 flex flex-wrap gap-1">
                {emailForm.cc.map((email) => (
                  <Badge key={email} variant="secondary" className="text-xs">
                    {email}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0"
                      onClick={() => removeRecipient(email, "cc")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Add CC..."
                value={ccInput}
                onChange={(e) => setCcInput(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, "cc", ccInput, setCcInput)}
                onBlur={() => {
                  if (ccInput.trim()) {
                    addRecipient(ccInput.trim(), "cc");
                    setCcInput("");
                  }
                }}
              />
            </div>
          )}

          {showBcc && (
            <div className="space-y-2">
              <Label>Bcc</Label>
              <div className="mb-1 flex flex-wrap gap-1">
                {emailForm.bcc.map((email) => (
                  <Badge key={email} variant="secondary" className="text-xs">
                    {email}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0"
                      onClick={() => removeRecipient(email, "bcc")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Add BCC..."
                value={bccInput}
                onChange={(e) => setBccInput(e.target.value)}
                onKeyDown={(e) =>
                  handleKeyPress(e, "bcc", bccInput, setBccInput)
                }
                onBlur={() => {
                  if (bccInput.trim()) {
                    addRecipient(bccInput.trim(), "bcc");
                    setBccInput("");
                  }
                }}
              />
            </div>
          )}

          {!isReply && (
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
          )}

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
