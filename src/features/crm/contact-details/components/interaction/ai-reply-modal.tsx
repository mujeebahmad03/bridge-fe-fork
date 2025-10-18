"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Sparkles, Send } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

interface AiReplyModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
  aiSuggestion?: string;
}

export function AiReplyModal({
  open,
  onClose,
  onSend,
  aiSuggestion,
}: AiReplyModalProps) {
  const [message, setMessage] = useState(aiSuggestion || "");

  if (!open) return null;

  const handleSend = () => {
    onSend(message);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm dark:bg-black/70">
      <Card className="relative w-full max-w-2xl border border-border bg-card shadow-xl transition-all">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Reply with AI
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="px-4 py-4">
          <ReactQuill
            value={message}
            onChange={setMessage}
            placeholder="Write or edit your AI-generated reply..."
            className="rounded-md border border-border [&_.ql-container]:min-h-[200px] [&_.ql-editor]:min-h-[200px] [&_.ql-editor]:p-4 dark:[&_.ql-editor]:bg-muted/20 dark:[&_.ql-editor]:text-foreground"
          />
        </div>

        <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-3 dark:bg-muted/20">
          <p className="text-xs text-muted-foreground">
            This message will be sent as your AI-assisted reply.
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSend} size="sm">
              <Send className="mr-1 h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
