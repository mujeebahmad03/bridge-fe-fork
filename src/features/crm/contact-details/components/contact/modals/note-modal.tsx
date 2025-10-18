"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Contact } from "@/crmContacts/types";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact;
}

export function NoteModal({ isOpen, onClose, contact }: NoteModalProps) {
  const [noteForm, setNoteForm] = useState({
    content: "",
  });

  const handleCreateNote = () => {
    if (!noteForm.content) {
      toast.error("Please enter note content");
      return;
    }

    console.log("Creating note:", noteForm);
    setNoteForm({ content: "" });
    onClose();
    toast.success("Note saved successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Note for {contact.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="note-content">Note</Label>
            {/* <Textarea
              id="note-content"
              placeholder="Enter your note..."
              value={noteForm.content}
              onChange={(e) =>
                setNoteForm({ ...noteForm, content: e.target.value })
              }
              className="min-h-[120px]"
            /> */}
            <ReactQuill
              value={noteForm.content}
              onChange={(value) => setNoteForm({ ...noteForm, content: value })}
              placeholder="Write your message..."
              className="rounded-md border"
              style={{ minHeight: "120px" }}
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
            <Button onClick={handleCreateNote} className="flex-1">
              Save Note
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
