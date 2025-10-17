"use client";

import { motion, useTransform, useScroll } from "framer-motion";

export function HeaderLogo() {
  const { scrollYProgress } = useScroll();
  const logoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <motion.div
      style={{ scale: logoScale }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group flex cursor-pointer items-center space-x-3"
    >
      <div className="relative">
        {/* Logo background with gradient */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-blue-500 to-purple-600 opacity-75 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-lg transition-all duration-300 group-hover:shadow-xl">
          <span className="text-lg font-bold tracking-tight text-primary-foreground">
            B
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
          Bridge
        </span>
        <span className="-mt-1 text-xs font-medium text-muted-foreground">
          AI Sales Platform
        </span>
      </div>
    </motion.div>
  );
}
