"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TabNavigation } from "./interaction/tab-navigation";
import { ActivityTimeline } from "./interaction/activity-timeline";
import { EmailInterface } from "./interaction/email-interface";
import { EmptyState } from "./interaction/empty-state";
import { LinkedInInterface } from "./interaction/linkedin-interface";
import { CallInterface } from "./interaction/call-interface";
import { TaskInterface } from "./interaction/task-interface";
import { NotesInterface } from "./interaction/notes-interface";
import {
  Activity,
  Mail,
  Phone,
  Calendar,
  FileText,
  ExternalLink,
} from "lucide-react";

const tabs = [
  { id: "activity", label: "Activity", icon: Activity },
  { id: "email", label: "Email", icon: Mail },
  { id: "linkedin", label: "LinkedIn", icon: ExternalLink },
  { id: "call", label: "Call", icon: Phone },
  { id: "task", label: "Task", icon: Calendar },
  { id: "notes", label: "Notes", icon: FileText },
];

export function InteractionPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState(() => {
    return searchParams.get("tab") || "activity";
  });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab && urlTab !== activeTab) {
      setActiveTab(urlTab);
    }
  }, [searchParams, activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "activity":
        return <ActivityTimeline />;
      case "email":
        return <EmailInterface />;
      case "linkedin":
        return <LinkedInInterface />;
      case "call":
        return <CallInterface />;
      case "task":
        return <TaskInterface />;
      case "notes":
        return <NotesInterface />;
      default:
        return <EmptyState />;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent flex-1 overflow-y-auto">
        <div className="p-3 lg:p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}
