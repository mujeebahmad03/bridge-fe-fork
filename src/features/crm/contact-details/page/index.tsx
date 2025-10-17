"use client";

import { ArrowLeft, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ContactPanel } from "../components/contact-panel";
import { InteractionPanel } from "../components/interaction-panel";
import { dashboardRoutes } from "@/config/routes";

export function CRMInterface() {
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="gradient-header sticky top-0 z-20 border-b border-border backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="interactive-button text-body gap-2"
            >
              <Link href={dashboardRoutes.crm}>
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Contacts</span>
              </Link>
            </Button>

            <Sheet
              open={isContactSheetOpen}
              onOpenChange={setIsContactSheetOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="interactive-button text-body gap-2 bg-transparent lg:hidden"
                >
                  <User className="h-4 w-4" />
                  Contact Info
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="gradient-sidebar w-full p-0 sm:w-96"
              >
                <div className="scrollbar-thin h-full overflow-y-auto">
                  <ContactPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex h-screen flex-col lg:flex-row">
        <div className="border-subtle gradient-sidebar scrollbar-thin hidden w-96 overflow-y-auto border-r lg:block">
          <ContactPanel />
        </div>

        {/* Interaction Timeline Panel - Fixed height with internal scrolling */}
        <div className="h-full flex-1 bg-background">
          <InteractionPanel />
        </div>
      </div>
    </>
  );
}
