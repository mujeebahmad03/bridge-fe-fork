"use client";

import type React from "react";
import { Send } from "lucide-react";

import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AudioRecorder } from "./audio-recorder";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTranscript: (text: string) => void;
  placeholder?: string;
  showDisclaimer?: boolean;
}

export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      onTranscript,
      placeholder = "Ask me anything",
      showDisclaimer = true,
    },
    ref,
  ) => {
    return (
      <div className="fixed bottom-8 left-16 right-0 px-8">
        <div className="mx-auto max-w-4xl">
          <form onSubmit={onSubmit} className="relative">
            <Input
              ref={ref}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="h-14 w-full rounded-full border-2 border-primary/20 bg-background pl-6 pr-24 text-foreground placeholder:text-muted-foreground focus-visible:border-primary"
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-2">
              <AudioRecorder onTranscript={onTranscript} />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
          {showDisclaimer && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Bridge can make mistakes. We don&apos;t use your data to train our
              models.
            </p>
          )}
        </div>
      </div>
    );
  },
);

ChatInput.displayName = "ChatInput";
