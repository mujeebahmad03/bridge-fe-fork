"use client";

import { motion } from "framer-motion";
import { Cloud } from "lucide-react";

import { FilterTabs } from "./filter-tabs";
import { SelectModeButton } from "./select-mode-button";
import { SelectAllCheckbox } from "./select-all-checkbox";
import { useEmailListLogic } from "@/emails/dashboard/hooks/ui";

interface EmailListHeaderProps {
  showSelectButton?: boolean;
}

export const EmailListHeader = ({
  showSelectButton = true,
}: EmailListHeaderProps) => {
  const {
    currentFolder,
    isSelectionMode,
    selectedEmails,
    isAllSelected,
    isPartiallySelected,
    onSelectAllEmails,
    onEnterSelectionMode,
  } = useEmailListLogic();

  const Icon = currentFolder?.icon || Cloud;

  return (
    <motion.div
      className="flex items-center justify-between border-b border-border/50 bg-gradient-to-r from-muted/20 via-muted/10 to-transparent p-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <SelectAllCheckbox
            show={isSelectionMode || selectedEmails.size > 0}
            checked={isAllSelected}
            indeterminate={isPartiallySelected}
            onCheckedChange={() =>
              onSelectAllEmails(Array.from(selectedEmails))
            }
          />

          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="h-4 w-4" />
          </motion.div>
          <motion.h1
            className="text-xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {currentFolder?.name || "Inbox"}
          </motion.h1>
        </div>
        <FilterTabs />
      </div>

      {showSelectButton && (
        <SelectModeButton
          show={!isSelectionMode}
          onEnterSelectionMode={onEnterSelectionMode}
        />
      )}
    </motion.div>
  );
};
