import { Target, LayoutGrid } from "lucide-react";
import { toast } from "sonner";

import { MetricCard } from "./metric-card";
import { AnalyticsFilter } from "./filters/analytics-filter";
import { Card } from "@/components/ui";

import { WIDGET_TEMPLATES } from "@/data/widget-data";
import { cn } from "@/lib/utils";
import { AnalyticsFilters, WidgetValueType } from "@/types/widget";

interface CampaignWidgetProps {
  className?: string;
}

export const CampaignWidget = ({ className }: CampaignWidgetProps) => {
  const widget = WIDGET_TEMPLATES.find(
    (w) => w.id === WidgetValueType.campaign,
  );

  // Get data from other widgets
  const emailData = WIDGET_TEMPLATES.find((w) => w.id === "email");
  const linkedInData = WIDGET_TEMPLATES.find((w) => w.id === "linkedin");
  const callsData = WIDGET_TEMPLATES.find((w) => w.id === "calls");

  const handleFilterChange = (filters: AnalyticsFilters) => {
    console.log({ filters });
    toast.info("Filter applied");
  };

  return (
    <div className={cn("widget", className)}>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="widget-title">Campaign Analytics</h3>
            <p className="widget-subtitle">
              View detailed analysis on your entire campaign
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-widget-campaign">
            <Target className="h-5 w-5 text-icon-campaign" />
          </div>
        </div>

        <AnalyticsFilter onFilterChange={handleFilterChange} className="mb-4" />

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          {widget?.metrics.map((metric, index) => (
            <MetricCard
              key={index}
              metric={metric}
              className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10"
            />
          ))}
        </div>

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

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Card className="space-y-3 p-4">
            <h4 className="mb-4 text-sm font-medium">Performance Overview</h4>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>Email</span>
                  <span className="text-blue-600">70%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill bg-blue-500"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>LinkedIn</span>
                  <span className="text-purple-600">30%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill bg-purple-500"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>Calls</span>
                  <span className="text-green-600">60%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill bg-green-500"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="space-y-3 p-4">
            <h4 className="mb-4 text-sm font-medium">
              Engagement Distribution
            </h4>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>Email</span>
                  <span className="text-blue-600">40%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill bg-blue-500"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>LinkedIn</span>
                  <span className="text-purple-600">70%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill bg-purple-500"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>Calls</span>
                  <span className="text-green-600">20%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill bg-green-500"
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
