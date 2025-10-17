"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types/components";

interface NavigationMenuItemProps {
  item: NavItem;
  onItemClick?: () => void;
}

export function NavigationMenuItem({
  item,
  onItemClick,
}: NavigationMenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const hasActiveSubmenu =
    hasSubmenu && item.submenu?.some((subItem) => pathname === subItem.href);

  if (hasSubmenu) {
    return (
      <Collapsible defaultOpen={hasActiveSubmenu} className="group/collapsible">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "group h-12 w-full justify-start gap-3 px-4 font-medium transition-all duration-200",
              "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-foreground",
              "dark:hover:from-blue-950/20 dark:hover:to-purple-950/20",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              (isActive || hasActiveSubmenu) &&
                "bg-gradient-to-r from-blue-100 to-purple-100 text-foreground dark:from-blue-900/30 dark:to-purple-900/30",
            )}
          >
            <div
              className={cn(
                "rounded-md p-1.5 transition-colors duration-200",
                isActive || hasActiveSubmenu
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-muted group-hover:bg-background",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
            </div>
            <span className="flex-1 text-left">{item.title}</span>
            <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 space-y-1 pl-4">
          {item.submenu?.map((subItem) => (
            <NavigationSubMenuItem
              key={subItem.href}
              item={subItem}
              onItemClick={onItemClick}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "group h-12 w-full justify-start gap-3 px-4 font-medium transition-all duration-200",
        "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-foreground",
        "dark:hover:from-blue-950/20 dark:hover:to-purple-950/20",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive &&
          "bg-gradient-to-r from-blue-100 to-purple-100 text-foreground dark:from-blue-900/30 dark:to-purple-900/30",
      )}
      onClick={onItemClick}
    >
      <Link href={item.href} className="flex w-full items-center gap-3">
        <div
          className={cn(
            "rounded-md p-1.5 transition-colors duration-200",
            isActive
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              : "bg-muted group-hover:bg-background",
          )}
        >
          <item.icon className="h-4 w-4 shrink-0" />
        </div>
        <span>{item.title}</span>
      </Link>
    </Button>
  );
}

interface NavigationSubMenuItemProps {
  item: NavItem;
  onItemClick?: () => void;
}

function NavigationSubMenuItem({
  item,
  onItemClick,
}: NavigationSubMenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={cn(
        "group ml-4 h-10 w-full justify-start gap-3 px-4 font-normal transition-all duration-200",
        "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-foreground",
        "dark:hover:from-blue-950/20 dark:hover:to-purple-950/20",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive &&
          "bg-gradient-to-r from-blue-100 to-purple-100 font-medium text-foreground dark:from-blue-900/30 dark:to-purple-900/30",
      )}
      onClick={onItemClick}
    >
      <Link href={item.href} className="flex w-full items-center gap-3">
        <div
          className={cn(
            "rounded-sm p-1 transition-colors duration-200",
            isActive
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              : "bg-muted/50 group-hover:bg-background",
          )}
        >
          {item.icon && <item.icon className="h-3 w-3 shrink-0" />}
        </div>
        <span>{item.title}</span>
      </Link>
    </Button>
  );
}
