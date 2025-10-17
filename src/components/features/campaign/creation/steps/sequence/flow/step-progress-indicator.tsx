"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { CampaignStep } from "@/types/campaign";

interface StepProgressIndicatorProps {
  steps: CampaignStep[];
  currentStep: number;
  className?: string;
  onStepClick?: (index: number) => void;
}

export function StepProgressIndicator({
  steps,
  currentStep,
  className,
  onStepClick,
}: StepProgressIndicatorProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "scrollbar-hide w-full overflow-x-auto px-4 py-4",
        className,
      )}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div className="flex min-w-max items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === steps.length - 1;
          const isClickable =
            onStepClick && (isCompleted || index === currentStep + 1);

          return (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "relative flex flex-col items-center",
                  isClickable ? "cursor-pointer" : "",
                )}
                onClick={() => isClickable && onStepClick?.(index)}
              >
                {/* Pulsing background for current step */}
                {isCurrent && (
                  <motion.div
                    className="absolute -top-2 rounded-full bg-blue-500 opacity-20 dark:opacity-30"
                    initial={{ scale: 1, opacity: 0.2 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                    style={{ width: "2.5rem", height: "2.5rem" }}
                  />
                )}

                <motion.div
                  className={cn(
                    "relative flex items-center justify-center rounded-full border-2 shadow-sm transition-all duration-200",
                    isCompleted
                      ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500"
                      : isCurrent
                        ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400"
                        : "border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400",
                    "h-8 w-8",
                  )}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    y: isCurrent ? -4 : 0,
                    boxShadow: isCurrent
                      ? "0 4px 12px rgba(37, 99, 235, 0.25)"
                      : "0 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  whileHover={isClickable ? { scale: 1.05 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, opacity: 0, rotate: -45 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check
                          className={cn(
                            "text-white",
                            isMobile ? "h-4 w-4" : "h-5 w-5",
                          )}
                        />
                      </motion.div>
                    ) : (
                      <motion.span
                        key="number"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "font-medium",
                          isMobile ? "text-xs" : "text-sm",
                        )}
                      >
                        {index + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.span
                  className={cn(
                    "mt-2 text-center font-medium",
                    isMobile
                      ? "max-w-[60px] text-[10px]"
                      : "max-w-[80px] text-xs",
                    isCompleted
                      ? "text-blue-600 dark:text-blue-400"
                      : isCurrent
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-gray-500 dark:text-gray-400",
                  )}
                  initial={false}
                  animate={{
                    fontWeight: isCurrent ? 600 : isCompleted ? 500 : 400,
                  }}
                >
                  {isMobile && step.label.length > 10
                    ? `${step.label.substring(0, 8)}...`
                    : step.label}
                </motion.span>
              </div>

              {!isLast && (
                <div
                  className={cn(
                    "relative mx-1 h-[2px]",
                    isMobile ? "w-6 sm:w-8" : "w-12 sm:w-20 md:w-28",
                    "bg-gray-200 dark:bg-gray-700",
                  )}
                >
                  <motion.div
                    className="absolute inset-0 origin-left bg-blue-600 dark:bg-blue-500"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: isCompleted ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 0.1,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
