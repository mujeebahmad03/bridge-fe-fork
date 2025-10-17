"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Reply, Forward, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface LinkedInMessage {
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
}

interface LinkedInMessageProps {
  message: LinkedInMessage;
  onReply: (messageId: string) => void;
  onForward: (messageId: string) => void;
  onDelete: (messageId: string) => void;
}

export function LinkedInMessage({
  message,
  onReply,
  onForward,
  onDelete,
}: LinkedInMessageProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={cn(
        "group flex gap-3 p-4 transition-colors hover:bg-muted/30",
        message.isOwn && "flex-row-reverse",
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage
          src={message.sender.avatar || "/placeholder.svg"}
          alt={message.sender.name}
        />
        <AvatarFallback className="bg-primary text-primary-foreground">
          {message.sender.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>

      <div className={cn("min-w-0 flex-1", message.isOwn && "text-right")}>
        <div
          className={cn(
            "mb-1 flex items-center gap-2",
            message.isOwn && "justify-end",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2",
              message.isOwn && "flex-row-reverse",
            )}
          >
            <span className="text-sm font-medium">{message.sender.name}</span>
            {message.sender.isConnection && (
              <Badge variant="secondary" className="px-1.5 py-0.5 text-xs">
                1st
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {message.timestamp}
          </span>
        </div>

        <div
          className={cn(
            "mb-2 text-xs text-muted-foreground",
            message.isOwn && "text-right",
          )}
        >
          {message.sender.title} at {message.sender.company}
        </div>

        <div
          className={cn(
            "max-w-md rounded-lg border bg-background p-3 shadow-sm",
            message.isOwn
              ? "ml-auto bg-primary text-primary-foreground"
              : "mr-auto",
          )}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </p>
        </div>

        {(showActions || message.isOwn) && (
          <div
            className={cn(
              "mt-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100",
              message.isOwn ? "justify-end" : "justify-start",
            )}
          >
            {!message.isOwn && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReply(message.id)}
                className="h-7 px-2 text-xs"
              >
                <Reply className="mr-1 h-3 w-3" />
                Reply
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onForward(message.id)}>
                  <Forward className="mr-2 h-4 w-4" />
                  Forward
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(message.id)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
