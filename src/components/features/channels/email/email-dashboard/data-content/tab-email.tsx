import { cn } from "@/lib/utils";
import { Inbox, Mail, MailOpen, Edit, Clock } from "lucide-react";

const tabs = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "unread", label: "Unread", icon: Mail },
  { id: "sent", label: "Sent", icon: MailOpen },
  { id: "draft", label: "Draft", icon: Edit },
  { id: "scheduled", label: "Scheduled email", icon: Clock },
];

interface TabsEmailProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function TabsEmail({ activeTab, setActiveTab }: TabsEmailProps) {
  return (
    <div className="mb-6 border-b border-border/40">
      <div className="flex space-x-8 overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
