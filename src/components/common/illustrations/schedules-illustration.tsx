"use client";

import { motion } from "framer-motion";

export default function SchedulesIllustration() {
  return (
    <div className="relative h-full w-full">
      <motion.svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        initial="hidden"
        animate="visible"
      >
        {/* Calendar background */}
        <motion.rect
          x="30"
          y="40"
          width="140"
          height="130"
          rx="8"
          fill="white"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 40, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Calendar header */}
        <motion.rect
          x="30"
          y="40"
          width="140"
          height="30"
          rx="8"
          fill="rgba(59, 130, 246, 0.8)"
          initial={{ width: 0 }}
          animate={{ width: 140 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        {/* Calendar grid */}
        <motion.g
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <line x1="50" y1="70" x2="50" y2="170" />
          <line x1="70" y1="70" x2="70" y2="170" />
          <line x1="90" y1="70" x2="90" y2="170" />
          <line x1="110" y1="70" x2="110" y2="170" />
          <line x1="130" y1="70" x2="130" y2="170" />
          <line x1="150" y1="70" x2="150" y2="170" />

          <line x1="30" y1="90" x2="170" y2="90" />
          <line x1="30" y1="110" x2="170" y2="110" />
          <line x1="30" y1="130" x2="170" y2="130" />
          <line x1="30" y1="150" x2="170" y2="150" />
        </motion.g>

        {/* Calendar events */}
        <motion.rect
          x="52"
          y="92"
          width="36"
          height="16"
          rx="4"
          fill="rgba(59, 130, 246, 0.2)"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        />

        <motion.rect
          x="92"
          y="112"
          width="36"
          height="16"
          rx="4"
          fill="rgba(59, 130, 246, 0.2)"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
        />

        <motion.rect
          x="112"
          y="152"
          width="36"
          height="16"
          rx="4"
          fill="rgba(59, 130, 246, 0.2)"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 1.2 }}
        />

        {/* Clock hands */}
        <motion.g transform="translate(100, 40) scale(0.5)">
          <motion.circle
            cx="0"
            cy="0"
            r="30"
            fill="rgba(59, 130, 246, 0.1)"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          />

          <motion.line
            x1="0"
            y1="0"
            x2="0"
            y2="-15"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          <motion.line
            x1="0"
            y1="0"
            x2="10"
            y2="0"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 60,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          <motion.circle cx="0" cy="0" r="3" fill="rgba(59, 130, 246, 0.8)" />
        </motion.g>
      </motion.svg>
    </div>
  );
}
