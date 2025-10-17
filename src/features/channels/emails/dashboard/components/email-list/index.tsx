import { EmailListHeader } from "./email-list-header";
import { TabletHeader } from "./tablet-header";
import { EmailListSearch } from "./email-list-search";
import { EmailListContent } from "./email-list-content";

import { useScreenSize } from "@/emails/dashboard/hooks/ui";

interface ResponsiveEmailListProps {
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
  isLoading?: boolean;
  showHeader?: boolean;
  showSearch?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

export const ResponsiveEmailList = ({
  searchInputRef,
  isLoading = false,
  showHeader = true,
  showSearch = true,
  ref,
}: ResponsiveEmailListProps) => {
  const screenSize = useScreenSize();

  return (
    <div
      ref={ref}
      className="flex h-full flex-col bg-gradient-to-b from-card via-card to-muted/10"
      data-email-list
    >
      {/* Desktop Header */}
      {showHeader && screenSize === "desktop" && <EmailListHeader />}

      {/* Tablet Header */}
      {screenSize === "tablet" && <TabletHeader />}

      {/* Search */}
      {showSearch && screenSize === "desktop" && (
        <EmailListSearch searchInputRef={searchInputRef} />
      )}

      {/* Email List Content */}
      <EmailListContent isLoading={isLoading} />
    </div>
  );
};
