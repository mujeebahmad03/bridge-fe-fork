"use client";

import { motion } from "framer-motion";

interface NavItem {
  name: string;
  href: string;
  hasDropdown: boolean;
}

interface DesktopNavProps {
  navItems: NavItem[];
  activeSection: string;
}

export function DesktopNav({ navItems, activeSection }: DesktopNavProps) {
  return (
    <nav className="hidden items-center space-x-1 lg:flex">
      {navItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative"
        >
          <a
            href={item.href}
            className={`flex items-center space-x-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-accent/50 ${
              activeSection === item.name.toLowerCase()
                ? "bg-primary/5 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{item.name}</span>
          </a>

          {/* Active indicator */}
          {activeSection === item.name.toLowerCase() && (
            <motion.div
              layoutId="activeSection"
              className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </motion.div>
      ))}
    </nav>
  );
}
