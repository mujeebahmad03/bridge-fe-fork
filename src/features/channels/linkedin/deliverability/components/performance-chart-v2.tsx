"use client";

import {
  Bar,
  BarChart,
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
    color: "hsl(var(--chart-1))",
  },
  accepted: {
    label: "Accepted Invite",
    color: "hsl(var(--chart-2))",
  },
  messaged: {
    label: "Messaged",
    color: "hsl(var(--chart-3))",
  },
  responded: {
    label: "Responded",
    color: "hsl(var(--chart-4))",
  },
};

export function PerformanceChartV2() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          LinkedIn Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
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
              <Bar
                dataKey="connected"
                stackId="a"
                fill="var(--color-connected)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="accepted"
                stackId="a"
                fill="var(--color-accepted)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="messaged"
                stackId="a"
                fill="var(--color-messaged)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="responded"
                stackId="a"
                fill="var(--color-responded)"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Legend using Tailwind classes */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-1" />
            <span className="text-sm text-muted-foreground">Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-2" />
            <span className="text-sm text-muted-foreground">
              Accepted invite
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-3" />
            <span className="text-sm text-muted-foreground">Messaged</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-4" />
            <span className="text-sm text-muted-foreground">Responded</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
