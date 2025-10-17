"use client";

import { Send, Sparkles } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
}: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const quickPrompts = [
    { icon: "✍️", text: "Draft email to", action: "Draft email to " },
    { icon: "➕", text: "Add lead", action: "Add new lead: " },
    { icon: "📆", text: "Today's tasks", action: "What are my tasks today?" },
  ];

  return (
    <div className="space-y-3">
      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {quickPrompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="h-8 border-border bg-background/50 text-xs hover:bg-muted"
            onClick={() => setInput(prompt.action)}
          >
            <span className="mr-1">{prompt.icon}</span>
            {prompt.text}
          </Button>
        ))}
      </div>

      {/* Input Area */}
      <div className="relative">
        <Textarea
          placeholder="Ask me to draft messages, add leads, or get task insights..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="min-h-[60px] resize-none border-border bg-background pr-12 transition-colors focus:border-primary"
          disabled={isLoading}
        />
        <Button
          size="sm"
          onClick={onSubmit}
          disabled={!input.trim() || isLoading}
          className="absolute bottom-2 right-2 h-8 w-8 bg-primary p-0 hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? (
            <Sparkles className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Helper Text */}
      {isFocused && (
        <div className="text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for new line
        </div>
      )}
    </div>
  );
}
