"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DeliverabilityMetrics } from "@/types/deliverability";
import { cn } from "@/lib/utils";

interface MetricsGridProps {
  metrics: DeliverabilityMetrics;
  className?: string;
}

export function MetricsGrid({ metrics, className }: MetricsGridProps) {
  const metricCards = [
    {
      label: "Bounce Rate",
      value: metrics.bounceRate,
      format: "percentage",
      trend: -0.3,
      description: "Low Bounce Rate",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      iconColor: "text-green-600",
    },
    {
      label: "Spam Rate",
      value: metrics.spamRate,
      format: "percentage",
      trend: -0.1,
      description: "Low Spam Rate",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      iconColor: "text-green-600",
    },
    {
      label: "Reply Rate",
      value: metrics.replyRate,
      format: "percentage",
      trend: 0.5,
      description: "Good Reply Rate",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      iconColor: "text-blue-600",
    },
    {
      label: "Open Rate",
      value: metrics.openRate,
      format: "percentage",
      trend: 1.2,
      description: "Last 30 Days",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      iconColor: "text-blue-600",
    },
    {
      label: "Click Rate",
      value: metrics.clickRate,
      format: "percentage",
      trend: 0.3,
      description: "Last 30 Days",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      iconColor: "text-purple-600",
    },
  ];

  const getTrendIcon = (trend: number, iconColor: string) => {
    if (trend > 0) return <TrendingUp className={cn("h-4 w-4", iconColor)} />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const formatValue = (value: number, format: string) => {
    if (format === "percentage") return `${value}%`;
    return value.toLocaleString();
  };

  return (
    <Card
      className={cn(
        "border-0 bg-gradient-to-br from-card/80 to-card/60 shadow-xl backdrop-blur-xl",
        className,
      )}
    >
      <CardHeader className="pb-6">
        <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
          Key Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Single row on large screens, single column on mobile */}
        <div className="grid grid-cols-1 divide-y divide-border lg:grid-cols-5 lg:divide-x lg:divide-y-0">
          {metricCards.map((metric, index) => (
            <div
              key={index}
              className="group relative overflow-hidden p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-accent/30"
            >
              {/* Subtle gradient background */}
              <div
                className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  metric.bgColor,
                )}
              />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend, metric.iconColor)}
                    <span
                      className={cn(
                        "text-xs font-medium",
                        metric.trend > 0
                          ? "text-green-600"
                          : metric.trend < 0
                            ? "text-red-600"
                            : "text-gray-600",
                      )}
                    >
                      {metric.trend > 0 ? "+" : ""}
                      {metric.trend}%
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground transition-transform duration-300 group-hover:scale-105">
                    {formatValue(metric.value, metric.format)}
                  </div>
                  <div className={cn("text-xs font-medium", metric.color)}>
                    {metric.description}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500 group-hover:animate-pulse",
                      metric.color.includes("green")
                        ? "bg-green-500"
                        : metric.color.includes("blue")
                          ? "bg-blue-500"
                          : "bg-purple-500",
                    )}
                    style={{ width: `${Math.min(metric.value * 2, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
