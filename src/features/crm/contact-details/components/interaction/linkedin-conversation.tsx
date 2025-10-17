"use client";

import { useState } from "react";
import { LinkedInMessage } from "./linkedin-message";
import { LinkedInComposer } from "./linkedin-composer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, MessageCircle } from "lucide-react";

interface LinkedInConversation {
  id: string;
  participant: {
    name: string;
    title: string;
    company: string;
    avatar: string;
    isConnection: boolean;
  };
  messages: {
    id: string;
    sender: {
      name: string;
      title: string;
      company: string;
      avatar: string;
      isConnection: boolean;
    };
    content: string;
    timestamp: string;
    isRead: boolean;
    isOwn: boolean;
  }[];
  lastActivity: string;
  unreadCount: number;
}

interface LinkedInConversationProps {
  conversation: LinkedInConversation;
  isExpanded: boolean;
  onToggle: () => void;
  onSendMessage: (conversationId: string, content: string) => void;
  onReply: (messageId: string) => void;
  onForward: (messageId: string) => void;
  onDelete: (messageId: string) => void;
}

export function LinkedInConversation({
  conversation,
  isExpanded,
  onToggle,
  onSendMessage,
  onReply,
  onForward,
  onDelete,
}: LinkedInConversationProps) {
  const [showComposer, setShowComposer] = useState(false);

  const handleSendMessage = (content: string) => {
    onSendMessage(conversation.id, content);
    setShowComposer(false);
  };

  const lastMessage = conversation.messages[conversation.messages.length - 1];

  return (
    <div className="rounded-lg border bg-background shadow-sm">
      {/* Conversation Header */}
      <div
        className="flex cursor-pointer items-center gap-3 p-4 transition-colors hover:bg-muted/30"
        onClick={onToggle}
      >
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>

        <Avatar className="h-10 w-10">
          <AvatarImage
            src={conversation.participant.avatar || "/placeholder.svg"}
            alt={conversation.participant.name}
          />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {conversation.participant.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-sm font-medium">
              {conversation.participant.name}
            </span>
            {conversation.participant.isConnection && (
              <Badge variant="secondary" className="px-1.5 py-0.5 text-xs">
                1st
              </Badge>
            )}
            {conversation.unreadCount > 0 && (
              <Badge variant="destructive" className="px-1.5 py-0.5 text-xs">
                {conversation.unreadCount}
              </Badge>
            )}
          </div>
          <p className="mb-1 truncate text-xs text-muted-foreground">
            {conversation.participant.title} at{" "}
            {conversation.participant.company}
          </p>
          {lastMessage && (
            <p className="truncate text-xs text-muted-foreground">
              {lastMessage.isOwn ? "You: " : ""}
              {lastMessage.content}
            </p>
          )}
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground">
            {conversation.lastActivity}
          </p>
          <div className="mt-1 flex items-center gap-1">
            <MessageCircle className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {conversation.messages.length}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t">
          {/* Messages */}
          <div className="scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent max-h-96 overflow-y-auto">
            {conversation.messages.map((message) => (
              <LinkedInMessage
                key={message.id}
                message={message}
                onReply={onReply}
                onForward={onForward}
                onDelete={onDelete}
              />
            ))}
          </div>

          {/* Composer */}
          {showComposer ? (
            <div className="border-t p-4">
              <LinkedInComposer
                recipient={conversation.participant}
                onSend={handleSendMessage}
                onCancel={() => setShowComposer(false)}
                placeholder="Write a reply..."
              />
            </div>
          ) : (
            <div className="border-t p-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComposer(true)}
                className="w-full"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Reply to {conversation.participant.name}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
