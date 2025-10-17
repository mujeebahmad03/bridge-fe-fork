"use client";

import type { Message } from "@/linkedin/dashboard/types";
import { MessageBubble } from "./message-bubble";

interface MessageListProps {
  messages: Message[];
  contactAvatar: string;
  contactName: string;
  highlightQuery?: string;
}

export function MessageList({
  messages,
  contactAvatar,
  contactName,
  highlightQuery,
}: MessageListProps) {
  return (
    <div className="space-y-4 p-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          contactAvatar={contactAvatar}
          contactName={contactName}
          highlightQuery={highlightQuery}
        />
      ))}
    </div>
  );
}
