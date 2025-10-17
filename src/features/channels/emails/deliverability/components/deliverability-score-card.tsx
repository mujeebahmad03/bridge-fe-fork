"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeliverabilityScoreCardProps {
  score: number;
  previousScore?: number;
  className?: string;
}

export function DeliverabilityScoreCard({
  score,
  previousScore,
  className,
}: DeliverabilityScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Good";
    if (score >= 60) return "Fair";
    return "Poor";
  };

  // const getProgressColor = (score: number) => {
  //   if (score >= 80) return "bg-green-500";
  //   if (score >= 60) return "bg-yellow-500";
  //   return "bg-red-500";
  // };

  const getTrendIcon = () => {
    if (!previousScore) return null;
    if (score > previousScore)
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (score < previousScore)
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getTrendText = () => {
    if (!previousScore) return null;
    const diff = score - previousScore;
    if (diff > 0) return `+${diff}% from last period`;
    if (diff < 0) return `${diff}% from last period`;
    return "No change from last period";
  };

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20" />
      <CardContent className="relative p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Deliverability Score
            </h3>
            <div className="flex items-center gap-2">
              {getTrendIcon()}
              {previousScore && (
                <span className="text-sm text-muted-foreground">
                  {getTrendText()}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-end gap-2">
              <span className={cn("text-4xl font-bold", getScoreColor(score))}>
                {score}%
              </span>
              <span
                className={cn("mb-1 text-lg font-medium", getScoreColor(score))}
              >
                {getScoreLabel(score)}
              </span>
            </div>

            <div className="space-y-2">
              <Progress value={score} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Your messages may not be reaching recipients effectively. This
                could be due to inactive contacts or low engagement. Review your
                contact list and optimize your outreach to improve results.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
