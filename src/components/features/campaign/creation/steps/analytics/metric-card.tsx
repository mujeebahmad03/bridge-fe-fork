"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  variant?: "default" | "warning" | "danger";
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  variant = "default",
}: MetricCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "warning":
        return {
          cardBg:
            "from-amber-50 to-orange-50 dark:from-amber-950/10 dark:to-orange-950/10",
          iconBg: "from-amber-500 to-orange-500",
          border: "border-amber-200/50 dark:border-amber-800/50",
        };
      case "danger":
        return {
          cardBg:
            "from-red-50 to-rose-50 dark:from-red-950/10 dark:to-rose-950/10",
          iconBg: "from-red-500 to-rose-500",
          border: "border-red-200/50 dark:border-red-800/50",
        };
      default:
        return {
          cardBg:
            "from-slate-50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/30",
          iconBg: "from-slate-600 to-slate-700",
          border: "border-slate-200/50 dark:border-slate-700/50",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Card
      className={cn(
        "relative overflow-hidden border bg-gradient-to-br shadow-sm transition-all duration-300 hover:shadow-md",
        styles.cardBg,
        styles.border,
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "rounded-xl bg-gradient-to-r p-2.5 shadow-sm",
              styles.iconBg,
            )}
          >
            <Icon className="h-4 w-4 text-white" />
          </div>
          <Badge
            variant="secondary"
            className="border-0 bg-white/80 text-emerald-600 shadow-sm dark:bg-slate-800/80 dark:text-emerald-400"
          >
            <TrendingUp className="mr-1 h-3 w-3" />
            {change}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            since last year
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
