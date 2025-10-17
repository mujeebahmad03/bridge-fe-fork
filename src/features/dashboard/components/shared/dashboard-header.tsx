"use client";

import { motion } from "framer-motion";

import { PanelToggleButton } from "./panel-toggle-button";

interface DashboardHeaderProps {
  onToggleFloatingMode: () => void;
  isFloatingMode: boolean;
}

export function DashboardHeader({
  onToggleFloatingMode,
  isFloatingMode,
}: DashboardHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between space-x-2">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome Stephen
          </h1>
          <PanelToggleButton
            isFloatingMode={isFloatingMode}
            onToggleFloatingMode={onToggleFloatingMode}
          />
        </div>
      </div>
    </motion.header>
  );
}
