"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Target, Zap, BarChart3, Check } from "lucide-react";

export function CRMDashboardMockup() {
  return (
    <Card className="overflow-hidden rounded-2xl border border-border/50 bg-background/95 shadow-2xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/95 dark:shadow-blue-500/10">
      <div className="p-6">
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-medium dark:text-blue-50">Closing</p>
            <p className="text-xs text-muted-foreground dark:text-blue-200">
              Deal completion
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-medium dark:text-blue-50">Outreach</p>
            <p className="text-xs text-muted-foreground dark:text-blue-200">
              Active campaigns
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-medium dark:text-blue-50">
              Lead Signals
            </p>
            <p className="text-xs text-muted-foreground dark:text-blue-200">
              AI insights & scoring
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
              <Check className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-medium dark:text-blue-50">Engagement</p>
            <p className="text-xs text-muted-foreground dark:text-blue-200">
              Lead responses & interactions
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="rounded-lg bg-muted/30 p-4 dark:bg-slate-800/30">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              $2.4M
            </p>
            <p className="text-sm text-muted-foreground dark:text-blue-200">
              Pipeline Value
            </p>
          </div>
          <div className="rounded-lg bg-muted/30 p-4 dark:bg-slate-800/30">
            <p className="text-3xl font-bold dark:text-blue-50">87%</p>
            <p className="text-sm text-muted-foreground dark:text-blue-200">
              Response Rate
            </p>
          </div>
          <div className="rounded-lg bg-muted/30 p-4 dark:bg-slate-800/30">
            <p className="text-3xl font-bold dark:text-blue-50">34</p>
            <p className="text-sm text-muted-foreground dark:text-blue-200">
              Active Deals
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
