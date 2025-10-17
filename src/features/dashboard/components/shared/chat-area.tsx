"use client";

import type React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { LoadingDots } from "./loading-dots";

import type { ChatMessage as ChatMessageType } from "@/dashboard/types";

interface ChatAreaProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatArea({
  messages,
  isLoading,
  messagesEndRef,
}: ChatAreaProps) {
  return (
    <ScrollArea className="h-96 w-full rounded-md border border-border bg-muted/20 p-4">
      <div className="space-y-4">
        {messages.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            <div className="space-y-3">
              <p className="text-sm">Try these commands:</p>
              <div className="space-y-2 text-xs">
                <div className="rounded-lg bg-background/50 p-3 text-left">
                  <div className="mb-1 font-medium">✍️ Draft message</div>
                  <div className="text-muted-foreground">
                    &quot;Draft email to John about blackberry campaign&quot;
                  </div>
                </div>
                <div className="rounded-lg bg-background/50 p-3 text-left">
                  <div className="mb-1 font-medium">➕ Add lead</div>
                  <div className="text-muted-foreground">
                    &quot;Add new lead: Sarah Johnson in tech outreach&quot;
                  </div>
                </div>
                <div className="rounded-lg bg-background/50 p-3 text-left">
                  <div className="mb-1 font-medium">📆 Today&apos;s tasks</div>
                  <div className="text-muted-foreground">
                    &quot;What are my tasks today?&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg bg-muted px-3 py-2">
              <LoadingDots />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
