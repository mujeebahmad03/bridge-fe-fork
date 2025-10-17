"use client";

import { motion } from "framer-motion";

import { Skeleton } from "@/components/ui/skeleton";

interface EmailListSkeletonProps {
  count?: number;
  layout?: "compact" | "comfortable" | "spacious";
}

export function EmailListSkeleton({
  count = 5,
  layout = "comfortable",
}: EmailListSkeletonProps) {
  const layoutClasses = {
    compact: "p-3",
    comfortable: "p-4",
    spacious: "p-6",
  };

  const skeletonSizes = {
    compact: { subject: "h-3", preview: "h-2", sender: "h-3" },
    comfortable: { subject: "h-3", preview: "h-2", sender: "h-3" },
    spacious: { subject: "h-4", preview: "h-3", sender: "h-4" },
  };

  const sizes = skeletonSizes[layout];

  return (
    <div className="divide-y divide-border/30">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={`${layoutClasses[layout]} space-y-3`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className={`${sizes.sender} w-24`} />
              <Skeleton className="h-2 w-2 rounded-full" />
            </div>
            <Skeleton className="h-2 w-16" />
          </div>

          <Skeleton className={`${sizes.subject} w-3/4`} />

          <div className="space-y-1">
            <Skeleton className={`${sizes.preview} w-full`} />
            <Skeleton className={`${sizes.preview} w-2/3`} />
          </div>

          <div className="flex gap-1">
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
