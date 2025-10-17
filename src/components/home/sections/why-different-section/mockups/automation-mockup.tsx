"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";

export function AutomationMockup() {
  return (
    <Card className="overflow-hidden rounded-2xl border border-border/50 bg-background/95 shadow-2xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/95 dark:shadow-blue-500/10">
      <div className="p-6">
        <div className="mb-4 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 shadow-lg">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <h4 className="font-semibold dark:text-blue-50">
            Multichannel Smart Automation
          </h4>
        </div>
        <p className="mb-6 text-sm text-muted-foreground dark:text-blue-200">
          Create intelligent, automated sequences that adapt to your
          prospects&apos; behavior across all channels.
        </p>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium dark:text-blue-50">
              Available Channels
            </p>
            <div className="flex space-x-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-bold text-white shadow-lg"
              >
                @
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-xs font-bold text-white shadow-lg"
              >
                in
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-xs font-bold text-white shadow-lg"
              >
                📞
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-xs font-bold text-white shadow-lg"
              >
                💬
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-green-700 text-xs font-bold text-white shadow-lg"
              >
                📱
              </motion.div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium dark:text-blue-50">
              Automation Sequence
            </p>
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xs text-white shadow-lg"
              >
                1
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-xs text-white shadow-lg"
              >
                2
              </motion.div>
              <div className="text-sm text-muted-foreground dark:text-blue-200">
                Email
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
