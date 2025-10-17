import { useEmailStore } from "@/emails/dashboard/stores";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useEmails } from "../data";
import { folders } from "@/emails/dashboard/data";

export const useEmailListLogic = () => {
  const storeData = useEmailStore(
    useShallow((state) => ({
      activeFolder: state.activeFolder,
      selectedEmails: state.selectedEmails,
      isSelectionMode: state.isSelectionMode,
      selectedEmailId: state.selectedEmailId,
      searchQuery: state.searchQuery,
      onSearchChange: state.setSearchQuery,
      onEmailSelect: state.handleEmailSelect,
      onToggleEmailSelection: state.toggleEmailSelection,
      onSelectAllEmails: state.selectAllEmails,
      onEnterSelectionMode: state.enterSelectionMode,
      getSelectedEmailsArray: state.getSelectedEmailsArray,
      getIsAllSelected: state.getIsAllSelected,
      getIsPartiallySelected: state.getIsPartiallySelected,
      getFilteredEmails: state.getFilteredEmails,
      setSearchQuery: state.setSearchQuery,
      handleFolderChange: state.handleFolderChange,
    })),
  );

  const { data: emails = [] } = useEmails();

  const filteredEmails = useMemo(() => {
    return storeData.getFilteredEmails(emails, storeData.searchQuery);
  }, [emails, storeData]);

  const selectedEmail = useMemo(() => {
    return (
      emails.find((email) => email.id === storeData.selectedEmailId) || null
    );
  }, [emails, storeData.selectedEmailId]);

  const selectedEmailObjects = useMemo(() => {
    return storeData.getSelectedEmailsArray(emails);
  }, [emails, storeData]);

  const currentFolder = useMemo(
    () => folders.find((f) => f.id === storeData.activeFolder),
    [storeData.activeFolder],
  );

  const isAllSelected = useMemo(() => {
    return storeData.getIsAllSelected(emails.length);
  }, [emails.length, storeData]);

  const isPartiallySelected = useMemo(() => {
    return storeData.getIsPartiallySelected(emails.length);
  }, [emails.length, storeData]);

  return {
    ...storeData,
    emails,
    filteredEmails,
    selectedEmail,
    selectedEmailObjects,
    currentFolder,
    isAllSelected,
    isPartiallySelected,
  };
};
