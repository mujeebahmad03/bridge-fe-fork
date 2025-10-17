"use client";

import { Check, CheckCheck, Clock, MoreHorizontal } from "lucide-react";
import { useState, useCallback, memo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ReactionPicker } from "./reaction-picker";
import { MessageAttachments } from "./message-attachments";

import { cn } from "@/lib/utils";
import type { Message } from "@/linkedin/dashboard/types";
import { useMessaging } from "@/linkedin/dashboard/hooks/client";

interface MessageBubbleProps {
  message: Message;
  contactAvatar: string;
  contactName: string;
  highlightQuery?: string;
}

export const MessageBubble = memo<MessageBubbleProps>(
  ({ message, contactAvatar, contactName, highlightQuery }) => {
    const [showReactionPicker, setShowReactionPicker] = useState(false);
    const { addReaction } = useMessaging();

    const getStatusIcon = () => {
      switch (message.status) {
        case "sending":
          return (
            <Clock className="h-3 w-3 animate-pulse text-muted-foreground" />
          );
        case "sent":
          return <Check className="h-3 w-3 text-muted-foreground" />;
        case "delivered":
          return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
        case "read":
          return <CheckCheck className="h-3 w-3 text-primary" />;
        default:
          return null;
      }
    };

    const highlightText = useCallback((text: string, query?: string) => {
      if (!query) return text;

      const regex = new RegExp(
        `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi",
      );
      const parts = text.split(regex);

      return parts.map((part, index) =>
        regex.test(part) ? (
          <mark
            key={index}
            className="rounded bg-yellow-200 px-1 dark:bg-yellow-800"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      );
    }, []);

    return (
      <div
        className={cn(
          "flex",
          message.sender === "user" ? "justify-end" : "justify-start",
        )}
      >
        <div className="group flex max-w-xs items-start gap-2 lg:max-w-md">
          {message.sender === "contact" && (
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={contactAvatar || "/placeholder.svg"}
                alt={contactName}
                className="object-cover"
              />
              <AvatarFallback>{contactName?.[0]}</AvatarFallback>
            </Avatar>
          )}

          <div className="relative">
            <div
              onDoubleClick={() => setShowReactionPicker(true)}
              className={cn(
                "relative rounded-lg px-4 py-2 transition-all duration-200",
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80",
              )}
            >
              {message.content && (
                <p className="text-sm leading-relaxed">
                  {highlightText(message.content, highlightQuery)}
                </p>
              )}

              {message.attachments && message.attachments.length > 0 && (
                <MessageAttachments attachments={message.attachments} />
              )}

              {message.isLatest && (
                <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full border-2 border-background bg-primary" />
              )}

              {message.reactions && message.reactions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {message.reactions.map((reaction) => (
                    <Button
                      key={reaction.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => addReaction(message.id, reaction.emoji)}
                      className="h-auto rounded-full border border-border/30 bg-background/10 px-2 py-1 text-xs hover:bg-background/20"
                      title={`${reaction.userName} reacted with ${reaction.emoji}`}
                    >
                      {reaction.emoji}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-1 flex items-center gap-2 px-1">
              <p className="text-xs text-muted-foreground">
                {message.timestamp}
              </p>
              {message.sender === "user" && getStatusIcon()}

              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowReactionPicker(true)}
                className="h-5 w-5 opacity-0 hover:bg-muted group-hover:opacity-100"
                title="Add reaction"
              >
                <MoreHorizontal className="h-3 w-3 text-muted-foreground" />
              </Button>
            </div>

            {showReactionPicker && (
              <ReactionPicker
                onSelectReaction={(emoji) => {
                  addReaction(message.id, emoji);
                  setShowReactionPicker(false);
                }}
                onClose={() => setShowReactionPicker(false)}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);

MessageBubble.displayName = "MessageBubble";
