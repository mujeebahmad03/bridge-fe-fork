"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

export function AIPlatformHeader() {
  return (
    <div className="mb-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Badge
            variant="secondary"
            className="relative overflow-hidden rounded-full border px-6 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-sm"
            style={{
              background: "rgba(59, 130, 246, 0.1)",
              borderColor: "rgba(59, 130, 246, 0.3)",
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
                  "linear-gradient(90deg, transparent 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)",
                  "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <span className="relative z-10 flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              Powerful Features
            </span>
          </Badge>
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
        className="mb-8 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
      >
        Everything to Scale Your
        <br />
        Business
      </motion.h2>
    </div>
  );
}
