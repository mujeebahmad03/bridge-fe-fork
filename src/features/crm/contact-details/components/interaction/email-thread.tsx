"use client";

import { useState } from "react";
import { EmailMessage } from "./email-message";
import { ChevronDown, ChevronUp } from "lucide-react";
import { EmailData } from "./email-interface";

interface Email {
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
}

interface EmailThreadProps {
  thread: {
    id: string;
    subject: string;
    emails: Email[];
    lastActivity: string;
    participants: string[];
  };
  isExpanded: boolean;
  onToggle: () => void;
  onReply: (threadId: string, emailId: string) => void;
  onReplyAll: (threadId: string, emailId: string) => void;
  onForward: (threadId: string, emailId: string) => void;
  replyingToMessage: {
    threadId: string;
    emailId: string;
    isReplyAll: boolean;
  } | null;
  onSendReply: (data: EmailData) => void;
  onCancelReply: () => void;
}

export function EmailThread({
  thread,
  isExpanded,
  onToggle,
  onReply,
  onReplyAll,
  onForward,
  replyingToMessage,
  onSendReply,
  onCancelReply,
}: EmailThreadProps) {
  const [expandedEmails, setExpandedEmails] = useState<Set<string>>(new Set());

  const toggleEmailExpansion = (emailId: string) => {
    const newExpanded = new Set(expandedEmails);
    if (newExpanded.has(emailId)) {
      newExpanded.delete(emailId);
    } else {
      newExpanded.add(emailId);
    }
    setExpandedEmails(newExpanded);
  };

  const unreadCount = thread.emails.filter((email) => !email.isRead).length;
  const latestEmail = thread.emails[thread.emails.length - 1];

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
    <div className="mb-4 rounded-lg border border-border bg-card">
      {/* Thread Header */}
      <div
        className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-muted/50"
        onClick={onToggle}
      >
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center space-x-2">
            <h3
              className={`truncate text-sm ${unreadCount > 0 ? "font-semibold" : "font-medium"}`}
            >
              {thread.subject}
            </h3>
            {unreadCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>{thread.participants.join(", ")}</span>
            <span>•</span>
            <span>
              {thread.emails.length} message
              {thread.emails.length !== 1 ? "s" : ""}
            </span>
            <span>•</span>
            <span>{formatTimestamp(thread.lastActivity)}</span>
          </div>
          {!isExpanded && (
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {latestEmail.body.substring(0, 100)}...
            </p>
          )}
        </div>

        <div className="flex flex-shrink-0 items-center space-x-2">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Thread Content */}
      {isExpanded && (
        <div className="border-t border-border">
          {thread.emails.map((email) => (
            <EmailMessage
              key={email.id}
              email={email}
              isExpanded={expandedEmails.has(email.id)}
              onToggle={() => toggleEmailExpansion(email.id)}
              onReply={() => onReply(thread.id, email.id)}
              onReplyAll={() => onReplyAll(thread.id, email.id)}
              onForward={() => onForward(thread.id, email.id)}
              replyingToMessage={replyingToMessage}
              onSendReply={onSendReply}
              onCancelReply={onCancelReply}
              threadSubject={thread.subject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
