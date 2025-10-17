import { MessageList } from "@/linkedin/dashboard/components/messages";
import {
  FileUploadPreview,
  ScrollToBottomButton,
  TypingIndicatorComponent,
} from "@/linkedin/dashboard/components/shared";
import {
  useMessaging,
  useScrollManagement,
} from "@/linkedin/dashboard/hooks/client";

import type { Conversation } from "@/linkedin/dashboard/types";

interface ChatMessagesProps {
  conversation: Conversation;
  isTyping: boolean;
}

export function ChatMessages({ conversation, isTyping }: ChatMessagesProps) {
  const { messageSearchQuery, fileUploads } = useMessaging();
  const {
    messagesEndRef,
    messagesContainerRef,
    showScrollButton,
    handleScrollToBottom,
  } = useScrollManagement(conversation);

  return (
    <div ref={messagesContainerRef} className="relative flex-1 overflow-y-auto">
      <MessageList
        messages={conversation.messages}
        contactAvatar={conversation.avatar}
        contactName={conversation.name}
        highlightQuery={messageSearchQuery}
      />

      {isTyping && (
        <div className="px-4 pb-2">
          <TypingIndicatorComponent avatar={conversation.avatar} />
        </div>
      )}

      {fileUploads.length > 0 && (
        <div className="px-4 pb-2">
          <FileUploadPreview uploads={fileUploads} />
        </div>
      )}

      <div ref={messagesEndRef} />

      <ScrollToBottomButton
        show={showScrollButton}
        onClick={handleScrollToBottom}
      />
    </div>
  );
}
