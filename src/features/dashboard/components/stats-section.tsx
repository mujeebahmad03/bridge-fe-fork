"use client";

import { motion } from "framer-motion";
import { QuickStats } from "@/dashboard/components/shared";
import { itemVariants } from "@/dashboard/constants/animations";
import type { QuickStat } from "@/dashboard/types";

interface StatsSectionProps {
  stats: QuickStat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <motion.div variants={itemVariants}>
      <QuickStats stats={stats} />
    </motion.div>
  );
}
