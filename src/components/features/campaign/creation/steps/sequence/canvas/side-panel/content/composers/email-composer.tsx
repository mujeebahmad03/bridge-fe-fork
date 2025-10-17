"use client";

import { Mail, MoreHorizontal, FileText } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ManualModeToggle } from "./manual-mode-toggle";
import { AssigneeSelector, VariableField } from "../shared";
import { RichTextEditor } from "@/components/common/editor";
import { Assignee } from "@/types/task";

const emailVariables = [
  { id: "email", name: "Email", syntax: "{{email}}" },
  { id: "firstName", name: "First name", syntax: "{{firstName}}" },
  { id: "lastName", name: "Last name", syntax: "{{lastName}}" },
  { id: "companyName", name: "Company name", syntax: "{{companyName}}" },
];

const mockEmailSenders: Assignee[] = [
  {
    id: "1",
    name: "Oladimeji Deji",
    email: "bamidelex007@gmail.com",
    initials: "O",
  },
];

interface CcFieldProps {
  onRemove: () => void;
  autoFocus?: boolean;
}

function CcField({ onRemove }: CcFieldProps) {
  const [value, setValue] = useState("");

  const handleBlur = () => {
    if (!value.trim()) {
      setTimeout(() => {
        onRemove();
      }, 150);
    }
  };

  return (
    <div onBlur={handleBlur}>
      <VariableField
        value={value}
        onChange={setValue}
        placeholder="Cc"
        variables={emailVariables}
      />
    </div>
  );
}

export function EmailComposer() {
  const [manualMode, setManualMode] = useState(false);
  const [selectedSender, setSelectedSender] = useState<Assignee>();
  const [forceSpecificSender, setForceSpecificSender] = useState(false);
  const [subject, setSubject] = useState("");
  const [ccFields, setCcFields] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const addCcField = () => {
    setCcFields([...ccFields, `cc-${Date.now()}`]);
  };

  const removeCcField = (index: number) => {
    setCcFields(ccFields.filter((_, i) => i !== index));
  };

  return (
    <TooltipProvider>
      <div className="mx-auto min-h-screen max-w-4xl bg-background">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-green-100 p-3 shadow-sm dark:bg-green-900/30">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Email</h1>
              <div className="mt-1 text-sm text-muted-foreground">
                Send automatic email
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-10 px-4 text-sm font-medium transition-colors hover:bg-accent"
            >
              <FileText className="mr-2 h-4 w-4" />
              Templates
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-accent">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Manual Mode Toggle */}
        <ManualModeToggle
          manualMode={manualMode}
          setManualMode={setManualMode}
        />

        {/* Sender Selection */}
        <div className="mb-8">
          <AssigneeSelector
            value={selectedSender}
            onChange={setSelectedSender}
            assignees={mockEmailSenders}
            label="Sender for email steps"
            required
          />

          <div className="flex items-center space-x-3 pt-4">
            <Switch
              id="force-sender"
              checked={forceSpecificSender}
              onCheckedChange={setForceSpecificSender}
              className="data-[state=checked]:bg-primary"
            />
            <Label
              htmlFor="force-sender"
              className="text-sm text-muted-foreground"
            >
              Force a specific sender for this step
            </Label>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <div className="mb-4 flex items-center gap-3">
            <Label className="text-sm font-medium text-foreground">
              Content
            </Label>
            <div className="rounded-full bg-primary p-1.5">
              <Mail className="h-3 w-3 text-primary-foreground" />
            </div>
          </div>

          {/* Subject and CC Fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <VariableField
                  value={subject}
                  onChange={setSubject}
                  placeholder="Subject"
                  variables={emailVariables}
                />
              </div>
              <Button
                variant="ghost"
                onClick={addCcField}
                className="text-primary transition-colors hover:bg-accent"
              >
                Add Cc
              </Button>
            </div>

            {/* CC Fields */}
            {ccFields.map((fieldId, index) => (
              <CcField
                key={fieldId}
                onRemove={() => removeCcField(index)}
                autoFocus={index === ccFields.length - 1}
              />
            ))}
          </div>

          {/* Message Section */}
          <RichTextEditor
            content={message}
            onChange={setMessage}
            placeholder="Write your email content..."
            showMenuBar
            showCharacterCount
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
