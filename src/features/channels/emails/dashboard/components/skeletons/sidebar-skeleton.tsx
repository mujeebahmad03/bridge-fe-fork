"use client";

import { motion } from "framer-motion";

import { Skeleton } from "@/components/ui/skeleton";

interface SidebarSkeletonProps {
  isCollapsed?: boolean;
  itemCount?: number;
}

export function SidebarSkeleton({
  isCollapsed = false,
  itemCount = 8,
}: SidebarSkeletonProps) {
  return (
    <motion.div
      className="flex h-full flex-col border-r border-border/50 bg-gradient-to-b from-card via-card to-card/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* User Section Skeleton */}
      <div className="border-b border-border/50 p-4">
        {!isCollapsed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between rounded bg-muted/30 p-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-4" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Skeleton className="mx-auto h-8 w-8" />
          </motion.div>
        )}
      </div>

      {/* Navigation Skeleton */}
      <div className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {Array.from({ length: itemCount }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              {isCollapsed ? (
                <div className="flex justify-center px-2 py-2">
                  <Skeleton className="h-4 w-4" />
                </div>
              ) : (
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  {Math.random() > 0.5 && (
                    <Skeleton className="h-5 w-6 rounded-full" />
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
