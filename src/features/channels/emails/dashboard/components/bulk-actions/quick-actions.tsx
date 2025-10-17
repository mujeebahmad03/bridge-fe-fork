"use client";

import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ActionItem } from "@/emails/dashboard/types";
import { useEmailStore } from "@/emails/dashboard/stores";

interface QuickActionsProps {
  actions: ActionItem[];
  maxVisible?: number;
}

export function QuickActions({ actions, maxVisible = 4 }: QuickActionsProps) {
  const visibleActions = actions.slice(0, maxVisible);
  const { selectedEmails } = useEmailStore(
    useShallow((state) => ({
      selectedEmails: state.selectedEmails,
      isSelectionMode: state.isSelectionMode,
    })),
  );

  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        {visibleActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={action.variant || "ghost"}
                    size="sm"
                    onClick={() => action.action(Array.from(selectedEmails))}
                    className="h-8 w-8 p-0"
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{action.label}</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
