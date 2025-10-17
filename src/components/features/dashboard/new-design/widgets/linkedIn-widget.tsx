import { Linkedin } from "lucide-react";
import { toast } from "sonner";

import { MetricCard } from "./metric-card";
import { AnalyticsFilter } from "./filters/analytics-filter";
import { Card, CardContent, CardHeader } from "@/components/ui";

import { WIDGET_TEMPLATES } from "@/data/widget-data";
import { cn } from "@/lib/utils";
import { AnalyticsFilters, WidgetValueType } from "@/types/widget";

interface LinkedInWidgetProps {
  className?: string;
}

export const LinkedInWidget = ({ className }: LinkedInWidgetProps) => {
  const widget = WIDGET_TEMPLATES.find(
    (w) => w.id === WidgetValueType.linkedIn,
  );

  const handleFilterChange = (filters: AnalyticsFilters) => {
    console.log({ filters });
    toast.info("Filter applied");
  };

  return (
    <Card className={cn("overflow-hidden border-none", className)}>
      <CardHeader className="p-6 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-xl font-semibold">LinkedIn Analytics</h3>
            <p className="text-sm text-muted-foreground">
              View detailed analysis on LinkedIn channel
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-widget-linkedin">
            <Linkedin className="h-5 w-5 text-icon-linkedin" />
          </div>
        </div>

        <AnalyticsFilter onFilterChange={handleFilterChange} className="mt-4" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {widget?.metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
