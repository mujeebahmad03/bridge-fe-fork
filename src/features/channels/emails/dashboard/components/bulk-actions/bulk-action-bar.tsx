"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useShallow } from "zustand/react/shallow";

import { Separator } from "@/components/ui/separator";
import { FolderMoveDropdown } from "./folder-move";
import { LabelDropdown } from "./label-dropdown";
import { MoreActionsDropdown } from "./more-action";
import { QuickActions } from "./quick-actions";
import { SelectionInfo } from "./selection-info";

import { useEmailStore } from "@/emails/dashboard/stores";
import { useFolderActions } from "@/emails/dashboard/hooks/ui";

export function BulkActionBar() {
  const { activeFolder, selectedEmails } = useEmailStore(
    useShallow((state) => ({
      activeFolder: state.activeFolder,
      selectedEmails: state.selectedEmails,
    })),
  );

  const actions = useFolderActions(activeFolder);
  const selectedCount = selectedEmails.size;

  if (selectedCount === 0) return null;

  const quickActions = actions.slice(0, 4);
  const moreActions = actions.slice(4);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed left-1/2 top-[120px] z-40 -translate-x-1/2 transform rounded-lg border border-border bg-gradient-to-r from-card via-card to-muted/20 px-4 py-3 shadow-lg backdrop-blur-md"
      >
        <div className="flex items-center gap-4">
          <SelectionInfo />

          <Separator orientation="vertical" className="h-6" />

          <QuickActions actions={quickActions} />

          <Separator orientation="vertical" className="h-6" />

          <FolderMoveDropdown />

          <LabelDropdown />

          <MoreActionsDropdown actions={moreActions} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
