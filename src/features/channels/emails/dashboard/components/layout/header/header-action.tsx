"use client";

import { Search, MoreVertical } from "lucide-react";

import { AnimatedButton } from "@/emails/dashboard/components/shared";
import { UserDropdown } from "./user-dropdown";

interface HeaderActionsProps {
  showSearch: boolean;
  onSearchToggle?: () => void;
  screenSize: string;
}

export function HeaderActions({
  showSearch,
  onSearchToggle,
  screenSize,
}: HeaderActionsProps) {
  const isMobile = screenSize === "mobile";

  return (
    <div className="flex items-center gap-2">
      {!showSearch && onSearchToggle && (
        <AnimatedButton onClick={onSearchToggle}>
          <Search className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
        </AnimatedButton>
      )}

      {!isMobile && !showSearch && (
        <>
          <UserDropdown variant="desktop" />
          <AnimatedButton>
            <MoreVertical className="h-5 w-5" />
          </AnimatedButton>
        </>
      )}

      {isMobile && (
        <AnimatedButton>
          <MoreVertical className="h-4 w-4" />
        </AnimatedButton>
      )}
    </div>
  );
}
