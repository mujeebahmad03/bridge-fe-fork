"use client";

import { TrendingUp } from "lucide-react";

export function DashboardIllustration() {
  return (
    <div className="hidden flex-shrink-0 lg:block">
      <div className="flex h-32 w-48 items-center justify-center rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="text-center text-primary">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-8 w-8 text-primary-foreground" />
          </div>
          <p className="text-xs font-medium">Analytics</p>
        </div>
      </div>
    </div>
  );
}
