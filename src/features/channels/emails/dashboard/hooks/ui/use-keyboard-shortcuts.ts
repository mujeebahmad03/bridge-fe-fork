"use client";

import { useEffect, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  useEmails,
  useEmail,
  useArchiveEmail,
  useDeleteEmail,
  useMarkAsRead,
  useStarEmail,
  useSendReply,
  useSendReplyAll,
  useSendForward,
  useComposeEmail,
} from "@/emails/dashboard/hooks/data";
import { useEmailStore } from "@/emails/dashboard/stores";

interface KeyboardShortcutsProps {
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  screenSize?: "mobile" | "tablet" | "desktop";
}

export function useKeyboardShortcuts({
  searchInputRef,
  screenSize = "desktop",
}: KeyboardShortcutsProps) {
  // Get state and actions from email store
  const {
    selectedEmailId,
    searchQuery,
    handleEmailSelect,
    handleFolderChange,
    getFilteredEmails,
  } = useEmailStore(
    useShallow((state) => ({
      selectedEmailId: state.selectedEmailId,
      searchQuery: state.searchQuery,
      handleEmailSelect: state.handleEmailSelect,
      handleFolderChange: state.handleFolderChange,
      getFilteredEmails: state.getFilteredEmails,
    })),
  );

  // Get emails data
  const { data: allEmails = [] } = useEmails();
  const { data: selectedEmail } = useEmail(selectedEmailId);

  // Get filtered emails based on search query
  const emails = getFilteredEmails(allEmails, searchQuery);

  // Get mutations
  const archiveEmail = useArchiveEmail();
  const deleteEmail = useDeleteEmail();
  const markAsRead = useMarkAsRead();
  const starEmail = useStarEmail();
  const sendReply = useSendReply();
  const sendReplyAll = useSendReplyAll();
  const sendForward = useSendForward();
  const composeEmail = useComposeEmail();

  // Action handlers that use mutations
  const handleArchive = useCallback(() => {
    if (selectedEmail) {
      archiveEmail.mutate(selectedEmail.id);
    }
  }, [selectedEmail, archiveEmail]);

  const handleDelete = useCallback(() => {
    if (selectedEmail) {
      deleteEmail.mutate(selectedEmail.id);
    }
  }, [selectedEmail, deleteEmail]);

  const handleMarkAsRead = useCallback(() => {
    if (selectedEmail) {
      markAsRead.mutate({
        emailId: selectedEmail.id,
        isRead: !selectedEmail.isRead,
      });
    }
  }, [selectedEmail, markAsRead]);

  const handleStar = useCallback(() => {
    if (selectedEmail) {
      starEmail.mutate({
        emailId: selectedEmail.id,
        isStarred: !selectedEmail.isStarred,
      });
    }
  }, [selectedEmail, starEmail]);

  const handleReply = useCallback(() => {
    if (selectedEmail) {
      // You might want to open a compose modal here or navigate to compose view
      // For now, we'll just trigger the mutation with empty content
      // In a real app, this would probably open a compose dialog
      console.log("Opening reply for:", selectedEmail.id);
      // sendReply.mutate({ emailId: selectedEmail.id, content: "" });
    }
  }, [selectedEmail]);

  const handleReplyAll = useCallback(() => {
    if (selectedEmail) {
      console.log("Opening reply all for:", selectedEmail.id);
      // sendReplyAll.mutate({ emailId: selectedEmail.id, content: "" });
    }
  }, [selectedEmail]);

  const handleForward = useCallback(() => {
    if (selectedEmail) {
      console.log("Opening forward for:", selectedEmail.id);
      // sendForward.mutate({ emailId: selectedEmail.id, content: "", recipients: [] });
    }
  }, [selectedEmail]);

  const handleCompose = useCallback(() => {
    console.log("Opening compose");
    // This would typically open a compose modal or navigate to compose view
    // composeEmail.mutate({ to: "", subject: "", content: "" });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Disable keyboard shortcuts on mobile, enable on tablet and desktop
      if (screenSize === "mobile") return;

      // Don't trigger shortcuts when typing in input fields
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement)?.contentEditable === "true"
      ) {
        return;
      }

      const currentIndex = selectedEmail
        ? emails.findIndex((email) => email.id === selectedEmail.id)
        : -1;

      switch (event.key.toLowerCase()) {
        case "j": // Next email
          event.preventDefault();
          if (currentIndex < emails.length - 1) {
            handleEmailSelect(emails[currentIndex + 1]);
          }
          break;

        case "k": // Previous email
          event.preventDefault();
          if (currentIndex > 0) {
            handleEmailSelect(emails[currentIndex - 1]);
          }
          break;

        case "r": // Reply
          event.preventDefault();
          if (selectedEmail) {
            handleReply();
          }
          break;

        case "a": // Reply all
          event.preventDefault();
          if (selectedEmail) {
            handleReplyAll();
          }
          break;

        case "f": // Forward
          event.preventDefault();
          if (selectedEmail) {
            handleForward();
          }
          break;

        case "e": // Archive
          event.preventDefault();
          handleArchive();
          break;

        case "#": // Delete
        case "delete":
          event.preventDefault();
          handleDelete();
          break;

        case "u": // Mark as read/unread
          event.preventDefault();
          handleMarkAsRead();
          break;

        case "s": // Star
          event.preventDefault();
          handleStar();
          break;

        case "c": // Compose
          event.preventDefault();
          handleCompose();
          break;

        case "/": // Focus search
          event.preventDefault();
          searchInputRef.current?.focus();
          break;

        case "escape": // Blur search
          event.preventDefault();
          searchInputRef.current?.blur();
          break;

        case "enter": // Open email (when focused on list)
          if (
            selectedEmail &&
            document.activeElement?.closest("[data-email-list]")
          ) {
            event.preventDefault();
            // Email is already selected, just ensure it's visible
          }
          break;

        case "g":
          // Gmail-style "go to" shortcuts (g + i for inbox, etc.)
          // We'll handle this in a separate effect for compound shortcuts
          break;
      }
    },
    [
      emails,
      selectedEmail,
      handleEmailSelect,
      handleReply,
      handleReplyAll,
      handleForward,
      handleArchive,
      handleDelete,
      handleMarkAsRead,
      handleStar,
      handleCompose,
      searchInputRef,
      screenSize,
    ],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Handle compound shortcuts like "gi" (go to inbox)
  useEffect(() => {
    let gPressed = false;
    let timeout: NodeJS.Timeout;

    const handleCompoundShortcuts = (event: KeyboardEvent) => {
      if (screenSize === "mobile") return;

      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement)?.contentEditable === "true"
      ) {
        return;
      }

      if (event.key.toLowerCase() === "g") {
        gPressed = true;
        timeout = setTimeout(() => {
          gPressed = false;
        }, 1000);
        return;
      }

      if (gPressed) {
        switch (event.key.toLowerCase()) {
          case "i": // Go to inbox
            event.preventDefault();
            handleFolderChange("inbox");
            break;
          case "d": // Go to drafts
            event.preventDefault();
            handleFolderChange("drafts");
            break;
          case "s": // Go to sent
            event.preventDefault();
            handleFolderChange("sent");
            break;
          case "t": // Go to trash
            event.preventDefault();
            handleFolderChange("trash");
            break;
          case "o": // Go to outbox
            event.preventDefault();
            handleFolderChange("outbox");
            break;
        }
        gPressed = false;
        clearTimeout(timeout);
      }
    };

    // Handle custom keyboard-goto events (for backward compatibility)
    const handleGotoEvent = (event: CustomEvent) => {
      handleFolderChange(event.detail);
    };

    document.addEventListener("keydown", handleCompoundShortcuts);
    document.addEventListener(
      "keyboard-goto",
      handleGotoEvent as EventListener,
    );

    return () => {
      document.removeEventListener("keydown", handleCompoundShortcuts);
      document.removeEventListener(
        "keyboard-goto",
        handleGotoEvent as EventListener,
      );
      clearTimeout(timeout);
    };
  }, [handleFolderChange, screenSize]);

  // Return useful data and functions that components might need
  return {
    selectedEmail,
    emails,
    isLoading:
      archiveEmail.isPending ||
      deleteEmail.isPending ||
      markAsRead.isPending ||
      starEmail.isPending ||
      sendReply.isPending ||
      sendReplyAll.isPending ||
      sendForward.isPending ||
      composeEmail.isPending,
    // Expose handlers for external use if needed
    handleReply,
    handleReplyAll,
    handleForward,
    handleCompose,
  };
}
