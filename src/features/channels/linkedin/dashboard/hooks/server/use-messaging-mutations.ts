import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";

import { messagingApi } from "@/linkedin/dashboard/lib/api";
import { useMessagingStore } from "@/linkedin/dashboard/stores";
import type { FileUpload } from "@/linkedin/dashboard/types";
import { sanitizeText } from "@/linkedin/dashboard/utils";
import {
  validateMessageContent,
  validateFiles,
  validateEmoji,
} from "@/linkedin/dashboard/validations";

export function useSendMessage() {
  const queryClient = useQueryClient();
  const selectedConversationId = useMessagingStore(
    (state) => state.selectedConversationId,
  );

  const mutation = useMutation({
    mutationFn: ({
      conversationId,
      content,
    }: {
      conversationId: string;
      content: string;
    }) => messagingApi.sendMessage(conversationId, content),
    onSuccess: (newMessage, { conversationId }) => {
      // Invalidate and refetch conversations and current conversation
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationId],
      });

      // Simulate contact response
      setTimeout(() => {
        messagingApi.simulateContactResponse(conversationId).then(() => {
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
          queryClient.invalidateQueries({
            queryKey: ["conversation", conversationId],
          });
        });
      }, 1000);
    },
  });

  const sendMessage = useCallback(
    (content: string) => {
      if (selectedConversationId) {
        try {
          // Validate and sanitize content
          const validatedContent = validateMessageContent(content);
          const sanitizedContent = sanitizeText(validatedContent);

          mutation.mutate({
            conversationId: selectedConversationId,
            content: sanitizedContent,
          });
        } catch (error) {
          console.error("Message validation failed:", error);
          toast.error(
            `Invalid message, ${
              error instanceof Error
                ? error.message
                : "Please check your message and try again"
            }`,
          );
        }
      }
    },
    [selectedConversationId, mutation],
  );

  return {
    sendMessage,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

export function useSendFileMessage() {
  const queryClient = useQueryClient();
  const selectedConversationId = useMessagingStore(
    (state) => state.selectedConversationId,
  );
  const { addFileUpload, updateFileUploadProgress, clearFileUploads } =
    useMessagingStore();

  const mutation = useMutation({
    mutationFn: ({
      conversationId,
      files,
      content,
    }: {
      conversationId: string;
      files: File[];
      content?: string;
    }) =>
      messagingApi.sendFileMessage(
        conversationId,
        files,
        content,
        (fileId, progress) => {
          updateFileUploadProgress(fileId, progress);
        },
      ),
    onSuccess: (newMessage, { conversationId }) => {
      // Clear file uploads
      clearFileUploads();

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationId],
      });

      // Simulate contact response
      setTimeout(() => {
        messagingApi.simulateContactResponse(conversationId).then(() => {
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
          queryClient.invalidateQueries({
            queryKey: ["conversation", conversationId],
          });
        });
      }, 1000);
    },
    onError: () => {
      // Clear file uploads on error
      clearFileUploads();
    },
  });

  const sendFileMessage = useCallback(
    (files: File[], content?: string) => {
      if (selectedConversationId) {
        try {
          // Validate files
          const validatedFiles = validateFiles(files);

          // Validate and sanitize optional content
          const sanitizedContent = content
            ? sanitizeText(validateMessageContent(content))
            : undefined;

          // Add files to upload state
          const uploads: FileUpload[] = validatedFiles.map((file) => ({
            file,
            preview: file.type.startsWith("image/")
              ? URL.createObjectURL(file)
              : undefined,
            progress: 0,
            id: `${file.name}-${Date.now()}`,
          }));

          uploads.forEach(addFileUpload);

          mutation.mutate({
            conversationId: selectedConversationId,
            files: validatedFiles,
            content: sanitizedContent,
          });
        } catch (error) {
          console.error("File upload validation failed:", error);
          toast.error(
            `File upload failed, ${
              error instanceof Error
                ? error.message
                : "Please check your files and try again"
            }`,
          );
        }
      }
    },
    [selectedConversationId, mutation, addFileUpload],
  );

  return {
    sendFileMessage,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

export function useAddReaction() {
  const queryClient = useQueryClient();
  const selectedConversationId = useMessagingStore(
    (state) => state.selectedConversationId,
  );

  const mutation = useMutation({
    mutationFn: ({
      conversationId,
      messageId,
      emoji,
    }: {
      conversationId: string;
      messageId: string;
      emoji: string;
    }) => messagingApi.addReaction(conversationId, messageId, emoji),
    onSuccess: (_, { conversationId }) => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationId],
      });
    },
    onError: (error, { conversationId }) => {
      // Handle reaction removal (error thrown when removing)
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationId],
      });
    },
  });

  const addReaction = useCallback(
    (messageId: string, emoji: string) => {
      if (selectedConversationId) {
        try {
          // Validate emoji
          const validatedEmoji = validateEmoji(emoji);

          mutation.mutate({
            conversationId: selectedConversationId,
            messageId,
            emoji: validatedEmoji,
          });
        } catch (error) {
          console.error("Emoji validation failed:", error);
          toast.error(
            `Invalid emoji, ${
              error instanceof Error
                ? error.message
                : "Please select a valid emoji"
            }`,
          );
        }
      }
    },
    [selectedConversationId, mutation],
  );

  return {
    addReaction,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

export function useUpdateTyping() {
  const selectedConversationId = useMessagingStore(
    (state) => state.selectedConversationId,
  );
  const {
    addTypingIndicator,
    removeTypingIndicator,
    clearOldTypingIndicators,
  } = useMessagingStore();

  const mutation = useMutation({
    mutationFn: ({
      conversationId,
      isTyping,
    }: {
      conversationId: string;
      isTyping: boolean;
    }) => messagingApi.updateTypingStatus(conversationId, isTyping),
  });

  const setTyping = useCallback(
    (isTyping: boolean) => {
      if (selectedConversationId) {
        mutation.mutate({
          conversationId: selectedConversationId,
          isTyping,
        });

        // Update local typing indicators
        if (isTyping) {
          addTypingIndicator(selectedConversationId);

          // Auto-clear typing indicator after 3 seconds
          setTimeout(() => {
            clearOldTypingIndicators();
          }, 3000);
        } else {
          removeTypingIndicator(selectedConversationId);
        }
      }
    },
    [
      selectedConversationId,
      mutation,
      addTypingIndicator,
      removeTypingIndicator,
      clearOldTypingIndicators,
    ],
  );

  return {
    setTyping,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
