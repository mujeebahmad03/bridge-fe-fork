"use client";

import { format, parseISO } from "date-fns";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { DeliverabilityData } from "@/types/deliverability";

interface DeliverabilityChartProps {
  data: DeliverabilityData[];
  selectedAccount: string;
  className?: string;
}

export function DeliverabilityChart({
  data,
  selectedAccount,
  className,
}: DeliverabilityChartProps) {
  const chartConfig = {
    score: {
      label: "Deliverability Score",
      color: "hsl(var(--chart-1))",
    },
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "MMM dd");
  };

  const averageScore = Math.round(
    data.reduce((sum, item) => sum + item.score, 0) / data.length,
  );

  return (
    <Card
      className={`w-full border-0 bg-gradient-to-br from-card/80 to-card/60 shadow-xl backdrop-blur-xl ${className}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 shadow-sm" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              Deliverability Trend
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="font-medium text-muted-foreground">
              Avg: {averageScore}%
            </span>
          </div>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{selectedAccount}</p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full sm:h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                labelFormatter={(value) =>
                  format(parseISO(value), "MMM dd, yyyy")
                }
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorScore)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
