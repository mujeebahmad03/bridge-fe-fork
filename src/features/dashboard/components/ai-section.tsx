"use client";

import { motion, Variants } from "framer-motion";
import { AIAssistant } from "@/dashboard/components/shared";
import { itemVariants } from "@/dashboard/constants/animations";

interface AISectionProps {
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export function AISection({ isExpanded, onToggleExpanded }: AISectionProps) {
  return (
    <motion.div variants={itemVariants as Variants}>
      <AIAssistant
        isExpanded={isExpanded}
        onToggleExpanded={onToggleExpanded}
      />
    </motion.div>
  );
}
