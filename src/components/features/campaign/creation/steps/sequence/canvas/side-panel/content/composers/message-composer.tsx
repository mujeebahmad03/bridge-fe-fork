"use client";

import { MessageSquare, MoreHorizontal, Linkedin } from "lucide-react";
import { useState } from "react";

import { Button, Label, TooltipProvider } from "@/components/ui";
import { SenderSelector } from "../shared/sender-selector";
import { ManualModeToggle } from "./manual-mode-toggle";
import { VariableTextarea } from "../shared";

interface Sender {
  id: string;
  name: string;
  initials: string;
  hasWarning?: boolean;
}

const mockSenders: Sender[] = [
  {
    id: "1",
    name: "Oladimeji Deji",
    initials: "O",
    hasWarning: false,
  },
];

export function MessageComposer() {
  const [manualMode, setManualMode] = useState(false);
  const [selectedSender, setSelectedSender] = useState<Sender>();
  const [message, setMessage] = useState("");

  return (
    <TooltipProvider>
      <div className="mx-auto min-h-screen max-w-4xl bg-background">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/40 p-3 shadow-sm">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Chat message
              </h1>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Linkedin className="h-4 w-4 text-primary" />
                <span>Send on LinkedIn</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="hover:bg-primary/20">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Manual Mode Toggle */}
        <ManualModeToggle
          manualMode={manualMode}
          setManualMode={setManualMode}
        />

        {/* Sender Selection */}
        <div className="mb-8 space-y-4">
          <Label className="text-sm font-medium text-foreground">
            LinkedIn account used to send message{" "}
            <span className="text-red-500">*</span>
          </Label>
          <SenderSelector
            value={selectedSender}
            onChange={setSelectedSender}
            senders={mockSenders}
          />
        </div>

        {/* Message Section */}
        <VariableTextarea
          label="Message"
          value={message}
          onChange={setMessage}
          placeholder="What message do you want to send?"
          showCharacterCount
        />
      </div>
    </TooltipProvider>
  );
}
