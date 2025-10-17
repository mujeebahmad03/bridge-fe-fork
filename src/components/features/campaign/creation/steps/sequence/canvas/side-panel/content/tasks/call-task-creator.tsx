"use client";

import { useState } from "react";
import { Phone, MoreHorizontal } from "lucide-react";
import { Button, Label } from "@/components/ui";
import { Assignee } from "@/types/task";
import { Priority } from "@/types/campaign";
import {
  AssigneeSelector,
  PrioritySelector,
  VariableTextarea,
} from "../shared";
import { SkipCall } from "./skip-call";

const mockAssignees: Assignee[] = [
  {
    id: "1",
    name: "Oladimeji Deji",
    initials: "O",
  },
];

export function CallTaskCreator() {
  const [priority, setPriority] = useState<Priority>("none");
  const [selectedAssignee, setSelectedAssignee] = useState<
    Assignee | undefined
  >(mockAssignees[0]);
  const [notes, setNotes] = useState("");

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-background">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-pink-100 p-3 shadow-sm dark:bg-pink-900/30">
            <Phone className="h-6 w-6 text-pink-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Call</h1>
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

        <SkipCall />

        {/* Assign Task */}
        <AssigneeSelector
          value={selectedAssignee}
          onChange={setSelectedAssignee}
          assignees={mockAssignees}
          label="Assign the call task to"
          required
        />

        {/* Notes Section */}
        <VariableTextarea
          value={notes}
          onChange={setNotes}
          placeholder="Give details to the person who will make this call, so as not to forget anything."
          label="Notes"
        />
      </div>
    </div>
  );
}
