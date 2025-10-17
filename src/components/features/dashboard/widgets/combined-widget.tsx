import { LayoutGrid } from "lucide-react";

import { MetricCard } from "./metric-card";
import { WidgetHeader } from "./widget-header";
import { Card } from "@/components/ui/card";

import { useDashboardState } from "@/hooks/ui";
import { WidgetData } from "@/types/dashboard-widget";
import { performanceData, WIDGET_TEMPLATES } from "@/data/widget-data";
import PerformanceOverview from "./performance-overview";

interface CombinedWidgetProps {
  data: WidgetData;
  isEditMode: boolean;
}

export const CombinedWidget: React.FC<CombinedWidgetProps> = ({ data }) => {
  const {
    dateRange,
    setDateRange,
    datePreset,
    setDatePreset,
    selectedCampaigns,
    setSelectedCampaigns,
  } = useDashboardState();

  // Get data from other widgets
  const emailData = WIDGET_TEMPLATES.find((w) => w.id === "email");
  const linkedInData = WIDGET_TEMPLATES.find((w) => w.id === "linkedin");
  const callsData = WIDGET_TEMPLATES.find((w) => w.id === "calls");

  return (
    <div className="flex h-full flex-col p-4">
      <WidgetHeader
        title={data.title}
        icon={<LayoutGrid className="text-purple-600" size={20} />}
        iconClassName="bg-purple-100 dark:bg-purple-900/20"
        dateRange={dateRange}
        datePreset={datePreset}
        campaigns={[
          { id: "1", name: "Campaign 1" },
          { id: "2", name: "Campaign 2" },
        ]}
        selectedCampaigns={selectedCampaigns}
        onDateRangeChange={setDateRange}
        onDatePresetChange={setDatePreset}
        onCampaignsChange={setSelectedCampaigns}
      />

      <div className="grid h-full gap-4">
        {/* Main metrics row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.metrics.map((metric, index) => (
            <MetricCard
              key={index}
              metric={metric}
              className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10"
            />
          ))}
        </div>

        {/* Channel metrics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Email Metrics */}
          <Card className="space-y-3 p-4">
            <div className="flex items-center gap-2 text-blue-600">
              <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/20">
                <LayoutGrid size={16} />
              </div>
              <h4 className="font-medium">Email Performance</h4>
            </div>
            <div className="space-y-2">
              {emailData?.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className="font-medium">{metric.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* LinkedIn Metrics */}
          <Card className="space-y-3 p-4">
            <div className="flex items-center gap-2 text-blue-600">
              <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/20">
                <LayoutGrid size={16} />
              </div>
              <h4 className="font-medium">LinkedIn Performance</h4>
            </div>
            <div className="space-y-2">
              {linkedInData?.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className="font-medium">{metric.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Calls Metrics */}
          <Card className="space-y-3 p-4">
            <div className="flex items-center gap-2 text-green-600">
              <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/20">
                <LayoutGrid size={16} />
              </div>
              <h4 className="font-medium">Calls Performance</h4>
            </div>
            <div className="space-y-2">
              {callsData?.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className="font-medium">{metric.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Progress indicators */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h4 className="mb-3 font-medium">Engagement Distribution</h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[35%] rounded-full bg-blue-500" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">LinkedIn</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[45%] rounded-full bg-blue-500" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Calls</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[20%] rounded-full bg-green-500" />
                </div>
              </div>
            </div>
          </Card>

          <PerformanceOverview data={performanceData} />
        </div>
      </div>
    </div>
  );
};
