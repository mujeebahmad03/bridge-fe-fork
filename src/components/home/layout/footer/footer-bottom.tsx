"use client";

import { motion } from "framer-motion";

export function FooterBottom() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="border-t border-border/50 pt-8 dark:border-slate-700/50"
    >
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        {/* Logo and Copyright */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="h-6 w-1 rounded-full bg-primary" />
              <div className="mt-1 h-4 w-1 rounded-full bg-primary/70" />
              <div className="mt-1.5 h-3 w-1 rounded-full bg-primary/40" />
            </div>
            <span className="text-lg font-bold text-foreground dark:text-white">
              Bridge
            </span>
          </div>
          <span className="text-sm text-muted-foreground dark:text-gray-400">
            © 2025 All rights reserved.
          </span>
        </div>

        {/* Additional Links */}
        <div className="flex items-center space-x-6 text-sm text-muted-foreground dark:text-gray-400">
          <motion.a
            href="#status"
            className="transition-colors duration-200 hover:text-primary dark:hover:text-blue-400"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            Status
          </motion.a>
          <motion.a
            href="#changelog"
            className="transition-colors duration-200 hover:text-primary dark:hover:text-blue-400"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            Changelog
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
