"use client";

import type React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  mockup: React.ReactNode;
  reverse?: boolean;
  darkBg?: boolean;
}

export function FeatureCard({
  icon,
  title,
  description,
  features,
  mockup,
  reverse = false,
  darkBg = false,
}: FeatureCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <div
      className={`relative overflow-hidden py-20 ${
        darkBg
          ? "bg-gradient-to-br from-slate-900 via-blue-900/90 to-purple-900 text-white dark:from-slate-950 dark:via-blue-950 dark:to-purple-950"
          : "bg-gradient-to-br from-blue-50/60 via-purple-50/40 to-background dark:from-blue-950/20 dark:via-purple-950/15 dark:to-background"
      }`}
    >
      {/* Background Effects */}
      {darkBg && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-purple-500/10" />
          <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-blue-500/10 to-transparent" />
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-purple-500/10 to-transparent" />
        </>
      )}

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${reverse ? "lg:grid-flow-col-dense" : ""}`}
        >
          {/* Content */}
          <motion.div
            ref={ref}
            initial={reverse ? fadeInRight.initial : fadeInLeft.initial}
            animate={
              isInView
                ? reverse
                  ? fadeInRight.animate
                  : fadeInLeft.animate
                : reverse
                  ? fadeInRight.initial
                  : fadeInLeft.initial
            }
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={reverse ? "lg:col-start-2" : ""}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg ${
                darkBg
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500"
                  : "bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800"
              }`}
            >
              <div className="text-white">{icon}</div>
            </motion.div>

            <h3
              className={`mb-6 text-3xl font-bold sm:text-4xl ${
                darkBg
                  ? "text-white dark:text-blue-50"
                  : "text-foreground dark:text-blue-50"
              }`}
            >
              {title}
            </h3>

            <p
              className={`mb-8 text-lg leading-relaxed ${
                darkBg
                  ? "text-blue-100 dark:text-blue-200"
                  : "text-muted-foreground dark:text-blue-100"
              }`}
            >
              {description}
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex items-start space-x-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg shadow-md ${
                      darkBg
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500"
                        : "bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800"
                    }`}
                  >
                    <Check className="h-3 w-3 text-white" />
                  </motion.div>
                  <p
                    className={`transition-transform duration-200 group-hover:translate-x-1 ${
                      darkBg
                        ? "text-blue-100 dark:text-blue-200"
                        : "text-muted-foreground dark:text-blue-100"
                    }`}
                  >
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mockup */}
          <motion.div
            initial={reverse ? fadeInLeft.initial : fadeInRight.initial}
            animate={
              isInView
                ? reverse
                  ? fadeInLeft.animate
                  : fadeInRight.animate
                : reverse
                  ? fadeInLeft.initial
                  : fadeInRight.initial
            }
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={reverse ? "lg:col-start-1" : ""}
          >
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {mockup}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
