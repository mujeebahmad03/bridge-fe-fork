"use client";

import { motion, Variants } from "framer-motion";
import { QuickStats } from "@/dashboard/components/shared";
import { itemVariants } from "@/dashboard/constants/animations";
import type { QuickStat } from "@/dashboard/types";

interface StatsSectionProps {
  stats: QuickStat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <motion.div variants={itemVariants as Variants}>
      <QuickStats stats={stats} />
    </motion.div>
  );
}
