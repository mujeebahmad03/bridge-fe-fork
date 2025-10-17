"use client";

import { useState } from "react";

import { useMessaging } from "@/linkedin/dashboard/hooks/client";
import {
  ConversationErrorBoundary,
  ErrorBoundary,
  MessageErrorBoundary,
} from "@/linkedin/dashboard/components/error-boundary";
import { ConversationSidebar } from "@/linkedin/dashboard/components/conversations";
import { ChatArea } from "@/linkedin/dashboard/components/chats";
import { ProfilePreview } from "@/linkedin/dashboard/components/profile-preview";

import { cn } from "@/lib/utils";

export default function LinkedInChatInterface() {
  const [showMobileChat, setShowMobileChat] = useState(false);
  const { selectedConversation, error } = useMessaging();

  const handleBackToList = () => {
    setShowMobileChat(false);
  };

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            Something went wrong
          </h2>
          <p className="text-muted-foreground">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-screen bg-background">
        {/* Left Sidebar - Conversations */}

        <div className="flex h-full">
          <ConversationErrorBoundary>
            <ConversationSidebar
              onShowMobileChat={() => setShowMobileChat(true)}
              className={cn(
                "w-full lg:w-80",
                showMobileChat ? "hidden lg:flex" : "flex",
              )}
            />
          </ConversationErrorBoundary>

          {/* Middle Column - Chat */}
          <MessageErrorBoundary>
            <ChatArea
              onBackToList={handleBackToList}
              className={cn(
                "flex-1",
                showMobileChat ? "flex" : "hidden lg:flex",
              )}
            />
          </MessageErrorBoundary>

          {/* Right Column - Profile Preview (Desktop Only) */}
          {selectedConversation && (
            <ErrorBoundary>
              <ProfilePreview
                conversation={selectedConversation}
                className="w-80"
              />
            </ErrorBoundary>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
