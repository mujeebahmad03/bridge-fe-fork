"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function AIDraftingMockup() {
  return (
    <Card className="overflow-hidden rounded-2xl border border-border/50 bg-background/95 shadow-2xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/95 dark:shadow-blue-500/10">
      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Profile */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground dark:text-blue-50">
              Contact Profile
            </h4>
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 font-bold text-white shadow-lg"
              >
                SC
              </motion.div>
              <div>
                <p className="font-semibold dark:text-blue-50">Sarah Chen</p>
                <p className="text-sm text-muted-foreground dark:text-blue-200">
                  Head of Sustainability
                </p>
                <p className="text-sm text-muted-foreground dark:text-blue-200">
                  San Francisco, CA
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted/50 p-3 text-center dark:bg-slate-800/50">
                <p className="text-2xl font-bold dark:text-blue-50">847</p>
                <p className="text-sm text-muted-foreground dark:text-blue-200">
                  Connections
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-center dark:bg-slate-800/50">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  85%
                </p>
                <p className="text-sm text-muted-foreground dark:text-blue-200">
                  Match
                </p>
              </div>
            </div>
          </div>

          {/* AI Message Composer */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary dark:text-blue-400" />
              <h4 className="font-semibold text-primary dark:text-blue-400">
                AI Message Composer
              </h4>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 dark:bg-slate-800/50">
              <p className="mb-2 text-sm text-muted-foreground dark:text-blue-200">
                Select a prompt above to generate AI-powered message
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary dark:bg-blue-500/20 dark:text-blue-300">
                  Make it more casual
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary dark:bg-blue-500/20 dark:text-blue-300">
                  Make it more persuasive
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary dark:bg-blue-500/20 dark:text-blue-300">
                  Shorten
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary dark:bg-blue-500/20 dark:text-blue-300">
                  Add personalization
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
