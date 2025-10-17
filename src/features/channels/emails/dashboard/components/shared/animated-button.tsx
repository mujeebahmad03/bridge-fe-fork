"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import type { HeaderActionButtonProps } from "@/emails/dashboard/types";

export function AnimatedButton({
  onClick,
  children,
  size = "sm",
  ...props
}: HeaderActionButtonProps & React.ComponentProps<typeof Button>) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button variant="ghost" size={size} onClick={onClick} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}
