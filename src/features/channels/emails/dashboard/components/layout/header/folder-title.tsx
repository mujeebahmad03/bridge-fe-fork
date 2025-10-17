"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import type { FolderTitleProps } from "@/emails/dashboard/types";
import { useEmailListLogic } from "@/emails/dashboard/hooks/ui";

export function FolderTitle({ displayTitle, screenSize }: FolderTitleProps) {
  const isMobile = screenSize === "mobile";

  const { currentFolder } = useEmailListLogic();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {currentFolder?.icon && (
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <currentFolder.icon className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
          </motion.div>
        )}
        <motion.h1
          className={
            isMobile ? "text-lg font-semibold" : "text-xl font-semibold"
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {displayTitle}
        </motion.h1>
      </div>
      {currentFolder?.count && currentFolder.count > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <Badge variant="secondary" className="h-5 px-1.5 text-xs">
            {currentFolder.count}
          </Badge>
        </motion.div>
      )}
    </div>
  );
}
