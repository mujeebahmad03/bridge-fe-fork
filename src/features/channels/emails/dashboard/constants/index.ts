import { Archive, Trash2, Inbox, Send, FileText, ArchiveX } from "lucide-react";
import type { Folder } from "@/emails/dashboard/types";

export const folderOptions: Folder[] = [
  { id: "inbox", name: "Inbox", icon: Inbox },
  { id: "sent", name: "Sent", icon: Send },
  { id: "drafts", name: "Drafts", icon: FileText },
  { id: "archive", name: "Archive", icon: Archive },
  { id: "junk", name: "Junk", icon: ArchiveX },
  { id: "trash", name: "Trash", icon: Trash2 },
];

export const labelOptions = [
  { id: "important", name: "Important", color: "bg-red-500" },
  { id: "work", name: "Work", color: "bg-blue-500" },
  { id: "personal", name: "Personal", color: "bg-green-500" },
  { id: "urgent", name: "Urgent", color: "bg-orange-500" },
  { id: "follow-up", name: "Follow Up", color: "bg-purple-500" },
];

export const LAYOUT_CLASSES = {
  compact: "p-3",
  comfortable: "p-4",
  spacious: "p-6",
};

export const TEXT_SIZES = {
  compact: {
    sender: "text-xs",
    subject: "text-sm",
    preview: "text-xs",
    time: "text-xs",
  },
  comfortable: {
    sender: "text-sm",
    subject: "text-sm",
    preview: "text-xs",
    time: "text-xs",
  },
  spacious: {
    sender: "text-sm",
    subject: "text-base",
    preview: "text-sm",
    time: "text-sm",
  },
};
