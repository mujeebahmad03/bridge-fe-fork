"use client";

import { motion } from "framer-motion";
import { MobileContent } from "./mobile-content";

export function MobileEmailClient() {
  return (
    <motion.div
      className="flex h-screen flex-col bg-gradient-to-br from-background via-muted/20 to-muted/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <MobileContent />
    </motion.div>
  );
}
