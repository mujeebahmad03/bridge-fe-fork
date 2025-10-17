import { ConversationInfo } from "@/linkedin/dashboard/components/conversations";
import { HeaderActions } from "@/linkedin/dashboard/components/shared";
import { MessageSearchInput } from "@/linkedin/dashboard/components/messages";

import type { Conversation } from "@/linkedin/dashboard/types";

interface ChatHeaderProps {
  conversation: Conversation;
  isTyping: boolean;
  showMessageSearch: boolean;
  onBackToList: () => void;
  onSearchToggle: () => void;
  onSearchClose: () => void;
}

export function ChatHeader({
  conversation,
  isTyping,
  showMessageSearch,
  onBackToList,
  onSearchToggle,
  onSearchClose,
}: ChatHeaderProps) {
  return (
    <div className="border-b border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <ConversationInfo
          conversation={conversation}
          isTyping={isTyping}
          onBackToList={onBackToList}
        />
        <HeaderActions
          showMessageSearch={showMessageSearch}
          onSearchToggle={onSearchToggle}
        />
      </div>

      {showMessageSearch && (
        <MessageSearchInput onSearchClose={onSearchClose} />
      )}
    </div>
  );
}
