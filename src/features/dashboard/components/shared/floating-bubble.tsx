"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FloatingBubbleProps {
  taskCount: number;
  onToggle: () => void;
}

export function FloatingBubble({ taskCount, onToggle }: FloatingBubbleProps) {
  const bubbleVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      y: 20,
      rotate: -10,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.4,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      y: 20,
      rotate: 10,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed bottom-6 right-6 z-50"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={onToggle}
                className="relative h-14 w-14 overflow-hidden rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
                size="sm"
              >
                <motion.div
                  className="relative"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Target className="h-6 w-6" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
                  >
                    <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-destructive p-0 text-xs text-destructive-foreground">
                      {taskCount}
                    </Badge>
                  </motion.div>
                </motion.div>

                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className="border bg-popover text-popover-foreground"
          >
            <p>View Tasks & Suggestions</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}
