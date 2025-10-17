"use client";

import { useState } from "react";
import { List, MoreHorizontal } from "lucide-react";

import { Button, Label } from "@/components/ui";
import {
  AssigneeSelector,
  PrioritySelector,
  VariableField,
  VariableTextarea,
} from "../shared";

import { Assignee } from "@/types/task";
import { Priority } from "@/types/campaign";

const taskVariables = [
  { id: "firstName", name: "First name", syntax: "{{firstName}}" },
  { id: "lastName", name: "Last name", syntax: "{{lastName}}" },
  { id: "companyName", name: "Company name", syntax: "{{companyName}}" },
  { id: "email", name: "Email", syntax: "{{email}}" },
  { id: "phone", name: "Phone", syntax: "{{phone}}" },
];

const mockAssignees: Assignee[] = [
  {
    id: "1",
    name: "Oladimeji Deji",
    initials: "O",
  },
];

export function ManualTaskCreator() {
  const [priority, setPriority] = useState<Priority>("none");
  const [selectedAssignee, setSelectedAssignee] = useState<
    Assignee | undefined
  >(mockAssignees[0]);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-background">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-pink-100 p-3 shadow-sm dark:bg-pink-900/30">
            <List className="h-6 w-6 text-pink-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Manual task
            </h1>
            <div className="mt-1 text-sm text-muted-foreground">
              Create a task
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="hover:bg-accent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-8">
        {/* Task Priority */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-muted-foreground">
            Task priority
          </Label>
          <div className="w-fit">
            <PrioritySelector value={priority} onChange={setPriority} />
          </div>
        </div>

        {/* Assign Task */}
        <AssigneeSelector
          value={selectedAssignee}
          onChange={setSelectedAssignee}
          assignees={mockAssignees}
          label="Assign the manual task to"
          required
        />

        {/* Title Field */}
        <VariableField
          value={title}
          onChange={setTitle}
          placeholder="What title do you want to give to this task"
          maxLength={100}
          variables={taskVariables}
          label="Title"
          required
          showCharacterCount
          showAddVariablesButton
        />

        {/* Notes Section */}
        <VariableTextarea
          value={notes}
          onChange={setNotes}
          placeholder="Give details to the person who will make this manual task, so as not to forget anything."
          label="Notes"
        />
      </div>
    </div>
  );
}
