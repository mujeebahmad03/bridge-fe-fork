"use client";

import { AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DeliverabilityMetrics } from "@/types/deliverability";

interface FeedbackComplaintsCardProps {
  metrics: DeliverabilityMetrics;
  className?: string;
}

export function FeedbackComplaintsCard({
  metrics,
  className,
}: FeedbackComplaintsCardProps) {
  const complaintRate = (metrics.complaints / metrics.totalEmailsSent) * 100;

  return (
    <Card className={`relative overflow-hidden shadow-lg ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
      <CardHeader className="relative z-10 text-white">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Feedback and Complaints
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4 text-white">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="text-sm opacity-90">Last 30 Days</div>
            <div className="text-lg font-semibold">
              Spam Complaints: {metrics.complaints} Complaints
            </div>
          </div>
          <div>
            <div className="text-sm opacity-90">Average Complaint Rate</div>
            <div className="flex items-center gap-2">
              <Badge className="border-white/30 bg-white/20 text-white">
                {complaintRate.toFixed(1)}% of Total Emails Sent
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-white/60" />
            <span className="text-sm opacity-90">
              {complaintRate.toFixed(1)}%
            </span>
          </div>
          <span className="text-sm opacity-75">This Last Week</span>
        </div>
      </CardContent>
    </Card>
  );
}
