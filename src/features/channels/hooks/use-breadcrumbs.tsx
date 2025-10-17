"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { dashboardNavItems } from "@/config/dashboard-nav-items";
import { dashboardRoutes } from "@/config/routes";
import { CrumbItem } from "@/types/components";

export function useBreadcrumb(): CrumbItem[] {
  const pathname = usePathname();

  return useMemo(() => {
    const crumbs: CrumbItem[] = [];

    // Always start with Dashboard
    crumbs.push({
      title: "Dashboard",
      href: dashboardRoutes.home,
    });

    // Find matching nav item
    for (const item of dashboardNavItems) {
      if (pathname === item.href) {
        if (item.href !== dashboardRoutes.home) {
          crumbs.push({
            title: item.title,
            href: item.href,
            icon: item.icon,
          });
        }
        break;
      }

      // Check submenu items
      if (item.submenu) {
        for (const subItem of item.submenu) {
          if (pathname === subItem.href) {
            crumbs.push({
              title: item.title,
              href: item.href,
              icon: item.icon,
            });
            crumbs.push({
              title: subItem.title,
              href: subItem.href,
              icon: subItem.icon,
            });
            break;
          }
        }
      }
    }

    return crumbs;
  }, [pathname]);
}
