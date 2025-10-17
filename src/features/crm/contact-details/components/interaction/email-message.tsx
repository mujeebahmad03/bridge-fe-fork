"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Reply,
  ReplyAll,
  Forward,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmailComposer } from "./email-composer";
import { EmailData } from "./email-interface";

interface EmailMessageProps {
  email: {
    id: string;
    from: string;
    fromName: string;
    to: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
    body: string;
    timestamp: string;
    isRead: boolean;
    hasAttachments?: boolean;
  };
  isExpanded: boolean;
  onToggle: () => void;
  onReply: () => void;
  onReplyAll: () => void;
  onForward: () => void;
  replyingToMessage: {
    threadId: string;
    emailId: string;
    isReplyAll: boolean;
  } | null;
  onSendReply: (data: EmailData) => void;
  onCancelReply: () => void;
  threadSubject: string;
}

export function EmailMessage({
  email,
  isExpanded,
  onToggle,
  onReply,
  onReplyAll,
  onForward,
  replyingToMessage,
  onSendReply,
  onCancelReply,
  threadSubject,
}: EmailMessageProps) {
  const [showDetails, setShowDetails] = useState(false);

  const isReplying = replyingToMessage?.emailId === email.id;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div
      className={`border-b border-border last:border-b-0 ${!email.isRead ? "bg-muted/30" : ""}`}
    >
      {/* Email Header */}
      <div
        className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-muted/50"
        onClick={onToggle}
      >
        <div className="flex min-w-0 flex-1 items-center space-x-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage
              src={`/abstract-geometric-shapes.png?height=32&width=32&query=${email.fromName}`}
            />
            <AvatarFallback className="text-xs">
              {getInitials(email.fromName)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <span
                className={`truncate text-sm ${!email.isRead ? "font-semibold" : "font-medium"}`}
              >
                {email.fromName}
              </span>
              {!email.isRead && (
                <Badge variant="secondary" className="px-1.5 py-0.5 text-xs">
                  New
                </Badge>
              )}
            </div>
            <div className="mt-1 flex items-center space-x-2">
              <span className="truncate text-xs text-muted-foreground">
                {isExpanded
                  ? email.subject
                  : `${email.subject} - ${email.body.substring(0, 50)}...`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(email.timestamp)}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Expanded Email Content */}
      {isExpanded && (
        <div className="px-4 pb-4">
          {/* Email Details */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{email.fromName}</span>
                <span className="text-xs text-muted-foreground">
                  &lt;{email.from}&gt;
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-muted-foreground"
              >
                {showDetails ? "Hide details" : "Show details"}
              </Button>
            </div>

            {showDetails && (
              <div className="space-y-1 rounded-md bg-muted/30 p-3 text-xs text-muted-foreground">
                <div>
                  <strong>From:</strong> {email.fromName} &lt;{email.from}&gt;
                </div>
                <div>
                  <strong>To:</strong> {email.to.join(", ")}
                </div>
                {email.cc && email.cc.length > 0 && (
                  <div>
                    <strong>Cc:</strong> {email.cc.join(", ")}
                  </div>
                )}
                {email.bcc && email.bcc.length > 0 && (
                  <div>
                    <strong>Bcc:</strong> {email.bcc.join(", ")}
                  </div>
                )}
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(email.timestamp).toLocaleString()}
                </div>
                <div>
                  <strong>Subject:</strong> {email.subject}
                </div>
              </div>
            )}
          </div>

          {/* Email Body */}
          <div className="prose prose-sm mb-4 max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {email.body}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 border-t border-border pt-2">
            <Button variant="ghost" size="sm" onClick={onReply}>
              <Reply className="mr-2 h-4 w-4" />
              Reply
            </Button>
            <Button variant="ghost" size="sm" onClick={onReplyAll}>
              <ReplyAll className="mr-2 h-4 w-4" />
              Reply All
            </Button>
            <Button variant="ghost" size="sm" onClick={onForward}>
              <Forward className="mr-2 h-4 w-4" />
              Forward
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                <DropdownMenuItem>Add to tasks</DropdownMenuItem>
                <DropdownMenuItem>Print</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isReplying && (
            <div className="mt-4 border-t border-border pt-4">
              <EmailComposer
                isReply={true}
                replyToAll={replyingToMessage.isReplyAll}
                existingSubject={threadSubject}
                // originalEmail={email}
                onSend={onSendReply}
                onCancel={onCancelReply}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
