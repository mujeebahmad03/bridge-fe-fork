import { motion } from "framer-motion";

import { AnimatedCheckbox } from "./checkbox";
import { EmailListContent } from "./email-content";

import { cn } from "@/lib/utils";
import { LAYOUT_CLASSES, TEXT_SIZES } from "@/emails/dashboard/constants";
import { EmailItemProps } from "@/emails/dashboard/types";

export function EmailItem({
  email,
  isSelected = false,
  isBulkSelected = false,
  isSelectionMode = false,
  onClick,
  onBulkSelect,
  index,
  layout = "comfortable",
}: EmailItemProps) {
  const textSizes = TEXT_SIZES[layout];

  const handleClick = () => {
    if (isSelectionMode && onBulkSelect) {
      onBulkSelect(email.id);
    } else {
      onClick(email);
    }
  };

  const containerClasses = cn(
    "group cursor-pointer transition-all duration-200 border-l-2 border-l-transparent",
    LAYOUT_CLASSES[layout],
    {
      "bulk-selected border-l-primary shadow-sm bg-primary/15": isBulkSelected,
      "bg-muted/60 border-l-primary shadow-sm": isSelected,
      "bulk-selection-mode hover:border-l-muted-foreground/20":
        isSelectionMode && !isSelected && !isBulkSelected,
      "hover:bg-muted/30 hover:border-l-muted-foreground/20":
        !isSelectionMode && !isSelected && !isBulkSelected,
      "group-hover:translate-x-[2px]":
        layout === "compact" && !isBulkSelected && !isSelected,
      "group-hover:translate-x-[4px]":
        layout !== "compact" && !isBulkSelected && !isSelected,
    },
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        layout: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
      className={containerClasses}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <AnimatedCheckbox
          isSelectionMode={isSelectionMode}
          isBulkSelected={isBulkSelected}
          onBulkSelect={onBulkSelect}
          emailId={email.id}
        />
        <EmailListContent email={email} textSizes={textSizes} />
      </div>
    </motion.div>
  );
}
