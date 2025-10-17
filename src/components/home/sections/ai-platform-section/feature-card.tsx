"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

import { Card } from "@/components/ui/card";

export function FeatureCard({
  icon,
  title,
  description,
  position,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  position: string;
  delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`${position} w-72 lg:w-80`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          rotateY: 5,
          rotateX: 5,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <Card
          className="group relative overflow-hidden border border-blue-500/30 p-6 shadow-2xl backdrop-blur-xl"
          style={{
            background: isHovered
              ? "rgba(30, 41, 59, 0.9)"
              : "rgba(30, 41, 59, 0.7)",
            boxShadow: isHovered
              ? "0 0 40px rgba(59, 130, 246, 0.3), 0 20px 40px rgba(0, 0, 0, 0.3)"
              : "0 0 20px rgba(59, 130, 246, 0.2), 0 10px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Card glow effect */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            animate={{
              background: isHovered
                ? "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)"
                : "transparent",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start space-x-4">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
                className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  boxShadow: isHovered
                    ? "0 0 20px rgba(59, 130, 246, 0.6)"
                    : "0 0 10px rgba(59, 130, 246, 0.4)",
                }}
              >
                <div className="text-white">{icon}</div>

                {/* Icon glow pulse */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(59, 130, 246, 0.4)",
                      "0 0 20px rgba(147, 51, 234, 0.6)",
                      "0 0 10px rgba(59, 130, 246, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <div className="flex-1">
                <motion.h4
                  className="mb-3 text-lg font-bold text-white"
                  animate={{
                    color: isHovered ? "#60a5fa" : "#ffffff",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {title}
                </motion.h4>
                <p className="text-sm leading-relaxed text-blue-200">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Hover border glow */}
          <motion.div
            className="absolute inset-0 rounded-lg border-2"
            style={{
              borderColor: isHovered
                ? "rgba(59, 130, 246, 0.5)"
                : "transparent",
            }}
            transition={{ duration: 0.3 }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}
