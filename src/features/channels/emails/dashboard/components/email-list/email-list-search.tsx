"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type React from "react";

import { Input } from "@/components/ui/input";
import { useEmailListLogic } from "@/emails/dashboard/hooks/ui";

interface EmailListSearchProps {
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export const EmailListSearch = ({ searchInputRef }: EmailListSearchProps) => {
  const { currentFolder, searchQuery, onSearchChange } = useEmailListLogic();

  if (!onSearchChange) return null;

  return (
    <motion.div
      className="border-b border-border/50 bg-gradient-to-r from-muted/30 via-muted/20 to-muted/10 p-4"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="group relative">
        <motion.div
          className="absolute left-3 top-1/2 -translate-y-1/2 transform"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <Search className="h-4 w-4 text-muted-foreground transition-colors duration-200 group-focus-within:text-primary" />
        </motion.div>
        <Input
          ref={searchInputRef}
          placeholder={`Search in ${currentFolder?.name || "Inbox"}`}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-muted-foreground/20 bg-background/50 pl-9 transition-all duration-200 focus:border-primary/50 focus:bg-background focus:shadow-sm"
        />
      </div>
    </motion.div>
  );
};
