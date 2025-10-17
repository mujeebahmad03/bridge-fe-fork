"use client";

import { motion } from "framer-motion";
import { User, Bot, CheckCircle, Mail, Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import type { ChatMessage as ChatMessageType } from "@/dashboard/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  const getMessageIcon = () => {
    switch (message.type) {
      case "lead_added":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "message_drafted":
        return <Mail className="h-4 w-4 text-blue-500" />;
      case "task_summary":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <Bot className="h-4 w-4 text-primary" />;
    }
  };

  const getMessageBadge = () => {
    switch (message.type) {
      case "lead_added":
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-xs text-green-700"
          >
            Lead Added
          </Badge>
        );
      case "message_drafted":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-xs text-blue-700"
          >
            Message Drafted
          </Badge>
        );
      case "task_summary":
        return (
          <Badge
            variant="secondary"
            className="bg-purple-100 text-xs text-purple-500"
          >
            Task Summary
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
          {getMessageIcon()}
        </div>
      )}

      <div className={`max-w-[80%] ${isUser ? "order-first" : ""}`}>
        <div className="mb-1 flex items-center gap-2">
          {!isUser && getMessageBadge()}
          <span className="text-xs text-muted-foreground">
            {message.timestamp?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? "ml-auto bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
        </div>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
    </motion.div>
  );
}
