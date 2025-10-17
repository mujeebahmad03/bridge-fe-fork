"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Badge } from "@/components/ui/badge";
import { DateFilter } from "@/components/ui/date-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DeliverabilityChart,
  DeliverabilityScoreCard,
  FeedbackComplaintsCard,
  MetricsGrid,
  SuggestionsPanel,
} from "../components";
import { mockDeliverabilityReports } from "@/data/mock-deliverability";

export default function DeliverabilityReportPage() {
  const [selectedAccount, setSelectedAccount] = useState(
    "stephendandy@gmail.com",
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedPreset, setSelectedPreset] = useState("last30days");

  const currentReport = mockDeliverabilityReports.find(
    (report) => report.emailAccount === selectedAccount,
  );

  const handleDateChange = (range: DateRange | undefined, preset: string) => {
    setDateRange(range);
    setSelectedPreset(preset);
    console.log("Date range changed:", dateRange, "Preset:", selectedPreset);
  };

  if (!currentReport) return null;

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/10">
      {/* Page Content */}
      <main className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Page Header */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 opacity-50 dark:from-blue-950/20 dark:to-purple-950/20" />
            <div className="relative flex flex-col justify-between gap-4 rounded-2xl border border-white/20 p-6 backdrop-blur-sm dark:border-white/10 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <Badge className="border-0 bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Deliverability Report
                </Badge>
              </div>

              {/* Sender Selection */}
              <div className="flex items-center gap-4">
                <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
                  Sender
                </span>
                <Select
                  value={selectedAccount}
                  onValueChange={setSelectedAccount}
                >
                  <SelectTrigger className="w-full border-blue-200 bg-background/50 dark:border-blue-800 sm:w-[300px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDeliverabilityReports.map((report) => (
                      <SelectItem
                        key={report.emailAccount}
                        value={report.emailAccount}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 text-xs font-semibold text-white">
                            {report.emailAccount.charAt(0).toUpperCase()}
                          </div>
                          {report.emailAccount}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Score and Suggestions Row - Equal Width */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DeliverabilityScoreCard
              score={currentReport.metrics.deliverabilityScore}
              previousScore={82}
            />
            <SuggestionsPanel suggestions={currentReport.suggestions} />
          </div>

          {/* Date Range Filter */}
          <div className="flex justify-center lg:justify-start">
            <DateFilter onDateChange={handleDateChange} />
          </div>

          {/* Metrics Grid - Single Row on Large Screens */}
          <MetricsGrid metrics={currentReport.metrics} />

          {/* Chart - Full Width */}
          <div className="w-full">
            <DeliverabilityChart
              data={currentReport.chartData}
              selectedAccount={selectedAccount}
            />
          </div>

          {/* Feedback Card - Full Width */}
          <div className="w-full">
            <FeedbackComplaintsCard metrics={currentReport.metrics} />
          </div>
        </div>
      </main>
    </div>
  );
}
