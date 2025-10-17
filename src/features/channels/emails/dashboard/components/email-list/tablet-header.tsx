"use client";

import { Button } from "@/components/ui/button";
import { SelectAllCheckbox } from "./select-all-checkbox";
import { SelectModeButton } from "./select-mode-button";
import { useEmailListLogic } from "@/emails/dashboard/hooks/ui";

export const TabletHeader = () => {
  const {
    isSelectionMode,
    selectedEmails,
    isAllSelected,
    isPartiallySelected,
    onSelectAllEmails,
    onEnterSelectionMode,
  } = useEmailListLogic();

  return (
    <div className="flex items-center justify-between border-b border-border/50 bg-gradient-to-r from-muted/20 via-muted/10 to-transparent p-4">
      <div className="flex items-center gap-2">
        <SelectAllCheckbox
          show={isSelectionMode || selectedEmails.size > 0}
          checked={isAllSelected}
          indeterminate={isPartiallySelected}
          onCheckedChange={() => onSelectAllEmails(Array.from(selectedEmails))}
        />

        <Button
          variant="outline"
          size="sm"
          className="bg-muted/30 hover:bg-muted/50"
        >
          All mail
        </Button>
        <Button variant="default" size="sm">
          Unread
        </Button>
      </div>

      <SelectModeButton
        show={!isSelectionMode}
        onEnterSelectionMode={onEnterSelectionMode}
      />
    </div>
  );
};
