"use client";

import { motion } from "framer-motion";

import { SidebarContent } from "./sidebar-content";

import type { ResponsiveSidebarProps } from "@/emails/dashboard/types";
import { useEmailListLogic } from "@/emails/dashboard/hooks/ui";

export function DesktopSidebar({
  isCollapsed = false,
  isLoading = false,
}: ResponsiveSidebarProps) {
  const { activeFolder, handleFolderChange } = useEmailListLogic();

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? "auto" : "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="border-r border-border"
    >
      <SidebarContent
        activeFolder={activeFolder}
        isCollapsed={isCollapsed}
        isLoading={isLoading}
        isMobileOrTablet={false}
        onFolderSelect={handleFolderChange}
      />
    </motion.div>
  );
}
