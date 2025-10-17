"use client";

import { motion } from "framer-motion";

export default function GeneralSettingsIllustration() {
  return (
    <div className="relative h-full w-full">
      <motion.svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        initial="hidden"
        animate="visible"
      >
        {/* Background circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          fill="rgba(59, 130, 246, 0.1)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Gear outer */}
        <motion.path
          d="M100,40 L108,40 L112,55 C117,56 122,58 126,61 L140,53 L146,59 L138,73 C141,77 143,82 144,87 L159,91 L159,99 L144,103 C143,108 141,113 138,117 L146,131 L140,137 L126,129 C122,132 117,134 112,135 L108,150 L100,150 L96,135 C91,134 86,132 82,129 L68,137 L62,131 L70,117 C67,113 65,108 64,103 L49,99 L49,91 L64,87 C65,82 67,77 70,73 L62,59 L68,53 L82,61 C86,58 91,56 96,55 L100,40 Z"
          fill="rgba(59, 130, 246, 0.2)"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Gear inner */}
        <motion.circle
          cx="100"
          cy="95"
          r="25"
          fill="rgba(59, 130, 246, 0.3)"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Small gears */}
        <motion.circle
          cx="140"
          cy="70"
          r="15"
          fill="rgba(59, 130, 246, 0.2)"
          stroke="rgba(59, 130, 246, 0.6)"
          strokeWidth="2"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <motion.circle
          cx="60"
          cy="130"
          r="15"
          fill="rgba(59, 130, 246, 0.2)"
          stroke="rgba(59, 130, 246, 0.6)"
          strokeWidth="2"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Center dot */}
        <motion.circle
          cx="100"
          cy="95"
          r="8"
          fill="rgba(59, 130, 246, 0.8)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
      </motion.svg>
    </div>
  );
}
