"use client";

import { Search, Clock, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LinkedInInlineFilters } from "./linkedin-inline-filters";
import { LinkedInMessageList } from "./linkedin-message-list";
import { mockLinkedInMessages } from "@/data/mock-linkedin-messages";
import { mockLinkedInAccounts } from "@/data/mock-linkedin-accounts";
import type {
  LinkedInMessageFilters,
  LinkedInMessageTab,
} from "@/types/linkedin-message";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/ui";
import { dashboardRoutes } from "@/config/routes";

interface LinkedInMessagingDashboardProps {
  onScheduleMessage: () => void;
}

export function LinkedInMessagingDashboard({
  onScheduleMessage,
}: LinkedInMessagingDashboardProps) {
  const [activeTab, setActiveTab] = useState<LinkedInMessageTab>("inbox");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<string>("all");
  const [uniboxEnabled, setUniboxEnabled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { push } = useRouter();

  const [appliedFilters, setAppliedFilters] = useState<LinkedInMessageFilters>({
    campaigns: [],
    linkedInAccounts: [],
    emailStatus: [],
    showProfilesWithEmails: false,
    dateRange: { from: null, to: null },
    searchQuery: "",
  });

  const [pendingFilters, setPendingFilters] =
    useState<LinkedInMessageFilters>(appliedFilters);

  const handleApplyFilters = () => {
    setAppliedFilters({ ...pendingFilters, searchQuery });
  };

  const handleClearFilters = () => {
    const clearedFilters: LinkedInMessageFilters = {
      campaigns: [],
      linkedInAccounts: [],
      emailStatus: [],
      showProfilesWithEmails: false,
      dateRange: { from: null, to: null },
      searchQuery: "",
    };
    setPendingFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
    setSearchQuery("");
  };

  const handleMessageClick = (messageId: string) => {
    console.log("Open message:", messageId);
    // Handle opening message conversation
  };

  // Filter messages based on applied filters
  const filteredMessages = mockLinkedInMessages.filter((message) => {
    // Tab filtering
    if (activeTab === "inbox" && message.status === "sent") return false;
    if (activeTab === "scheduled") return false; // Would filter scheduled messages
    if (activeTab === "queue") return false; // Would filter queued messages

    // Account filtering (if not unibox)
    if (
      !uniboxEnabled &&
      selectedAccount !== "all" &&
      message.linkedInAccountId !== selectedAccount
    ) {
      return false;
    }

    // Search filtering
    if (
      appliedFilters.searchQuery &&
      !message.content
        .toLowerCase()
        .includes(appliedFilters.searchQuery.toLowerCase()) &&
      !message.senderName
        .toLowerCase()
        .includes(appliedFilters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Campaign filtering
    if (
      appliedFilters.campaigns.length > 0 &&
      message.campaignId &&
      !appliedFilters.campaigns.includes(message.campaignId)
    ) {
      return false;
    }

    // LinkedIn account filtering
    if (
      appliedFilters.linkedInAccounts.length > 0 &&
      !appliedFilters.linkedInAccounts.includes(message.linkedInAccountId)
    ) {
      return false;
    }

    // Status filtering
    if (
      appliedFilters.emailStatus.length > 0 &&
      !appliedFilters.emailStatus.includes(message.status)
    ) {
      return false;
    }

    // Date range filtering
    if (
      appliedFilters.dateRange.from &&
      message.timestamp < appliedFilters.dateRange.from
    ) {
      return false;
    }
    if (
      appliedFilters.dateRange.to &&
      message.timestamp > appliedFilters.dateRange.to
    ) {
      return false;
    }

    return true;
  });

  const tabItems = [
    { id: "inbox" as const, label: "Inbox", icon: "📥" },
    { id: "scheduled" as const, label: "Scheduled messages", icon: "📅" },
    { id: "queue" as const, label: "Queue status", icon: "⏳" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col gap-4">
        {/* Top row - Main action buttons */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button
            variant="default"
            className="w-full bg-teal-600 text-white hover:bg-teal-700 sm:w-auto"
            onClick={() => push(`${dashboardRoutes.linkedIn}/accounts`)}
          >
            <BarChart3 className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">LinkedIn Account Management</span>
          </Button>
          <Button
            variant="default"
            className="w-full bg-slate-600 text-white hover:bg-slate-700 sm:w-auto"
            onClick={() => push(`${dashboardRoutes.linkedIn}/performance`)}
          >
            <BarChart3 className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">LinkedIn Performance</span>
          </Button>
        </div>

        {/* Bottom row - Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          {/* Account Selector - Hidden when unibox is enabled */}
          {!uniboxEnabled && (
            <div className="flex flex-col gap-2 sm:order-1 sm:flex-row sm:items-center">
              <span className="whitespace-nowrap text-sm text-foreground sm:hidden">
                Account:
              </span>
              <Select
                value={selectedAccount}
                onValueChange={setSelectedAccount}
              >
                <SelectTrigger className="w-full min-w-[80px] sm:w-20">
                  <SelectValue placeholder="SD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {mockLinkedInAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.email
                        .split("@")[0]
                        .substring(0, 2)
                        .toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Unibox Toggle */}
          <div className="flex items-center justify-between sm:order-2 sm:justify-start sm:space-x-2">
            <Label htmlFor="unibox" className="text-sm font-medium">
              Toggle Unibox
            </Label>
            <Switch
              id="unibox"
              checked={uniboxEnabled}
              onCheckedChange={setUniboxEnabled}
            />
          </div>

          {/* Schedule Message Button */}
          <Button
            onClick={onScheduleMessage}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:order-3 sm:w-auto"
          >
            <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">Schedule message</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <LinkedInInlineFilters
        filters={appliedFilters}
        pendingFilters={pendingFilters}
        onFiltersChange={setPendingFilters}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleApplyFilters();
            }
          }}
        />
      </div>

      {/* Tabs - Desktop vs Mobile */}
      <Card className="border-0 shadow-sm">
        {isMobile ? (
          /* Mobile: Dropdown selector */
          <div className="border-b p-4">
            <Select
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as LinkedInMessageTab)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span>
                      {tabItems.find((item) => item.id === activeTab)?.icon}
                    </span>
                    <span>
                      {tabItems.find((item) => item.id === activeTab)?.label}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {tabItems.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          /* Desktop: Traditional tabs */
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as LinkedInMessageTab)}
          >
            <TabsList className="grid h-auto w-full grid-cols-3 rounded-none border-b bg-transparent p-0">
              {tabItems.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className={cn(
                    "flex items-center gap-2 rounded-none border-b-2 border-transparent px-6 py-4",
                    "data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600",
                  )}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {/* Message List */}
        <LinkedInMessageList
          messages={filteredMessages}
          selectedMessages={selectedMessages}
          onSelectionChange={setSelectedMessages}
          onMessageClick={handleMessageClick}
        />
      </Card>
    </div>
  );
}
