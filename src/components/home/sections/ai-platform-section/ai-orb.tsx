"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export function AIOrb() {
  const orbRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative hidden lg:block">
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)",
          width: "200px",
          height: "200px",
          left: "-50px",
          top: "-50px",
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [1.1, 1.3, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 70%)",
          width: "240px",
          height: "240px",
          left: "-70px",
          top: "-70px",
        }}
      />

      {/* Main AI Orb */}
      <motion.div
        ref={orbRef}
        className="relative flex h-24 w-24 items-center justify-center rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%)",
          boxShadow: `
            0 0 30px rgba(59, 130, 246, 0.6),
            0 0 60px rgba(147, 51, 234, 0.4),
            inset 0 0 20px rgba(255, 255, 255, 0.2)
          `,
        }}
        animate={{
          boxShadow: [
            "0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(147, 51, 234, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)",
            "0 0 40px rgba(147, 51, 234, 0.8), 0 0 80px rgba(59, 130, 246, 0.6), inset 0 0 25px rgba(255, 255, 255, 0.3)",
            "0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(147, 51, 234, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.3 },
        }}
      >
        <span className="text-xl font-bold tracking-wider text-white">AI</span>
      </motion.div>
    </div>
  );
}
