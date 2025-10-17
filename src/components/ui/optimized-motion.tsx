"use client";

import { motion, type Variants } from "framer-motion";
import { memo, type ReactNode } from "react";

// Optimized animation variants - reused across components
export const optimizedVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
} as const;

// Optimized stagger container
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Memoized motion components for better performance
export const OptimizedMotionDiv = memo(motion.div);
export const OptimizedMotionSection = memo(motion.section);
export const OptimizedMotionH1 = memo(motion.h1);
export const OptimizedMotionH2 = memo(motion.h2);
export const OptimizedMotionP = memo(motion.p);

// Intersection Observer hook for better performance
import { useEffect, useRef, useState } from "react";

export function useInViewOnce(threshold = 0.1, rootMargin = "-50px") {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, isInView]);

  return { ref, isInView };
}

// Optimized animated section component
interface OptimizedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof optimizedVariants;
  delay?: number;
}

const OptimizedSectionComponent = ({
  children,
  className = "",
  variant = "fadeInUp",
  delay = 0,
}: OptimizedSectionProps) => {
  const { ref, isInView } = useInViewOnce();
  const animation = optimizedVariants[variant];

  return (
    <OptimizedMotionDiv
      ref={ref as React.Ref<HTMLDivElement>}
      initial={animation.initial}
      animate={isInView ? animation.animate : animation.initial}
      transition={{ ...animation.transition, delay }}
      className={className}
    >
      {children}
    </OptimizedMotionDiv>
  );
};

OptimizedSectionComponent.displayName = "OptimizedSection";

export const OptimizedSection = memo(OptimizedSectionComponent);
