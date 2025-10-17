"use client";

import { motion } from "framer-motion";

import { HeaderContent } from "./header-content";

import { useEmailListLogic, useScreenSize } from "@/emails/dashboard/hooks/ui";
import { ResponsiveHeaderProps } from "@/emails/dashboard/types";

export function ResponsiveHeader({
  onMenuToggle,
  showSearch = false,
  onSearchToggle,
  showBackButton = false,
  onBack,
  title,
}: ResponsiveHeaderProps) {
  const screenSize = useScreenSize();
  const { currentFolder } = useEmailListLogic();
  const displayTitle = title || currentFolder?.name || "Inbox";

  return (
    <motion.div
      className="flex items-center justify-between border-b border-border/50 bg-card p-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeaderContent
        onMenuToggle={onMenuToggle}
        showSearch={showSearch}
        onSearchToggle={onSearchToggle}
        showBackButton={showBackButton}
        onBack={onBack}
        displayTitle={displayTitle}
        screenSize={screenSize}
      />
    </motion.div>
  );
}
