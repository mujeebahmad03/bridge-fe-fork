"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Reusable animated button component
interface AnimatedActionButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  tooltip: string;
  delay?: number;
  onClick?: () => void;
}

export function AnimatedActionButton({
  icon: Icon,
  tooltip,
  delay = 0,
  onClick,
}: AnimatedActionButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="transition-all duration-200 hover:bg-muted/50 hover:shadow-sm"
              onClick={onClick}
            >
              <Icon className="h-4 w-4" />
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
}
