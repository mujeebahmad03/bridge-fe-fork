"use client";

import type { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout";
import { dashboardNavItems } from "@/config/dashboard-nav-items";
import { baseDashboardRoute } from "@/config/routes";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar navItems={dashboardNavItems} route={baseDashboardRoute} />

      {children}
    </SidebarProvider>
  );
}
