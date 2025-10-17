import { Archive, Trash2, Mail, MailOpen, Star, Inbox } from "lucide-react";
import { useMemo } from "react";

import {
  useBulkArchive,
  useBulkDelete,
  useBulkMarkAsRead,
  useBulkMoveToFolder,
  useBulkStar,
} from "@/emails/dashboard/hooks/data";
import type { ActionItem } from "@/emails/dashboard/types";

export function useFolderActions(activeFolder: string) {
  const bulkArchive = useBulkArchive();
  const bulkDelete = useBulkDelete();
  const bulkMarkAsRead = useBulkMarkAsRead();
  const bulkStar = useBulkStar();
  const moveBulkToFolder = useBulkMoveToFolder();

  return useMemo(() => {
    const commonActions: ActionItem[] = [
      {
        icon: MailOpen,
        label: "Mark as read",
        action: (emailIds: string[]) =>
          bulkMarkAsRead.mutate({ emailIds, isRead: true }),
      },
      {
        icon: Mail,
        label: "Mark as unread",
        action: (emailIds: string[]) =>
          bulkMarkAsRead.mutate({ emailIds, isRead: false }),
      },
      {
        icon: Star,
        label: "Star",
        action: (emailIds: string[]) =>
          bulkStar.mutate({ emailIds, isStarred: true }),
      },
    ];

    const deleteAction: ActionItem = {
      icon: Trash2,
      label: "Delete",
      action: (emailIds: string[]) => bulkDelete.mutate(emailIds),
      variant: "destructive" as const,
    };

    const archiveAction: ActionItem = {
      icon: Archive,
      label: "Archive",
      action: (emailIds: string[]) => bulkArchive.mutate(emailIds),
    };

    const moveToInboxAction: ActionItem = {
      icon: Inbox,
      label: "Move to Inbox",
      action: (emailIds: string[]) =>
        moveBulkToFolder.mutate({ emailIds, folderId: "inbox" }),
    };

    switch (activeFolder) {
      case "inbox":
      case "sent":
        return [archiveAction, ...commonActions, deleteAction];

      case "drafts":
        return [...commonActions, deleteAction];

      case "archive":
        return [moveToInboxAction, ...commonActions, deleteAction];

      case "junk":
        return [{ ...moveToInboxAction, label: "Not Junk" }, deleteAction];

      case "trash":
        return [
          { ...moveToInboxAction, label: "Restore" },
          { ...deleteAction, label: "Delete Forever" },
        ];

      default:
        return [archiveAction, ...commonActions, deleteAction];
    }
  }, [
    activeFolder,
    bulkArchive,
    bulkDelete,
    bulkMarkAsRead,
    bulkStar,
    moveBulkToFolder,
  ]);
}
