"use client";

import { motion } from "framer-motion";
import { VideoPlayer } from "@/components/ui/video-player";

export function DashboardVideoPreview() {
  return (
    <div className="relative">
      {/* Main Dashboard Video Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/95 shadow-2xl backdrop-blur-sm"
      >
        <VideoPlayer
          src="https://res.cloudinary.com/dxvdgesso/video/upload/v1750788646/dashboard_preview_ysypi0.mp4"
          className="aspect-video w-full"
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          preload="metadata"
        />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute -left-4 top-1/4 hidden lg:block"
      >
        <div className="rounded-xl border-border/50 bg-background/90 p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-medium">+24% Reply Rate</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute -right-4 top-1/2 hidden lg:block"
      >
        <div className="rounded-xl border-border/50 bg-background/90 p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="h-4 w-4 text-primary">📈</div>
            <span className="text-sm font-medium">300% More Meetings</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
