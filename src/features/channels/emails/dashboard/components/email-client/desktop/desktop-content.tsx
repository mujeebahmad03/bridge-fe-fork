"use client";

import { useRef } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ResponsiveSidebar } from "@/emails/dashboard/components/sidebar";
import { ResponsiveEmailList } from "@/emails/dashboard/components/email-list";
import { AnimatedEmailContent } from "@/emails/dashboard/components/email-content";
import { AnimatedStatusBar } from "@/emails/dashboard/components/shared";

import { useEmailClientStore } from "@/emails/dashboard/stores";
import { useEmailListLogic } from "@/emails/dashboard/hooks/ui";

export function DesktopContent() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { sidebarSize, setSidebarSize } = useEmailClientStore();
  const { selectedEmail, activeFolder, filteredEmails } = useEmailListLogic();

  const isCollapsed = sidebarSize <= 8;
  const currentEmailIndex = selectedEmail
    ? filteredEmails.findIndex((email) => email.id === selectedEmail.id)
    : -1;

  return (
    <div className="flex h-full flex-1 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Sidebar */}
        <ResizablePanel
          defaultSize={20}
          minSize={5}
          maxSize={30}
          onResize={setSidebarSize}
        >
          <ResponsiveSidebar
            activeFolder={activeFolder}
            isCollapsed={isCollapsed}
            isLoading={false}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Email List */}
        <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
          <div className="h-full overflow-hidden">
            <ResponsiveEmailList
              searchInputRef={searchInputRef}
              isLoading={false}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Email Content */}
        <ResizablePanel defaultSize={45} minSize={30} maxSize={60}>
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-hidden">
              <AnimatedEmailContent email={selectedEmail} />
            </div>
            <AnimatedStatusBar
              selectedEmail={selectedEmail}
              totalEmails={filteredEmails.length}
              currentIndex={currentEmailIndex}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
