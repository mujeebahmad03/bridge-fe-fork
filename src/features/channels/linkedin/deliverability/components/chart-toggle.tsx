"use client";

import { useState } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PerformanceChart } from "./performance-chart";
import { PerformanceAreaChart } from "./performance-area-chart";

export function ChartToggle() {
  const [chartType, setChartType] = useState<"bar" | "area">("bar");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={chartType === "bar" ? "default" : "outline"}
          size="sm"
          onClick={() => setChartType("bar")}
          className="flex items-center gap-2"
        >
          <BarChart3 className="h-4 w-4" />
          Bar Chart
        </Button>
        <Button
          variant={chartType === "area" ? "default" : "outline"}
          size="sm"
          onClick={() => setChartType("area")}
          className="flex items-center gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Area Chart
        </Button>
      </div>

      {chartType === "bar" ? <PerformanceChart /> : <PerformanceAreaChart />}
    </div>
  );
}
