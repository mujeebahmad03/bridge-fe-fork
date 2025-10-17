import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { mockEmails } from "@/emails/dashboard/data";
import { useEmailStore } from "@/emails/dashboard/stores";
import type { Email } from "@/emails/dashboard/types";

// Mock API functions - replace these with real API calls
const emailApi = {
  getEmails: async (folderId: string): Promise<Email[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockEmails.filter((email) => email.folder === folderId);
  },

  getEmailById: async (emailId: string): Promise<Email | null> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockEmails.find((email) => email.id === emailId) || null;
  },

  // Single email actions
  archiveEmail: async (emailId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    console.log("Archive email:", emailId);
  },

  deleteEmail: async (emailId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    console.log("Delete email:", emailId);
  },

  markAsRead: async (emailId: string, isRead: boolean): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    console.log("Mark as read:", emailId, isRead);
  },

  starEmail: async (emailId: string, isStarred: boolean): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    console.log("Star email:", emailId, isStarred);
  },

  // Bulk actions
  bulkArchive: async (emailIds: string[]): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log("Bulk archive:", emailIds);
  },

  bulkDelete: async (emailIds: string[]): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log("Bulk delete:", emailIds);
  },

  bulkMarkAsRead: async (
    emailIds: string[],
    isRead: boolean,
  ): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log("Bulk mark as read:", emailIds, isRead);
  },

  bulkStar: async (emailIds: string[], isStarred: boolean): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log("Bulk star:", emailIds, isStarred);
  },

  bulkMoveToFolder: async (
    emailIds: string[],
    folderId: string,
  ): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log("Bulk move to folder:", emailIds, folderId);
  },

  bulkAddLabel: async (emailIds: string[], label: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log("Bulk add label:", emailIds, label);
  },

  // Email composition actions
  sendReply: async (emailId: string, content: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Reply to:", emailId, content);
  },

  sendReplyAll: async (emailId: string, content: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Reply all to:", emailId, content);
  },

  sendForward: async (
    emailId: string,
    content: string,
    recipients: string[],
  ): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Forward:", emailId, content, recipients);
  },

  composeEmail: async (email: {
    to: string;
    subject: string;
    content: string;
  }): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Compose new email:", email);
  },
};

// Query keys
export const emailKeys = {
  all: ["emails"] as const,
  folder: (folderId: string) => [...emailKeys.all, "folder", folderId] as const,
  email: (emailId: string) => [...emailKeys.all, "email", emailId] as const,
};

// Queries
export function useEmails() {
  const activeFolder = useEmailStore((state) => state.activeFolder);

  return useQuery({
    queryKey: emailKeys.folder(activeFolder),
    queryFn: () => emailApi.getEmails(activeFolder),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useEmail(emailId: string | null) {
  return useQuery({
    queryKey: emailKeys.email(emailId!),
    queryFn: () => emailApi.getEmailById(emailId!),
    enabled: !!emailId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Single email mutations
export function useArchiveEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emailApi.archiveEmail,
    onSuccess: () => {
      // Invalidate all email queries to refetch
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}

export function useDeleteEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emailApi.deleteEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ emailId, isRead }: { emailId: string; isRead: boolean }) =>
      emailApi.markAsRead(emailId, isRead),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}

export function useStarEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      emailId,
      isStarred,
    }: {
      emailId: string;
      isStarred: boolean;
    }) => emailApi.starEmail(emailId, isStarred),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}

// Bulk mutations
export function useBulkArchive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emailApi.bulkArchive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}

export function useBulkDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emailApi.bulkDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}

export function useBulkMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      emailIds,
      isRead,
    }: {
      emailIds: string[];
      isRead: boolean;
    }) => emailApi.bulkMarkAsRead(emailIds, isRead),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}

export function useBulkStar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      emailIds,
      isStarred,
    }: {
      emailIds: string[];
      isStarred: boolean;
    }) => emailApi.bulkStar(emailIds, isStarred),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}

export function useBulkMoveToFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      emailIds,
      folderId,
    }: {
      emailIds: string[];
      folderId: string;
    }) => emailApi.bulkMoveToFolder(emailIds, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}

export function useBulkAddLabel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ emailIds, label }: { emailIds: string[]; label: string }) =>
      emailApi.bulkAddLabel(emailIds, label),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}

// Email composition mutations
export function useSendReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ emailId, content }: { emailId: string; content: string }) =>
      emailApi.sendReply(emailId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}

export function useSendReplyAll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ emailId, content }: { emailId: string; content: string }) =>
      emailApi.sendReplyAll(emailId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}

export function useSendForward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      emailId,
      content,
      recipients,
    }: {
      emailId: string;
      content: string;
      recipients: string[];
    }) => emailApi.sendForward(emailId, content, recipients),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}

export function useComposeEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emailApi.composeEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
  });
}
