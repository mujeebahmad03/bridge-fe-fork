"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Conversation } from "@/linkedin/dashboard/types";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export const ConversationItem = memo<ConversationItemProps>(
  ({ conversation, isSelected, onClick }) => {
    return (
      <Card
        onClick={onClick}
        className={cn(
          "cursor-pointer rounded-none border-b border-border p-4 transition-colors hover:bg-muted/50",
          isSelected && "bg-muted",
        )}
      >
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={conversation.avatar || "/placeholder.svg"}
                alt={conversation.name}
              />
              <AvatarFallback>{conversation.name?.[0]}</AvatarFallback>
            </Avatar>
            {conversation.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="truncate text-sm font-semibold text-foreground">
                {conversation.name}
              </h3>
              <span className="text-xs text-muted-foreground">
                {conversation.timestamp}
              </span>
            </div>

            <p className="mb-1 truncate text-xs text-muted-foreground">
              {conversation.role}
            </p>

            <div className="flex items-center gap-2">
              <p
                className={cn(
                  "flex-1 truncate text-sm",
                  conversation.unread
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {conversation.isTyping ? (
                  <span className="italic text-primary">typing...</span>
                ) : (
                  conversation.lastMessage
                )}
              </p>

              {conversation.unread && (
                <Badge
                  className="h-2 w-2 rounded-full bg-primary p-1"
                  variant="default"
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  },
);

ConversationItem.displayName = "ConversationItem";
