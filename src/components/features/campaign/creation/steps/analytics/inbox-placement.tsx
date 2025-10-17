"use client";

import { Mail, BarChart3, AlertTriangle, XCircle } from "lucide-react";
import { MetricCard } from "./metric-card";

const inboxMetrics = [
  {
    title: "Inbox Rate",
    value: "49.65%",
    change: "+1.20%",
    icon: Mail,
    variant: "default" as const,
  },
  {
    title: "Promotions Tab Rate",
    value: "49.65%",
    change: "+1.20%",
    icon: BarChart3,
    variant: "default" as const,
  },
  {
    title: "Spam Rate",
    value: "49.65%",
    change: "+1.20%",
    icon: AlertTriangle,
    variant: "warning" as const,
  },
  {
    title: "Not Delivered Rate",
    value: "49.65%",
    change: "+1.20%",
    icon: XCircle,
    variant: "danger" as const,
  },
];

export function InboxPlacementTab() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {inboxMetrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
          variant={metric.variant}
        />
      ))}
    </div>
  );
}
