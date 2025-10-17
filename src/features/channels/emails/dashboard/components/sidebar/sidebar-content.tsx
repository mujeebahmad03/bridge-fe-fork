"use client";

import { AnimatePresence } from "framer-motion";

import { UserSection } from "./user-section";
import { NavigationSection } from "./navigation-section";

import type { SidebarContentProps } from "@/emails/dashboard/types";
import { cn } from "@/lib/utils";

export function SidebarContent({
  activeFolder,
  isCollapsed,
  isLoading,
  isMobileOrTablet,
  onFolderSelect,
}: SidebarContentProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col border-r border-border bg-gradient-to-b from-card via-card to-muted/10",
        isMobileOrTablet && "mt-6",
      )}
    >
      {/* User Section */}
      <div className="border-b border-border p-4">
        <AnimatePresence mode="wait">
          <UserSection
            isCollapsed={isCollapsed}
            isLoading={isLoading}
            isMobileOrTablet={isMobileOrTablet}
          />
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <NavigationSection
        activeFolder={activeFolder}
        isCollapsed={isCollapsed}
        isLoading={isLoading}
        isMobileOrTablet={isMobileOrTablet}
        onFolderSelect={onFolderSelect}
      />
    </div>
  );
}
