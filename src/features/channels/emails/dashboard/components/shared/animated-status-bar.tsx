"use client";

import { motion, AnimatePresence } from "framer-motion";

import { Badge } from "@/components/ui/badge";

import type { Email } from "@/emails/dashboard/types";

interface AnimatedStatusBarProps {
  selectedEmail: Email | null;
  totalEmails: number;
  currentIndex: number;
}

export function AnimatedStatusBar({
  selectedEmail,
  totalEmails,
  currentIndex,
}: AnimatedStatusBarProps) {
  if (!selectedEmail || totalEmails === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-4 py-2 text-xs text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <motion.span
            key={`${currentIndex}-${totalEmails}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {currentIndex + 1} of {totalEmails}
          </motion.span>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Badge
              variant="outline"
              className="text-xs transition-all duration-200 hover:bg-muted/50"
            >
              Press ? for shortcuts
            </Badge>
          </motion.div>
        </div>
        <div className="flex items-center gap-4">
          {["j/k: navigate", "r: reply", "e: archive"].map(
            (shortcut, index) => (
              <motion.span
                key={shortcut}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className="transition-colors duration-200 hover:text-foreground"
              >
                {shortcut}
              </motion.span>
            ),
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
