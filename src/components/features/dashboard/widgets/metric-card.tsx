import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Metric } from "@/types/dashboard-widget";

interface MetricCardProps {
  metric: Metric;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  metric,
  className,
}) => {
  const { label, value, change } = metric;
  const isPositive = change && change > 0;

  return (
    <Card
      className={cn(
        "p-4 transition-all duration-300 hover:shadow-lg dark:border-border/50 dark:bg-card/50",
        className,
      )}
    >
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          {change && (
            <div
              className={cn(
                "flex items-center space-x-1 text-sm",
                isPositive ? "text-emerald-500" : "text-red-500",
              )}
            >
              {isPositive ? (
                <ArrowUpIcon size={16} />
              ) : (
                <ArrowDownIcon size={16} />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
