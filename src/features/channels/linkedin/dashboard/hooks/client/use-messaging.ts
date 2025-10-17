// hooks/use-messaging.ts

import { useMessagingStore } from "@/linkedin/dashboard/stores";
import {
  useAddReaction,
  useConversations,
  useMessageSearch,
  useSelectedConversation,
  useSendFileMessage,
  useSendMessage,
  useUpdateTyping,
} from "../server";
import { useShallow } from "zustand/react/shallow";

export function useMessaging() {
  // Zustand store selectors
  const {
    selectedConversationId,
    typingIndicators,
    searchQuery,
    messageSearchQuery,
    fileUploads,
    setSelectedConversation,
    setSearchQuery,
    setMessageSearchQuery,
  } = useMessagingStore(
    useShallow((state) => ({
      selectedConversationId: state.selectedConversationId,
      typingIndicators: state.typingIndicators,
      searchQuery: state.searchQuery,
      messageSearchQuery: state.messageSearchQuery,
      fileUploads: state.fileUploads,
      setSelectedConversation: state.setSelectedConversation,
      setSearchQuery: state.setSearchQuery,
      setMessageSearchQuery: state.setMessageSearchQuery,
    })),
  );

  // Query hooks
  const {
    data: conversations = [],
    isLoading: conversationsLoading,
    error: conversationsError,
  } = useConversations();

  const { data: selectedConversation, isLoading: conversationLoading } =
    useSelectedConversation();

  const { data: searchResults = [] } = useMessageSearch();

  // Mutation hooks
  const { sendMessage, isPending: isSendingMessage } = useSendMessage();
  const { sendFileMessage, isPending: isSendingFile } = useSendFileMessage();
  const { addReaction } = useAddReaction();
  const { setTyping } = useUpdateTyping();

  return {
    // Data
    conversations,
    selectedConversation,
    searchResults,

    // State
    selectedConversationId,
    typingIndicators,
    searchQuery,
    messageSearchQuery,
    fileUploads,

    // Actions
    setSelectedConversation,
    setSearchQuery,
    setMessageSearchQuery,
    sendMessage,
    sendFileMessage,
    addReaction,
    setTyping,

    // Loading states
    isLoading: conversationsLoading || conversationLoading,
    isSendingMessage,
    isSendingFile,

    // Errors
    error: conversationsError,
  };
}
