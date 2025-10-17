"use client";

import { useScreenSize } from "@/emails/dashboard/hooks/ui";
import { MobileSidebar } from "./mobile-sidebar";
import { DesktopSidebar } from "./desktop-sidebar";

import type { ResponsiveSidebarProps } from "@/emails/dashboard/types";

export function ResponsiveSidebar(props: ResponsiveSidebarProps) {
  const screenSize = useScreenSize();
  const isMobileOrTablet = screenSize === "mobile" || screenSize === "tablet";

  if (isMobileOrTablet && props.onClose) {
    return <MobileSidebar {...props} screenSize={screenSize} />;
  }

  return <DesktopSidebar {...props} />;
}
