"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarSkeleton } from "../skeletons";
import { FolderItem } from "../shared";

import { folders } from "@/emails/dashboard/data";
import type { NavigationSectionProps } from "@/emails/dashboard/types";

export function NavigationSection({
  activeFolder,
  isCollapsed,
  isLoading,
  isMobileOrTablet,
  onFolderSelect,
}: NavigationSectionProps) {
  return (
    <ScrollArea className="flex-1 px-2">
      <div className={`space-y-1 ${isMobileOrTablet ? "py-4" : "py-2"}`}>
        {isLoading ? (
          <SidebarSkeleton isCollapsed={isCollapsed} />
        ) : (
          <TooltipProvider>
            {folders.map((folder, index) => (
              <FolderItem
                key={folder.id}
                folder={folder}
                isActive={folder.id === activeFolder}
                isCollapsed={isCollapsed}
                onClick={onFolderSelect}
                index={index}
                showTooltip={isCollapsed}
              />
            ))}
          </TooltipProvider>
        )}
      </div>
    </ScrollArea>
  );
}
