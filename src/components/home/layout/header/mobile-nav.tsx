"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  href: string;
  hasDropdown: boolean;
}

interface MobileNavProps {
  navItems: NavItem[];
  activeSection: string;
  onClose: () => void;
}

export function MobileNav({
  navItems,
  activeSection,
  onClose,
}: MobileNavProps) {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Mobile Navigation Links */}
      <nav className="mb-6 space-y-1">
        {navItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <a
              href={item.href}
              className={`group flex items-center justify-between rounded-xl p-3 text-base font-medium transition-all duration-200 hover:bg-accent/50 ${
                activeSection === item.name.toLowerCase()
                  ? "bg-primary/5 text-primary"
                  : "text-foreground"
              }`}
              onClick={onClose}
            >
              <span>{item.name}</span>
            </a>
          </motion.div>
        ))}
      </nav>

      {/* Mobile Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="space-y-3 border-t border-border/50 pt-4"
      >
        <Button
          variant="outline"
          className="w-full justify-center font-medium"
          onClick={onClose}
        >
          Login
        </Button>
        <Button
          className="group w-full justify-center bg-gradient-to-r from-primary to-blue-600 font-semibold text-primary-foreground shadow-lg hover:from-primary/90 hover:to-blue-600/90"
          onClick={onClose}
        >
          <Sparkles className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          Try For Free
        </Button>
      </motion.div>

      {/* Mobile Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="mt-6 border-t border-border/50 pt-4 text-center"
      >
        <p className="text-xs text-muted-foreground">
          Join 500+ sales teams using Bridge
        </p>
      </motion.div>
    </div>
  );
}
