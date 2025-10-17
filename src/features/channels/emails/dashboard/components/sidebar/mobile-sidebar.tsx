"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarContent } from "./sidebar-content";

import type { ResponsiveSidebarProps } from "@/emails/dashboard/types";
import { useEmailListLogic } from "@/emails/dashboard/hooks/ui";

interface MobileSidebarProps extends ResponsiveSidebarProps {
  screenSize: "mobile" | "tablet";
}

export function MobileSidebar({
  isOpen = true,
  onClose,
  isCollapsed = false,
  isLoading = false,
  screenSize,
}: MobileSidebarProps) {
  const { activeFolder, handleFolderChange } = useEmailListLogic();

  const handleFolderSelect = (folderId: string) => {
    handleFolderChange(folderId);
    if (onClose) onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className={screenSize === "mobile" ? "w-80 p-0" : "w-72 p-0"}
      >
        {screenSize === "tablet" && (
          <SheetHeader className="border-b border-border p-6">
            <SheetTitle className="text-lg font-semibold text-foreground">
              Folders
            </SheetTitle>
            <SheetDescription className="sr-only">
              Switch between folders to view emails
            </SheetDescription>
          </SheetHeader>
        )}
        <SidebarContent
          activeFolder={activeFolder}
          isCollapsed={isCollapsed}
          isLoading={isLoading}
          isMobileOrTablet={true}
          onFolderSelect={handleFolderSelect}
        />
      </SheetContent>
    </Sheet>
  );
}
