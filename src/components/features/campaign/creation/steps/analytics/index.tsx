"use client";

import { BarChart3, TestTube } from "lucide-react";
import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ABTestTab } from "./ab-test";
import { CustomTabs } from "./custom-tab";

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("inbox");

  const tabs = [
    {
      id: "inbox",
      label: "Inbox Placement",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      id: "abtest",
      label: "A/B Test Results",
      icon: <TestTube className="h-4 w-4" />,
    },
  ];

  const inboxMetrics = [
    {
      title: "Inbox Rate",
      value: "49.65%",
      change: "+1.20%",
      trend: "up",
      icon: BarChart3,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient:
        "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
    },
    {
      title: "Promotions Tab Rate",
      value: "49.65%",
      change: "+1.20%",
      trend: "up",
      icon: BarChart3,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient:
        "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
    },
    {
      title: "Spam Rate",
      value: "49.65%",
      change: "+1.20%",
      trend: "up",
      icon: TestTube,
      gradient: "from-amber-500 to-orange-600",
      bgGradient:
        "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
    },
    {
      title: "Not Delivered Rate",
      value: "49.65%",
      change: "+1.20%",
      trend: "up",
      icon: TestTube,
      gradient: "from-rose-500 to-pink-600",
      bgGradient:
        "from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Custom Tabs */}
      <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="max-w-md"
      />

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === "inbox" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {inboxMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card
                  key={index}
                  className={`relative overflow-hidden border-0 bg-gradient-to-br ${metric.bgGradient} shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-5`}
                  />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`rounded-lg bg-gradient-to-r p-2 ${metric.gradient}`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="border-0 bg-white/80 text-emerald-600 dark:bg-slate-800/80 dark:text-emerald-400"
                      >
                        {/* TrendingUp icon and change value are removed as per updates */}
                        {metric.change}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        {metric.value}
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {metric.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        since last year
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        {activeTab === "abtest" && <ABTestTab />}
      </div>
    </div>
  );
}
