"use client";

import { Settings, CheckCircle, AlertCircle, Clock } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { EmailAccount } from "@/types/email-account";
import { cn } from "@/lib/utils";

interface ConfigurationProgressProps {
  account: EmailAccount;
  onConfigure: () => void;
}

export function ConfigurationProgress({
  account,
  onConfigure,
}: ConfigurationProgressProps) {
  // Calculate configuration completion percentage
  const calculateProgress = () => {
    const config = account.configuration;
    let completed = 0;
    const total = 5;

    if (config.signature) completed++;
    if (config.sendingLimit.daily > 0) completed++;
    if (config.optOutLink) completed++;
    if (config.subdomainTracking) completed++;
    if (config.domainAuthentication.dkim && config.domainAuthentication.spf)
      completed++;

    return Math.round((completed / total) * 100);
  };

  const progress = calculateProgress();
  const warmUpProgress = account.warmUp.progress;

  const getProgressColor = (value: number) => {
    if (value >= 80) return "text-green-600";
    if (value >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressIcon = (value: number) => {
    if (value >= 80) return CheckCircle;
    if (value >= 50) return Clock;
    return AlertCircle;
  };

  const ConfigIcon = getProgressIcon(progress);
  const WarmUpIcon = getProgressIcon(warmUpProgress);

  return (
    <div className="space-y-3">
      {/* Configuration Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <ConfigIcon className={cn("h-4 w-4", getProgressColor(progress))} />
            <span className="text-muted-foreground">Config</span>
          </div>
          <span className={cn("font-medium", getProgressColor(progress))}>
            {progress}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Warm-up Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <WarmUpIcon
              className={cn("h-4 w-4", getProgressColor(warmUpProgress))}
            />
            <span className="text-muted-foreground">Warm-up</span>
          </div>
          <span className={cn("font-medium", getProgressColor(warmUpProgress))}>
            {warmUpProgress}%
          </span>
        </div>
        <Progress value={warmUpProgress} className="h-2" />
      </div>

      {/* Configure Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onConfigure}
        className="mt-2 w-full text-blue-600 hover:bg-blue-50 hover:text-blue-800 dark:hover:bg-blue-950/20"
      >
        <Settings className="mr-1 h-4 w-4" />
        Configure
      </Button>
    </div>
  );
}
