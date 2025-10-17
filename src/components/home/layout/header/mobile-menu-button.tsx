"use client";

import { motion } from "framer-motion";

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({
  isMenuOpen,
  onClick,
}: MobileMenuButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="relative ml-2 rounded-lg p-2 transition-colors duration-200 hover:bg-accent lg:hidden"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <div className="relative h-6 w-6">
        <motion.div
          animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 top-1 h-0.5 w-6 rounded-full bg-foreground"
        />
        <motion.div
          animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 top-3 h-0.5 w-6 rounded-full bg-foreground"
        />
        <motion.div
          animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 top-5 h-0.5 w-6 rounded-full bg-foreground"
        />
      </div>
    </motion.button>
  );
}
