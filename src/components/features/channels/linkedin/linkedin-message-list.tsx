"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LinkedInMessage } from "@/types/linkedin-message";
import { format } from "date-fns";

interface LinkedInMessageListProps {
  messages: LinkedInMessage[];
  selectedMessages: string[];
  onSelectionChange: (selected: string[]) => void;
  onMessageClick: (messageId: string) => void;
}

export function LinkedInMessageList({
  messages,
  selectedMessages,
  onSelectionChange,
  onMessageClick,
}: LinkedInMessageListProps) {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      onSelectionChange(messages.map((message) => message.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectMessage = (messageId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedMessages, messageId]);
    } else {
      onSelectionChange(selectedMessages.filter((id) => id !== messageId));
      setSelectAll(false);
    }
  };

  const getStatusBadge = (status: LinkedInMessage["status"]) => {
    const statusConfig = {
      sent: { label: "Sent", variant: "secondary" as const },
      delivered: { label: "Delivered", variant: "default" as const },
      read: { label: "Read", variant: "default" as const },
      replied: { label: "Replied", variant: "default" as const },
      failed: { label: "Failed", variant: "destructive" as const },
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>
    );
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <span className="text-2xl">📭</span>
        </div>
        <h3 className="mb-2 text-lg font-medium">No messages found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Select All */}
      <div className="flex items-center gap-3 border-b px-4 py-2">
        <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
        <span className="text-sm text-muted-foreground">
          {selectedMessages.length > 0
            ? `${selectedMessages.length} selected`
            : "Select all"}
        </span>
      </div>

      {/* Message List */}
      <div className="space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent/50",
              selectedMessages.includes(message.id) &&
                "border-blue-200 bg-accent/30",
            )}
            onClick={() => onMessageClick(message.id)}
          >
            {/* Checkbox */}
            <Checkbox
              checked={selectedMessages.includes(message.id)}
              onCheckedChange={(checked) =>
                handleSelectMessage(message.id, checked as boolean)
              }
              onClick={(e) => e.stopPropagation()}
            />

            {/* Avatar */}
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={message.senderAvatar || "/placeholder.svg"}
                alt={message.senderName}
              />
              <AvatarFallback>
                {message.senderName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Message Content */}
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h4 className="font-medium text-blue-600 transition-colors hover:text-blue-800">
                  {message.senderName}
                </h4>
                {message.hasEmail && (
                  <Badge variant="outline" className="text-xs">
                    📧
                  </Badge>
                )}
              </div>
              <p className="truncate text-sm text-muted-foreground">
                {message.content}
              </p>
            </div>

            {/* Timestamp and Status */}
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs text-muted-foreground">
                {format(message.timestamp, "h:mmaaa")}
              </span>
              {getStatusBadge(message.status)}
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">0</span>
                <span className="text-xs text-muted-foreground">0</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination would go here */}
      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Showing {messages.length} of {messages.length} messages
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>
          <Button variant="outline" size="sm">
            24
          </Button>
        </div>
      </div>
    </div>
  );
}
