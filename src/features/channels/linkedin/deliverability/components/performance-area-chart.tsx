"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    period: "Oct 9-15",
    connected: 25,
    accepted: 60,
    messaged: 55,
    responded: 20,
    fullDate: "October 9 - October 15",
  },
  {
    period: "Oct 16-22",
    connected: 35,
    accepted: 85,
    messaged: 60,
    responded: 5,
    fullDate: "October 16 - October 22",
  },
  {
    period: "Oct 23-29",
    connected: 20,
    accepted: 50,
    messaged: 70,
    responded: 25,
    fullDate: "October 23 - October 29",
  },
  {
    period: "Oct 30-Nov 5",
    connected: 15,
    accepted: 15,
    messaged: 55,
    responded: 30,
    fullDate: "October 30 - November 5",
  },
  {
    period: "Nov 6-12",
    connected: 10,
    accepted: 45,
    messaged: 55,
    responded: 15,
    fullDate: "November 6 - November 12",
  },
  {
    period: "Nov 13-19",
    connected: 20,
    accepted: 65,
    messaged: 85,
    responded: 60,
    fullDate: "November 13 - November 19",
  },
  {
    period: "Nov 20-26",
    connected: 25,
    accepted: 75,
    messaged: 50,
    responded: 20,
    fullDate: "November 20 - November 26",
  },
];

const chartConfig = {
  connected: {
    label: "Connected",
    color: "hsl(var(--primary))",
  },
  accepted: {
    label: "Accepted Invite",
    color: "hsl(var(--primary) / 0.8)",
  },
  messaged: {
    label: "Messaged",
    color: "hsl(var(--destructive))",
  },
  responded: {
    label: "Responded",
    color: "hsl(var(--destructive) / 0.8)",
  },
};

export function PerformanceAreaChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          LinkedIn Performance Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <defs>
                <linearGradient id="colorConnected" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-connected)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-connected)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="colorAccepted" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-accepted)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-accepted)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="colorMessaged" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-messaged)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-messaged)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="colorResponded" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-responded)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-responded)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="period"
                className="text-xs"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis
                className="text-xs"
                label={{ value: "Count", angle: -90, position: "insideLeft" }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value, payload) => {
                      const data = payload?.[0]?.payload;
                      return data?.fullDate || value;
                    }}
                    formatter={(value, name) => [
                      value,
                      chartConfig[name as keyof typeof chartConfig]?.label ||
                        name,
                    ]}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="connected"
                stackId="1"
                stroke="var(--color-connected)"
                fill="url(#colorConnected)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="accepted"
                stackId="1"
                stroke="var(--color-accepted)"
                fill="url(#colorAccepted)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="messaged"
                stackId="1"
                stroke="var(--color-messaged)"
                fill="url(#colorMessaged)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="responded"
                stackId="1"
                stroke="var(--color-responded)"
                fill="url(#colorResponded)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary/80" />
            <span className="text-sm text-muted-foreground">
              Accepted invite
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-destructive" />
            <span className="text-sm text-muted-foreground">Messaged</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-destructive/80" />
            <span className="text-sm text-muted-foreground">Responded</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
