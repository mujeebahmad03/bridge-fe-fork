"use client";

import { useState } from "react";

import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { EmptyStateView } from "./empty-state";
import {
  MessageInput,
  MessageSearchResults,
} from "@/linkedin/dashboard/components/messages";

import { useMessaging } from "@/linkedin/dashboard/hooks/client";
import { cn } from "@/lib/utils";

interface ChatAreaProps {
  onBackToList: () => void;
  className?: string;
}

export function ChatArea({ onBackToList, className = "" }: ChatAreaProps) {
  const {
    messageSearchQuery,
    searchResults,
    selectedConversation,
    setMessageSearchQuery,
    typingIndicators,
    isSendingFile,
    isSendingMessage,
  } = useMessaging();
  const [showMessageSearch, setShowMessageSearch] = useState(false);

  if (!selectedConversation) {
    return <EmptyStateView className={className} />;
  }

  const isTyping = typingIndicators.some(
    (t) => t.conversationId === selectedConversation.id && t.isTyping,
  );

  const handleSearchToggle = () => {
    if (showMessageSearch) {
      setMessageSearchQuery("");
    }
    setShowMessageSearch(!showMessageSearch);
  };

  const handleSearchClose = () => {
    setShowMessageSearch(false);
    setMessageSearchQuery("");
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <ChatHeader
        conversation={selectedConversation}
        isTyping={isTyping}
        showMessageSearch={showMessageSearch}
        onBackToList={onBackToList}
        onSearchToggle={handleSearchToggle}
        onSearchClose={handleSearchClose}
      />

      {showMessageSearch && messageSearchQuery && (
        <MessageSearchResults
          results={searchResults}
          query={messageSearchQuery}
          onClose={handleSearchClose}
        />
      )}

      <ChatMessages conversation={selectedConversation} isTyping={isTyping} />

      <MessageInput disabled={isSendingMessage || isSendingFile} />
    </div>
  );
}
