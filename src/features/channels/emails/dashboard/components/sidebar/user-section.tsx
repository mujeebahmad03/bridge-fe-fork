"use client";

import { motion } from "framer-motion";
import { ChevronDown, Cloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SheetTitle } from "@/components/ui/sheet";
import type { UserSectionProps } from "@/emails/dashboard/types";

const USER_EMAILS = [
  "alicia@example.com",
  "alicia2@example.com",
  "alicia3@example.com",
];

export function UserSection({
  isCollapsed,
  isLoading,
  isMobileOrTablet,
}: UserSectionProps) {
  if (isLoading) {
    return (
      <motion.div
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="h-10 animate-pulse rounded bg-muted/50" />
      </motion.div>
    );
  }

  if (isCollapsed) {
    return (
      <motion.div
        key="collapsed"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="ghost"
          size="sm"
          className="w-full bg-muted/30 p-2 transition-all duration-200 hover:scale-110 hover:bg-muted/50"
        >
          <motion.div
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="expanded"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-auto w-full justify-between bg-muted/30 p-3 text-foreground transition-all duration-200 hover:scale-[1.02] hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Cloud className="h-5 w-5 text-muted-foreground" />
              </motion.div>
              <div className="text-left">
                {isMobileOrTablet ? (
                  <SheetTitle className="text-sm font-medium text-foreground">
                    Alicia Koch
                  </SheetTitle>
                ) : (
                  <span className="font-medium text-foreground">
                    Alicia Koch
                  </span>
                )}
                {isMobileOrTablet && (
                  <p className="text-xs text-muted-foreground">
                    alicia@example.com
                  </p>
                )}
              </div>
            </div>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className={isMobileOrTablet ? "w-72" : "w-56"}
        >
          {USER_EMAILS.map((email) => (
            <DropdownMenuItem key={email} className="text-foreground">
              {email}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}
