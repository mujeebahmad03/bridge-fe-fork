"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  period: string;
  trend: "up" | "down";
}

export function StatsCard({
  title,
  value,
  change,
  period,
  trend,
}: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-center gap-1">
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="h-3 w-3 text-destructive" />
            )}
            <span
              className={`text-xs font-medium ${trend === "up" ? "text-green-600 dark:text-green-400" : "text-destructive"}`}
            >
              {change}
            </span>
            <span className="ml-1 text-xs text-muted-foreground">{period}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
