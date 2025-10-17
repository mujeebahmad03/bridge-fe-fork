"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { VideoPlayer } from "@/components/ui/video-player";

export function RealtimeSignalMockup() {
  return (
    <Card className="overflow-hidden rounded-2xl border border-border/50 bg-background/95 shadow-2xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/95 dark:shadow-blue-500/10">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-semibold dark:text-blue-50">
            Real-Time Signal Dashboard
          </h4>
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="h-2 w-2 rounded-full bg-green-500"
            />
            <span className="text-xs text-muted-foreground dark:text-blue-200">
              Live
            </span>
          </div>
        </div>

        <p className="mb-6 text-sm text-muted-foreground dark:text-blue-200">
          See lead activity across all touchpoints in real-time
        </p>

        {/* Video Container */}
        <div className="relative overflow-hidden rounded-lg bg-muted/30 dark:bg-slate-800/30">
          <VideoPlayer
            src="https://res.cloudinary.com/dxvdgesso/video/upload/v1750788795/realtime_signal_qxwdei.mp4"
            className="aspect-video w-full"
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            preload="metadata"
          />

          {/* Overlay with subtle branding */}
          <div className="absolute right-2 top-2 rounded bg-black/20 px-2 py-1 backdrop-blur-sm">
            <span className="text-xs text-white/80">Live Dashboard</span>
          </div>
        </div>

        {/* Additional context below video */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-lg bg-muted/50 p-3 dark:bg-slate-800/50"
          >
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <span className="text-xs text-white">📧</span>
            </div>
            <p className="text-sm font-medium dark:text-blue-50">
              Email Tracking
            </p>
            <p className="text-xs text-muted-foreground dark:text-blue-200">
              Real-time opens
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-lg bg-muted/50 p-3 dark:bg-slate-800/50"
          >
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
              <span className="text-xs text-white">🌐</span>
            </div>
            <p className="text-sm font-medium dark:text-blue-50">
              Website Visits
            </p>
            <p className="text-xs text-muted-foreground dark:text-blue-200">
              Live activity
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-lg bg-muted/50 p-3 dark:bg-slate-800/50"
          >
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
              <span className="text-xs text-white">🔗</span>
            </div>
            <p className="text-sm font-medium dark:text-blue-50">Link Clicks</p>
            <p className="text-xs text-muted-foreground dark:text-blue-200">
              Instant alerts
            </p>
          </motion.div>
        </div>
      </div>
    </Card>
  );
}
