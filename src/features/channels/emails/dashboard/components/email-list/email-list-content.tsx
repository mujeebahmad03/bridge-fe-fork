"use client";

import { motion, AnimatePresence } from "framer-motion";

import { ScrollArea } from "@/components/ui/scroll-area";
import { EmailListSkeleton } from "@/emails/dashboard/components/skeletons";
import { EmailItem } from "@/emails/dashboard/components/shared";
import { useEmailListLogic, useScreenSize } from "@/emails/dashboard/hooks/ui";

interface EmailListContentProps {
  isLoading?: boolean;
}

export const EmailListContent = ({
  isLoading = false,
}: EmailListContentProps) => {
  const screenSize = useScreenSize();

  const {
    emails,
    selectedEmailId,
    selectedEmails,
    isSelectionMode,
    onEmailSelect,
    onToggleEmailSelection,
  } = useEmailListLogic();

  const layout =
    screenSize === "mobile"
      ? "compact"
      : screenSize === "tablet"
        ? "comfortable"
        : "spacious";

  return (
    <ScrollArea className="flex-1">
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          <EmailListSkeleton count={8} layout={layout} />
        ) : emails.length === 0 ? (
          <motion.div
            className="p-8 text-center text-muted-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              No emails found
            </motion.p>
          </motion.div>
        ) : (
          <div className="divide-y divide-border/30">
            {emails.map((email, index) => (
              <EmailItem
                key={email.id}
                email={email}
                isSelected={email.id === selectedEmailId}
                isBulkSelected={selectedEmails.has(email.id)}
                isSelectionMode={isSelectionMode}
                onClick={onEmailSelect}
                onBulkSelect={onToggleEmailSelection}
                index={index}
                layout={layout}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </ScrollArea>
  );
};
