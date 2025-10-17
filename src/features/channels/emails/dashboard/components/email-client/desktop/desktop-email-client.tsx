"use client";

import { motion } from "framer-motion";
import { DesktopContent } from "./desktop-content";

export function DesktopEmailClient() {
  return (
    <motion.div
      className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-background via-muted/20 to-muted/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <DesktopContent />
    </motion.div>
  );
}
