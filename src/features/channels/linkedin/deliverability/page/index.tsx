"use client";

import { useState } from "react";

import {
  AccountSelector,
  ChartToggle,
  DashboardHeader,
  FeedbackSection,
  StatsGrid,
  DashboardIllustration,
} from "@/linkedin/deliverability/components";

export default function LinkedInDeliverability() {
  const [selectedAccount, setSelectedAccount] = useState("stephendayo");
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="mx-auto max-w-7xl space-y-6 p-4">
        {/* Account Selection and Illustration */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <AccountSelector
            selectedAccount={selectedAccount}
            selectedPeriod={selectedPeriod}
            onAccountChange={setSelectedAccount}
            onPeriodChange={setSelectedPeriod}
          />
          <DashboardIllustration />
        </div>

        {/* Stats Cards */}
        <StatsGrid />

        {/* Chart Section */}
        <ChartToggle />

        {/* Feedback Section */}
        <FeedbackSection />
      </div>
    </div>
  );
}
