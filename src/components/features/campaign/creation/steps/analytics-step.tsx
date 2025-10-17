/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { AnalyticsIllustration } from "@/components/common/illustrations";
import AnalyticsDashboard from "./analytics";

interface AnalyticsStepProps {
  onComplete: () => void;
  onBack: () => void;
  updateFormData: (data: any) => void;
}

export function AnalyticsStep({
  onComplete,
  onBack,
  updateFormData,
}: AnalyticsStepProps) {
  const handleSubmit = () => {
    updateFormData({
      trackOpens: true,
      trackClicks: true,
      trackReplies: true,
      // Additional analytics settings would be collected here
    });
    onComplete();
  };

  return (
    <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Analytics</h2>
          <p className="text-muted-foreground">
            Configure analytics for your campaign
          </p>
        </div>
        <div className="flex justify-center lg:w-1/3">
          <AnalyticsIllustration />
        </div>
      </div>

      <AnalyticsDashboard />

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={handleSubmit}>Complete Setup</Button>
      </div>
    </div>
  );
}
