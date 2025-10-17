"use client";

import { motion } from "framer-motion";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface BulkSelectCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  indeterminate?: boolean;
  className?: string;
}

export function BulkSelectCheckbox({
  checked,
  onCheckedChange,
  indeterminate = false,
  className = "",
}: BulkSelectCheckboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn("flex items-center", className)}
    >
      <Checkbox
        checked={indeterminate ? "indeterminate" : checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
      />
    </motion.div>
  );
}
