"use client";

import { motion } from "framer-motion";

export default function TrackingIllustration() {
  return (
    <div className="relative h-full w-full">
      <motion.svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        initial="hidden"
        animate="visible"
      >
        {/* Background */}
        <motion.rect
          x="20"
          y="20"
          width="160"
          height="160"
          rx="10"
          fill="rgba(59, 130, 246, 0.1)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Grid lines */}
        <motion.g
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <line x1="20" y1="60" x2="180" y2="60" />
          <line x1="20" y1="100" x2="180" y2="100" />
          <line x1="20" y1="140" x2="180" y2="140" />
          <line x1="60" y1="20" x2="60" y2="180" />
          <line x1="100" y1="20" x2="100" y2="180" />
          <line x1="140" y1="20" x2="140" y2="180" />
        </motion.g>

        {/* Chart line */}
        <motion.path
          d="M40,140 C60,100 80,120 100,80 C120,40 140,60 160,40"
          fill="none"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Data points */}
        {[
          { cx: 40, cy: 140 },
          { cx: 60, cy: 100 },
          { cx: 80, cy: 120 },
          { cx: 100, cy: 80 },
          { cx: 120, cy: 40 },
          { cx: 140, cy: 60 },
          { cx: 160, cy: 40 },
        ].map((point, index) => (
          <motion.circle
            key={index}
            cx={point.cx}
            cy={point.cy}
            r="6"
            fill="white"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
          />
        ))}

        {/* Animated pulse */}
        <motion.circle
          cx="100"
          cy="80"
          r="15"
          fill="rgba(59, 130, 246, 0.3)"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 0.5,
          }}
        />
      </motion.svg>
    </div>
  );
}
