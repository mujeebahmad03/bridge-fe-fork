"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ActionButtonProps } from "@/emails/dashboard/types";

export function ActionButton({
  icon: Icon,
  tooltip,
  onClick,
  variant = "ghost",
  size = "sm",
  className = "",
  disabled = false,
  animationDelay = 0,
}: ActionButtonProps) {
  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: animationDelay }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant={variant}
                size={size}
                onClick={onClick}
                disabled={disabled}
                className={`transition-all duration-200 hover:bg-muted/50 hover:shadow-sm ${className}`}
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
    </TooltipProvider>
  );
}
