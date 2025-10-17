"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export function WhyDifferentHeader() {
  return (
    <div className="container mx-auto mb-20 px-4 text-center sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <Badge
          variant="secondary"
          className="rounded-full border border-primary/20 bg-background/80 px-6 py-3 text-sm font-medium text-primary shadow-lg backdrop-blur-sm dark:border-blue-400/20 dark:bg-slate-800/80 dark:text-blue-400"
        >
          <Plus className="mr-2 h-4 w-4" />
          Why we are Different
        </Badge>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
        className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl"
      >
        <span className="text-primary dark:text-blue-400">
          Your outbound sales process,
        </span>
        <br />
        <span className="text-foreground dark:text-blue-50">fully in sync</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl text-xl leading-relaxed text-muted-foreground dark:text-blue-200"
      >
        Bridge brings your entire outbound process into focus from{" "}
        <span className="font-semibold text-primary dark:text-blue-400">
          outreach to close.
        </span>
      </motion.p>
    </div>
  );
}
