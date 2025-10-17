import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  TypingIndicator,
  FileUpload,
  Conversation,
} from "@/linkedin/dashboard/types";

interface MessagingState {
  // State
  selectedConversationId: string | null;
  typingIndicators: TypingIndicator[];
  searchQuery: string;
  messageSearchQuery: string;
  fileUploads: FileUpload[];

  // Actions
  setSelectedConversationId: (id: string | null) => void;
  setSelectedConversation: (conversation: Conversation | null) => void;
  addTypingIndicator: (conversationId: string) => void;
  removeTypingIndicator: (conversationId: string) => void;
  clearOldTypingIndicators: () => void;
  setSearchQuery: (query: string) => void;
  setMessageSearchQuery: (query: string) => void;
  addFileUpload: (upload: FileUpload) => void;
  updateFileUploadProgress: (fileId: string, progress: number) => void;
  clearFileUploads: () => void;
  removeFileUpload: (fileId: string) => void;
}

export const useMessagingStore = create<MessagingState>()(
  devtools(
    (set) => ({
      // Initial state
      selectedConversationId: "1",
      typingIndicators: [],
      searchQuery: "",
      messageSearchQuery: "",
      fileUploads: [],

      // Actions
      setSelectedConversationId: (id) =>
        set({ selectedConversationId: id }, false, "setSelectedConversationId"),

      setSelectedConversation: (conversation) =>
        set(
          {
            selectedConversationId: conversation?.id || null,
            messageSearchQuery: "", // Clear message search when switching conversations
          },
          false,
          "setSelectedConversation",
        ),

      addTypingIndicator: (conversationId) =>
        set(
          (state) => {
            const filtered = state.typingIndicators.filter(
              (t) => t.conversationId !== conversationId,
            );
            return {
              typingIndicators: [
                ...filtered,
                {
                  conversationId,
                  isTyping: true,
                  timestamp: Date.now(),
                },
              ],
            };
          },
          false,
          "addTypingIndicator",
        ),

      removeTypingIndicator: (conversationId) =>
        set(
          (state) => ({
            typingIndicators: state.typingIndicators.filter(
              (t) => t.conversationId !== conversationId,
            ),
          }),
          false,
          "removeTypingIndicator",
        ),

      clearOldTypingIndicators: () =>
        set(
          (state) => ({
            typingIndicators: state.typingIndicators.filter(
              (t) => Date.now() - t.timestamp <= 2900,
            ),
          }),
          false,
          "clearOldTypingIndicators",
        ),

      setSearchQuery: (query) =>
        set({ searchQuery: query }, false, "setSearchQuery"),

      setMessageSearchQuery: (query) =>
        set({ messageSearchQuery: query }, false, "setMessageSearchQuery"),

      addFileUpload: (upload) =>
        set(
          (state) => ({
            fileUploads: [...state.fileUploads, upload],
          }),
          false,
          "addFileUpload",
        ),

      updateFileUploadProgress: (fileId, progress) =>
        set(
          (state) => ({
            fileUploads: state.fileUploads.map((upload) =>
              upload.id === fileId ? { ...upload, progress } : upload,
            ),
          }),
          false,
          "updateFileUploadProgress",
        ),

      clearFileUploads: () =>
        set({ fileUploads: [] }, false, "clearFileUploads"),

      removeFileUpload: (fileId) =>
        set(
          (state) => ({
            fileUploads: state.fileUploads.filter(
              (upload) => upload.id !== fileId,
            ),
          }),
          false,
          "removeFileUpload",
        ),
    }),
    {
      name: "messaging-store",
    },
  ),
);
