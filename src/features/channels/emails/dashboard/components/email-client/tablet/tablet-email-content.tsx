"use client";

import { motion } from "framer-motion";

import { TabletContent } from "./tablet-content";

export function TabletEmailClient() {
  return (
    <motion.div
      className="flex h-screen flex-col bg-gradient-to-br from-background via-muted/20 to-muted/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <TabletContent />
    </motion.div>
  );
}
