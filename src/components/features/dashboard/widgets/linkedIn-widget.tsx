import { Linkedin } from "lucide-react";

import { MetricCard } from "./metric-card";
import { WidgetHeader } from "./widget-header";

import { useDashboardState } from "@/hooks/ui";
import { WidgetData } from "@/types/dashboard-widget";

interface LinkedInWidgetProps {
  data: WidgetData;
}

export const LinkedInWidget: React.FC<LinkedInWidgetProps> = ({ data }) => {
  const {
    dateRange,
    setDateRange,
    datePreset,
    setDatePreset,
    selectedCampaigns,
    setSelectedCampaigns,
  } = useDashboardState();

  return (
    <div className="flex h-full flex-col p-4">
      <WidgetHeader
        title={data.title}
        icon={<Linkedin className="text-blue-600" size={20} />}
        iconClassName="bg-blue-100 dark:bg-blue-900/20"
        dateRange={dateRange}
        datePreset={datePreset}
        campaigns={[
          { id: "1", name: "Campaign 1" },
          { id: "2", name: "Campaign 2" },
        ]} // Replace with actual campaigns
        selectedCampaigns={selectedCampaigns}
        onDateRangeChange={setDateRange}
        onDatePresetChange={setDatePreset}
        onCampaignsChange={setSelectedCampaigns}
      />

      <div className="grid grid-cols-1 gap-2 overflow-y-auto lg:grid-cols-2 xl:grid-cols-3">
        {data.metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>
    </div>
  );
};
