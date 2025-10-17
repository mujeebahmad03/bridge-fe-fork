"use client";

import { motion, AnimatePresence } from "framer-motion";

import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyEmailState } from "./email-state";
import { EmailLeftActions } from "./email-left-action";
import { EmailRightActions } from "./email-right-action";
import { EmailHeader } from "./email-header";
import { EmailBody } from "./email-body";

import type { Email } from "@/emails/dashboard/types";

interface AnimatedEmailContentProps {
  email: Email | null;
}

export function AnimatedEmailContent({ email }: AnimatedEmailContentProps) {
  if (!email) {
    return <EmptyEmailState />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={email.id}
        className="flex h-full flex-col bg-gradient-to-b from-card via-card to-muted/10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Email Actions Header */}
        <motion.div
          className="flex items-center justify-between border-b border-border/50 p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <EmailLeftActions />
          <EmailRightActions />
        </motion.div>

        {/* Email Content */}
        <ScrollArea className="flex-1 p-6">
          <EmailHeader email={email} />
          <EmailBody content={email.content} />
        </ScrollArea>
      </motion.div>
    </AnimatePresence>
  );
}
