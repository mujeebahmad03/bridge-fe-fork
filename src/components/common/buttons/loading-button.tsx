"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type * as React from "react";

import { Button } from "@/components/ui/button";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function LoadingButton({
  isLoading = false,
  loadingText = "Loading...",
  children,
  className,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      {...props}
      disabled={isLoading || disabled}
      className={`relative w-full bg-[#316AFF] py-6 text-white transition-colors duration-200 hover:bg-[#2857db] ${className}`}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: isLoading ? 0 : 1,
          y: isLoading ? -20 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isLoading ? 1 : 0,
          y: isLoading ? 0 : 20,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center gap-2"
      >
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>{loadingText}</span>
      </motion.div>
    </Button>
  );
}
