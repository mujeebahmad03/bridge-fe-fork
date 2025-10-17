"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { NavigationMenuItem } from "./nav-item";

import { dashboardNavItems } from "@/config/dashboard-nav-items";

export function NavigationSheet() {
  const [open, setOpen] = useState(false);

  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 transition-all duration-200 hover:scale-105 hover:bg-accent hover:text-accent-foreground"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-80 bg-gradient-to-b from-background to-muted/20 p-0"
      >
        <SheetHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-6 dark:from-blue-950/20 dark:to-purple-950/20">
          <SheetTitle className="flex items-center justify-between">
            <Logo width={80} height={40} />
          </SheetTitle>
          <SheetDescription className="mt-2 text-sm text-muted-foreground">
            Streamline your lead generation
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-4 py-6">
          <nav
            className="space-y-2"
            role="navigation"
            aria-label="Main navigation"
          >
            {dashboardNavItems.map((item, index) => (
              <div key={item.href}>
                <NavigationMenuItem item={item} onItemClick={handleItemClick} />
                {index < dashboardNavItems.length - 1 && index === 2 && (
                  <Separator className="my-4 opacity-50" />
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
