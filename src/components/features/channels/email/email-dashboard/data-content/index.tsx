"use client";

import { useState } from "react";

import { ActionButtons } from "../email-meta/action-button";
import { SearchAndUnibox } from "../email-meta/search-unibox";
import { FilterSection } from "../filters";
import { EmailList } from "./email-list";
import { TabsEmail } from "./tab-email";

interface EmailContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function EmailContent({ activeTab, setActiveTab }: EmailContentProps) {
  const [isUniboxEnabled, setIsUniboxEnabled] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border/40 p-3 lg:p-6">
        {/* Action buttons and controls */}
        <div className="mb-4 flex flex-col gap-4 lg:mb-6">
          <ActionButtons />
          <SearchAndUnibox
            isUniboxEnabled={isUniboxEnabled}
            setIsUniboxEnabled={setIsUniboxEnabled}
          />
        </div>

        {/* Enhanced Filter Section */}
        <FilterSection
          isUniboxEnabled={isUniboxEnabled}
          selectedEmail={selectedEmail}
          setSelectedEmail={setSelectedEmail}
        />
      </div>

      {/* Tabs and Email List */}
      <div className="flex min-h-0 flex-1 flex-col p-3 lg:p-6">
        <div className="mb-4">
          <TabsEmail activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex-1 overflow-auto">
          <EmailList />
        </div>
      </div>
    </div>
  );
}
