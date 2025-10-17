"use client";

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export function KeyboardHelp() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "?") {
        event.preventDefault();
        setIsOpen(true);
      }
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const shortcuts = [
    {
      category: "Navigation",
      items: [
        { key: "j", description: "Next email" },
        { key: "k", description: "Previous email" },
        { key: "/", description: "Focus search" },
        { key: "Esc", description: "Blur search" },
      ],
    },
    {
      category: "Actions",
      items: [
        { key: "r", description: "Reply" },
        { key: "a", description: "Reply all" },
        { key: "f", description: "Forward" },
        { key: "c", description: "Compose" },
      ],
    },
    {
      category: "Email Management",
      items: [
        { key: "e", description: "Archive" },
        { key: "#", description: "Delete" },
        { key: "u", description: "Mark as read/unread" },
        { key: "s", description: "Star/unstar" },
      ],
    },
    {
      category: "Go To",
      items: [
        { key: "g i", description: "Go to Inbox" },
        { key: "g d", description: "Go to Drafts" },
        { key: "g s", description: "Go to Sent" },
        { key: "g t", description: "Go to Trash" },
      ],
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {shortcuts.map((category) => (
            <div key={category.category}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{item.description}</span>
                    <Badge variant="outline" className="font-mono text-xs">
                      {item.key}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t pt-4 text-center text-sm text-muted-foreground">
          Press{" "}
          <Badge variant="outline" className="font-mono">
            ?
          </Badge>{" "}
          to show/hide this help
        </div>
      </DialogContent>
    </Dialog>
  );
}
