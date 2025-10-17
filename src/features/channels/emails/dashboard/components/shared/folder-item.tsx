"use client";

import { motion, AnimatePresence } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import type { FolderItemProps } from "@/emails/dashboard/types";

export function FolderItem({
  folder,
  isActive,
  isCollapsed = false,
  onClick,
  index,
  showTooltip = false,
}: FolderItemProps) {
  const Icon = folder.icon;

  const content = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
    >
      {isCollapsed ? (
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={`h-9 w-full justify-center px-2 transition-all duration-200 ${
            isActive
              ? "scale-105 bg-primary/10 text-primary hover:bg-primary/15"
              : "text-muted-foreground hover:scale-105 hover:bg-muted/50 hover:text-foreground"
          }`}
          onClick={() => onClick(folder.id)}
        >
          <motion.div
            whileHover={{ rotate: isActive ? 0 : 5 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="h-4 w-4" />
          </motion.div>
        </Button>
      ) : (
        <motion.div
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant={isActive ? "secondary" : "ghost"}
            className={`h-9 w-full justify-between px-3 transition-all duration-200 ${
              isActive
                ? "bg-primary/10 text-primary hover:bg-primary/15"
                : "text-foreground hover:bg-muted/50"
            }`}
            onClick={() => onClick(folder.id)}
          >
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="h-4 w-4" />
              </motion.div>
              <span className="text-sm">{folder.name}</span>
            </div>
            <AnimatePresence>
              {folder.count && folder.count > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant="secondary"
                    className="h-5 bg-muted px-1.5 text-xs text-muted-foreground transition-all duration-200 hover:bg-muted/80"
                  >
                    {folder.count}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );

  if (isCollapsed && showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right">
            <p>
              {folder.name}{" "}
              {folder.count && folder.count > 0 && `(${folder.count})`}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}
