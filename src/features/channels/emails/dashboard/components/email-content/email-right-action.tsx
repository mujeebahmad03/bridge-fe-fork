"use client";

import { motion } from "framer-motion";
import { Forward, MoreHorizontal, Reply, ReplyAll } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatedActionButton } from "./action-button";

export function EmailRightActions() {
  const rightActions = [
    { icon: Reply, tooltip: "Reply", delay: 0 },
    { icon: ReplyAll, tooltip: "Reply All", delay: 0.05 },
    { icon: Forward, tooltip: "Forward", delay: 0.1 },
  ];

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        {rightActions.map(({ icon, tooltip, delay }) => (
          <AnimatedActionButton
            key={tooltip}
            icon={icon}
            tooltip={tooltip}
            delay={0.4 + delay}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.55 }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="transition-all duration-200 hover:bg-muted/50 hover:shadow-sm"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="transition-colors duration-150 hover:bg-muted/50">
                Mark as read
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-colors duration-150 hover:bg-muted/50">
                Star thread
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-colors duration-150 hover:bg-muted/50">
                Add label
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-colors duration-150 hover:bg-muted/50">
                Mute thread
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </TooltipProvider>
    </div>
  );
}
