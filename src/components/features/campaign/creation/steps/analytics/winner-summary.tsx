"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface WinnerSummaryProps {
  winningVariant: "A" | "B";
  reason: string;
}

export function WinnerSummary({ winningVariant, reason }: WinnerSummaryProps) {
  return (
    <Card className="relative overflow-hidden border border-slate-200/50 bg-gradient-to-r from-slate-50 via-white to-slate-50 shadow-sm dark:border-slate-700/50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/50">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 p-3 shadow-sm">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Winning Variant:
              </h3>
              <Badge className="border-0 bg-gradient-to-r from-slate-600 to-slate-700 px-3 py-1 text-white shadow-sm">
                Variant {winningVariant}
              </Badge>
            </div>
            <div className="rounded-lg border border-slate-200/30 bg-slate-100/50 p-4 dark:border-slate-700/30 dark:bg-slate-800/30">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Performance Analysis
              </p>
              <p className="leading-relaxed text-slate-900 dark:text-white">
                {reason}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
