"use client";

import { useEmailListLogic } from "@/emails/dashboard/hooks/ui";
import { FolderTitle } from "./folder-title";
import { HeaderActions } from "./header-action";
import { NavigationButton } from "./navigation-button";
import { SearchBar } from "./search-bar";

interface HeaderContentProps {
  onMenuToggle: () => void;
  showSearch: boolean;
  onSearchToggle?: () => void;
  showBackButton: boolean;
  onBack?: () => void;
  displayTitle: string;
  screenSize: string;
}

export function HeaderContent({
  onMenuToggle,
  showSearch,
  onSearchToggle,
  showBackButton,
  onBack,
  displayTitle,
  screenSize,
}: HeaderContentProps) {
  const { currentFolder } = useEmailListLogic();

  return (
    <>
      <div className="flex items-center gap-4">
        <NavigationButton
          showBackButton={showBackButton}
          onBack={onBack}
          onMenuToggle={onMenuToggle}
          screenSize={screenSize}
        />

        {!showSearch && (
          <FolderTitle displayTitle={displayTitle} screenSize={screenSize} />
        )}

        {showSearch && (
          <SearchBar
            onSearchToggle={onSearchToggle}
            placeholder={`Search in ${currentFolder?.name || "Inbox"}`}
          />
        )}
      </div>

      <HeaderActions
        showSearch={showSearch}
        onSearchToggle={onSearchToggle}
        screenSize={screenSize}
      />
    </>
  );
}
