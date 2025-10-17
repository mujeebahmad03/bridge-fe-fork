"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { NoteForm, noteSchema } from "./notes/note-form";
import { NoteCard } from "./notes/note-card";
import { NotesSearch } from "./notes/notes-search";
import { NotesEmptyState } from "./notes/notes-empty-state";
import type * as z from "zod";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: { name: string; avatar: string };
}

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Meeting Notes - Q1 Planning",
    content:
      "Discussed Q1 objectives and key milestones. Need to focus on customer acquisition and product development. Action items: 1) Finalize marketing budget 2) Schedule product roadmap review 3) Set up weekly check-ins with team leads.",
    createdAt: "2025-01-15T14:30:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
    author: { name: "Sam Queen", avatar: "SQ" },
  },
  {
    id: "2",
    title: "Client Feedback Summary",
    content:
      "Compiled feedback from recent client interviews. Overall satisfaction is high, but there are requests for better reporting features and mobile app improvements. Priority items: enhanced dashboard, mobile optimization, and automated reporting.",
    createdAt: "2025-01-12T10:15:00Z",
    updatedAt: "2025-01-14T16:20:00Z",
    author: { name: "Alex Johnson", avatar: "AJ" },
  },
  {
    id: "3",
    title: "Competitive Analysis",
    content:
      "Analyzed top 3 competitors in our market segment. Key findings: 1) Competitor A has better pricing strategy 2) Competitor B excels in customer support 3) Competitor C has superior mobile experience. Recommendations: review pricing model, enhance support team training, prioritize mobile development.",
    createdAt: "2025-01-10T09:00:00Z",
    updatedAt: "2025-01-10T09:00:00Z",
    author: { name: "Maria Garcia", avatar: "MG" },
  },
];

export function NotesInterface() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const form = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateNote = (values: z.infer<typeof noteSchema>) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: values.title,
      content: values.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: { name: "Sam Queen", avatar: "SQ" }, // Current user
    };

    setNotes([newNote, ...notes]);
    setIsCreateDialogOpen(false);
    form.reset();
    toast.success("Note created successfully");
  };

  const handleEditNote = (values: z.infer<typeof noteSchema>) => {
    if (!editingNote) return;

    const updatedNote: Note = {
      ...editingNote,
      title: values.title,
      content: values.content,
      updatedAt: new Date().toISOString(),
    };

    setNotes(
      notes.map((note) => (note.id === editingNote.id ? updatedNote : note)),
    );
    setEditingNote(null);
    form.reset();
    toast.success("Note updated successfully");
  };

  const openEditDialog = (note: Note) => {
    setEditingNote(note);
    form.reset({
      title: note.title,
      content: note.content,
    });
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    toast.success("Note deleted successfully");
  };

  const handleCancelForm = () => {
    setIsCreateDialogOpen(false);
    setEditingNote(null);
    form.reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Notes</h2>
          <p className="text-sm text-muted-foreground">
            {filteredNotes.length}{" "}
            {filteredNotes.length === 1 ? "note" : "notes"}
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
            </DialogHeader>
            <NoteForm
              form={form}
              onSubmit={handleCreateNote}
              onCancel={handleCancelForm}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <NotesSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Notes Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={openEditDialog}
            onDelete={deleteNote}
          />
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <NotesEmptyState hasSearchQuery={!!searchQuery} />
      )}

      {/* Edit Note Dialog */}
      <Dialog
        open={!!editingNote}
        onOpenChange={(open) => !open && setEditingNote(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <NoteForm
            form={form}
            onSubmit={handleEditNote}
            onCancel={handleCancelForm}
            isEdit
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
