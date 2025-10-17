"use client";

import { motion } from "framer-motion";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Email } from "@/emails/dashboard/types";

interface EmailHeaderProps {
  email: Email;
}

export function EmailHeader({ email }: EmailHeaderProps) {
  const initials = email.sender
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-start gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <Avatar className="h-10 w-10 bg-primary/10">
            <AvatarFallback className="bg-primary/20 font-medium text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <motion.h2
              className="font-semibold"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              {email.sender}
            </motion.h2>
            <motion.span
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              {email.time}
            </motion.span>
          </div>

          <motion.p
            className="text-sm font-medium"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            {email.subject}
          </motion.p>

          {email.replyTo && (
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              Reply-To: {email.replyTo}
            </motion.p>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.55 }}
      >
        <Separator className="opacity-30" />
      </motion.div>
    </motion.div>
  );
}
