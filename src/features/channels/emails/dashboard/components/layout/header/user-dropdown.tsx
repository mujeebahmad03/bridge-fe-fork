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
import type { UserDropdownProps } from "@/emails/dashboard/types";

const USER_EMAILS = [
  "alicia@example.com",
  "alicia2@example.com",
  "alicia3@example.com",
];

export function UserDropdown({ variant = "desktop" }: UserDropdownProps) {
  const isMobile = variant === "mobile";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="sm" className="gap-2">
            <Cloud className="h-4 w-4" />
            {!isMobile && <span className="hidden sm:inline">Alicia Koch</span>}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {USER_EMAILS.map((email) => (
          <DropdownMenuItem key={email}>{email}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
