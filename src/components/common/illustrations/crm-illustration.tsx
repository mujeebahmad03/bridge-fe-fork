"use client";

import { motion } from "framer-motion";

export default function CRMIllustration() {
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

        {/* People connections */}
        <motion.g>
          {/* Central node */}
          <motion.circle
            cx="100"
            cy="100"
            r="20"
            fill="rgba(59, 130, 246, 0.8)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          {/* Outer nodes */}
          {[
            { cx: 50, cy: 60, delay: 0.4 },
            { cx: 150, cy: 60, delay: 0.5 },
            { cx: 60, cy: 150, delay: 0.6 },
            { cx: 140, cy: 150, delay: 0.7 },
            { cx: 40, cy: 100, delay: 0.8 },
            { cx: 160, cy: 100, delay: 0.9 },
          ].map((node, index) => (
            <motion.g key={index}>
              <motion.line
                x1="100"
                y1="100"
                x2={node.cx}
                y2={node.cy}
                stroke="rgba(59, 130, 246, 0.4)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: node.delay }}
              />
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r="12"
                fill="rgba(59, 130, 246, 0.2)"
                stroke="rgba(59, 130, 246, 0.6)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: node.delay + 0.2 }}
              />
            </motion.g>
          ))}

          {/* Animated pulses */}
          <motion.circle
            cx="100"
            cy="100"
            r="20"
            fill="rgba(59, 130, 246, 0.3)"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
          />

          {/* Person icons */}
          <motion.path
            d="M100,90 C100,85 105,80 110,85 C115,90 110,95 100,95 C90,95 85,90 90,85 C95,80 100,85 100,90 Z"
            fill="white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
          />
          <motion.circle
            cx="100"
            cy="85"
            r="5"
            fill="white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
          />

          {/* Data flow animations */}
          {[
            { x1: 100, y1: 100, x2: 50, y2: 60, delay: 1.2 },
            { x1: 100, y1: 100, x2: 150, y2: 60, delay: 1.5 },
            { x1: 100, y1: 100, x2: 60, y2: 150, delay: 1.8 },
            { x1: 100, y1: 100, x2: 140, y2: 150, delay: 2.1 },
          ].map((path, index) => (
            <motion.circle
              key={index}
              cx={path.x1}
              cy={path.y1}
              r="3"
              fill="white"
              initial={{
                x: path.x1,
                y: path.y1,
                opacity: 0,
              }}
              animate={{
                x: path.x2,
                y: path.y2,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: path.delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            />
          ))}
        </motion.g>
      </motion.svg>
    </div>
  );
}
