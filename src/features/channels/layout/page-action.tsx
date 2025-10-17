"use client";

import {
  MoreHorizontal,
  Settings,
  BarChart3,
  Users,
  TrendingUp,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashboardRoutes } from "@/config/routes";

export function PageActions() {
  const pathname = usePathname();

  const getPageActions = () => {
    switch (pathname) {
      case dashboardRoutes.emails:
        return [
          {
            label: "Management",
            href: dashboardRoutes.emailManagement,
            icon: Settings,
          },
          {
            label: "Delivery Report",
            href: dashboardRoutes.emailDeliveryReport("default"),
            icon: BarChart3,
          },
        ];

      case dashboardRoutes.linkedIn:
        return [
          {
            label: "Performance",
            href: dashboardRoutes.linkedInPerformance,
            icon: TrendingUp,
          },
          {
            label: "Accounts",
            href: dashboardRoutes.linkedInAccounts,
            icon: Users,
          },
        ];

      default:
        return;
    }
  };

  const actions = getPageActions();

  if (actions?.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-dashed bg-transparent transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {actions?.map((action, index) => (
          <div key={action.href}>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={action.href} className="flex items-center gap-2">
                <action.icon className="h-4 w-4" />
                {action.label}
              </Link>
            </DropdownMenuItem>
            {index === 1 && pathname.includes("/channels/") && (
              <DropdownMenuSeparator />
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
