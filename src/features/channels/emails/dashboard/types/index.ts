import type { LucideIcon } from "lucide-react";

export type MobileView = "list" | "content";
export type ScreenSize = "mobile" | "tablet" | "desktop";

export interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  content: string;
  time: string;
  tags: string[];
  isOnline: boolean;
  isStarred: boolean;
  isRead: boolean;
  folder: string;
  replyTo?: string;
}

export interface Folder {
  id: string;
  name: string;
  icon: LucideIcon;
  count?: number;
}

export interface EmailItemProps {
  email: Email;
  isSelected?: boolean;
  isBulkSelected?: boolean;
  isSelectionMode?: boolean;
  onClick: (email: Email) => void;
  onBulkSelect?: (emailId: string) => void;
  index: number;
  layout?: "compact" | "comfortable" | "spacious";
}

export interface FolderItemProps {
  folder: Folder;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: (folderId: string) => void;
  index: number;
  showTooltip?: boolean;
}

export interface ActionButtonProps {
  icon: LucideIcon;
  tooltip: string;
  onClick?: () => void;
  variant?: "ghost" | "outline" | "default";
  size?: "sm" | "default" | "lg";
  className?: string;
  disabled?: boolean;
  animationDelay?: number;
}

export interface AnimatedCheckboxProps {
  isSelectionMode: boolean;
  isBulkSelected: boolean;
  onBulkSelect?: (emailId: string) => void;
  emailId: string;
}

export interface ActionItem {
  icon: LucideIcon;
  label: string;
  action: (emailIds: string[]) => void;
  variant?: "ghost" | "destructive";
}

export interface BulkActionBarProps {
  onBulkArchive: () => void;
  onBulkDelete: () => void;
  onBulkMarkAsRead: () => void;
  onBulkMarkAsUnread: () => void;
  onBulkStar: () => void;
  onBulkMoveToFolder: (folderId: string) => void;
  onBulkAddLabel: (label: string) => void;
}

export interface ResponsiveSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  activeFolder: string;
  isCollapsed?: boolean;
  isLoading?: boolean;
}

export interface UserSectionProps {
  isCollapsed: boolean;
  isLoading: boolean;
  isMobileOrTablet: boolean;
}

export interface NavigationSectionProps {
  activeFolder: string;
  isCollapsed: boolean;
  isLoading: boolean;
  isMobileOrTablet: boolean;
  onFolderSelect: (folderId: string) => void;
}

export interface SidebarContentProps {
  activeFolder: string;
  isCollapsed: boolean;
  isLoading: boolean;
  isMobileOrTablet: boolean;
  onFolderSelect: (folderId: string) => void;
}

export interface ResponsiveHeaderProps {
  activeFolder: string;
  onMenuToggle: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
  onSearchToggle?: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

export interface HeaderActionButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  size?: "sm" | "default" | "lg";
}

export interface SearchBarProps {
  onSearchToggle?: () => void;
  placeholder?: string;
}

export interface UserDropdownProps {
  variant?: "mobile" | "desktop";
}

export interface FolderTitleProps {
  displayTitle: string;
  screenSize: string;
}
