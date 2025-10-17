"use client";

import { ConversationItem } from "./conversation-item";
import { ConversationSidebarSkeleton } from "./conversation-skeleton";
import { ConversationTabs } from "./conversation-tab";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui";
import { SearchBar } from "../shared";
import { useMessaging } from "@/linkedin/dashboard/hooks/client";

interface Props {
  className?: string;
  onShowMobileChat?: () => void;
}

export function ConversationSidebar({
  className = "",
  onShowMobileChat,
}: Props) {
  const {
    conversations,
    selectedConversation,
    setSelectedConversation,
    isLoading,
  } = useMessaging();

  if (isLoading) {
    return <ConversationSidebarSkeleton className={className} />;
  }

  return (
    <Card className={cn("flex flex-col", className)}>
      {/* Header */}
      <div className="border-b border-border p-4">
        <h1 className="mb-4 text-xl font-semibold text-foreground">
          Messaging
        </h1>

        {/* Tabs */}
        <ConversationTabs />

        {/* Search */}
        <SearchBar placeholder="Search messages" />
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No conversations found
          </div>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedConversation?.id === conversation.id}
              onClick={() => {
                setSelectedConversation(conversation);
                onShowMobileChat?.();
              }}
            />
          ))
        )}
      </div>
    </Card>
  );
}
