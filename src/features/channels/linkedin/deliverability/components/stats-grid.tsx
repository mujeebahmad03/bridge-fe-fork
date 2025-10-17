"use client";

import { StatsCard } from "./stats-card";

const statsData = [
  {
    title: "Connections",
    value: "1,250",
    change: "+3.2%",
    period: "Last 30 Days",
    trend: "up" as const,
  },
  {
    title: "Message Sent",
    value: "160",
    change: "+3.2%",
    period: "Last 30 Days",
    trend: "up" as const,
  },
  {
    title: "Pending Invites",
    value: "160",
    change: "-3.2%",
    period: "Last 30 Days",
    trend: "down" as const,
  },
  {
    title: "Replies Received",
    value: "160",
    change: "+3.2%",
    period: "Last 30 Days",
    trend: "up" as const,
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          period={stat.period}
          trend={stat.trend}
        />
      ))}
    </div>
  );
}
