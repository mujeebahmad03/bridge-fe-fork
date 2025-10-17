"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, X, Paperclip, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkedInComposerProps {
  recipient?: {
    name: string;
    title: string;
    company: string;
    avatar: string;
    isConnection: boolean;
  };
  onSend: (content: string) => void;
  onCancel: () => void;
  placeholder?: string;
  className?: string;
}

export function LinkedInComposer({
  recipient,
  onSend,
  onCancel,
  placeholder = "Write a message...",
  className,
}: LinkedInComposerProps) {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!content.trim()) return;

    setIsSending(true);
    try {
      await onSend(content.trim());
      setContent("");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn("rounded-lg border bg-background shadow-sm", className)}>
      {recipient && (
        <div className="flex items-center gap-3 border-b bg-muted/30 p-4">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={recipient.avatar || "/placeholder.svg"}
              alt={recipient.name}
            />
            <AvatarFallback className="bg-primary text-xs text-primary-foreground">
              {recipient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{recipient.name}</span>
              {recipient.isConnection && (
                <Badge variant="secondary" className="px-1.5 py-0.5 text-xs">
                  1st
                </Badge>
              )}
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {recipient.title} at {recipient.company}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="p-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-[100px] resize-none border-0 p-0 text-sm focus-visible:ring-0"
        />
      </div>

      <div className="flex items-center justify-between border-t bg-muted/30 p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!content.trim() || isSending}
          >
            <Send className="mr-2 h-4 w-4" />
            {isSending ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>

      <div className="px-4 pb-2">
        <p className="text-xs text-muted-foreground">Press Cmd+Enter to send</p>
      </div>
    </div>
  );
}
