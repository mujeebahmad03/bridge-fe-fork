import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Email } from "@/emails/dashboard/types";

interface EmailUIState {
  // Navigation state
  activeFolder: string;
  selectedEmailId: string | null;
  searchQuery: string;

  // Selection state
  selectedEmails: Set<string>;
  isSelectionMode: boolean;

  // Actions
  setActiveFolder: (folderId: string) => void;
  setSelectedEmailId: (emailId: string | null) => void;
  setSearchQuery: (query: string) => void;
  handleEmailSelect: (email: Email) => void;
  handleFolderChange: (folderId: string) => void;

  // Selection actions
  toggleEmailSelection: (emailId: string) => void;
  selectAllEmails: (emailIds: string[]) => void;
  clearSelection: () => void;
  enterSelectionMode: () => void;
  exitSelectionMode: () => void;

  // Computed values helpers
  getSelectedEmailsArray: (emails: Email[]) => Email[];
  getIsAllSelected: (totalEmails: number) => boolean;
  getIsPartiallySelected: (totalEmails: number) => boolean;
  getFilteredEmails: (emails: Email[], searchQuery: string) => Email[];
}

export const useEmailStore = create<EmailUIState>()(
  devtools(
    (set, get) => ({
      // Initial state
      activeFolder: "inbox",
      selectedEmailId: "1",
      searchQuery: "",
      selectedEmails: new Set(),
      isSelectionMode: false,

      // Navigation actions
      setActiveFolder: (folderId) =>
        set(
          () => ({
            activeFolder: folderId,
            selectedEmailId: null,
            searchQuery: "",
            selectedEmails: new Set(),
            isSelectionMode: false,
          }),
          false,
          "setActiveFolder",
        ),

      setSelectedEmailId: (emailId) =>
        set({ selectedEmailId: emailId }, false, "setSelectedEmailId"),

      setSearchQuery: (query) =>
        set({ searchQuery: query }, false, "setSearchQuery"),

      // Enhanced navigation actions
      handleEmailSelect: (email) =>
        set({ selectedEmailId: email.id }, false, "handleEmailSelect"),

      handleFolderChange: (folderId) =>
        set(
          {
            activeFolder: folderId,
            selectedEmailId: null,
            searchQuery: "",
            selectedEmails: new Set(),
            isSelectionMode: false,
          },
          false,
          "handleFolderChange",
        ),

      // Selection actions
      toggleEmailSelection: (emailId) =>
        set(
          (state) => {
            const newSelectedEmails = new Set(state.selectedEmails);

            if (newSelectedEmails.has(emailId)) {
              newSelectedEmails.delete(emailId);
            } else {
              newSelectedEmails.add(emailId);
            }

            const newIsSelectionMode = newSelectedEmails.size > 0;

            return {
              selectedEmails: newSelectedEmails,
              isSelectionMode: newIsSelectionMode,
            };
          },
          false,
          "toggleEmailSelection",
        ),

      selectAllEmails: (emailIds) =>
        set(
          () => {
            const isAllSelected = get().getIsAllSelected(emailIds.length);

            if (isAllSelected) {
              return {
                selectedEmails: new Set(),
                isSelectionMode: false,
              };
            } else {
              return {
                selectedEmails: new Set(emailIds),
                isSelectionMode: true,
              };
            }
          },
          false,
          "selectAllEmails",
        ),

      clearSelection: () =>
        set(
          {
            selectedEmails: new Set(),
            isSelectionMode: false,
          },
          false,
          "clearSelection",
        ),

      enterSelectionMode: () =>
        set({ isSelectionMode: true }, false, "enterSelectionMode"),

      exitSelectionMode: () =>
        set(
          {
            selectedEmails: new Set(),
            isSelectionMode: false,
          },
          false,
          "exitSelectionMode",
        ),

      // Computed helpers
      getSelectedEmailsArray: (emails) => {
        const selectedEmails = get().selectedEmails;
        return emails.filter((email) => selectedEmails.has(email.id));
      },

      getIsAllSelected: (totalEmails) => {
        const selectedCount = get().selectedEmails.size;
        return totalEmails > 0 && selectedCount === totalEmails;
      },

      getIsPartiallySelected: (totalEmails) => {
        const selectedCount = get().selectedEmails.size;
        return selectedCount > 0 && selectedCount < totalEmails;
      },

      // Filter emails based on search query
      getFilteredEmails: (emails, searchQuery) => {
        if (!searchQuery.trim()) return emails;

        const query = searchQuery.toLowerCase();
        return emails.filter(
          (email) =>
            email.sender.toLowerCase().includes(query) ||
            email.subject.toLowerCase().includes(query) ||
            email.content.toLowerCase().includes(query) ||
            email.tags.some((tag) => tag.toLowerCase().includes(query)),
        );
      },
    }),
    {
      name: "email-store",
    },
  ),
);
