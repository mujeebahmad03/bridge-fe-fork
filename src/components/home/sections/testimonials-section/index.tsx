"use client";

import type React from "react";

import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

import { TestimonialCard } from "./testimonial-card";
import { CarouselControls } from "./carousel-controls";
import { testimonials } from "./testimonials-data";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation
  useEffect(() => {
    if (isAutoPlaying && !isDragging) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isDragging]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    setIsAutoPlaying(false);
  }, []);

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);

      const threshold = 50;
      const velocity = Math.abs(info.velocity.x);
      const distance = Math.abs(info.offset.x);

      if (distance > threshold || velocity > 500) {
        if (info.offset.x > 0) {
          goToPrevious();
        } else {
          goToNext();
        }
      }

      setTimeout(() => setIsAutoPlaying(true), 10000);
    },
    [goToPrevious, goToNext],
  );

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-background py-20 dark:from-blue-950/20 dark:via-purple-950/15 dark:to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            <span className="text-primary dark:text-blue-400">
              How we helped
            </span>{" "}
            <span className="text-foreground dark:text-blue-50">
              sales teams
            </span>
          </h2>
          <p className="text-lg text-muted-foreground dark:text-blue-200">
            Testimonials
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative mx-auto max-w-6xl">
          {/* Testimonial Cards with Touch/Swipe Support */}
          <motion.div
            className="relative cursor-grab overflow-hidden rounded-3xl active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onContextMenu={handleContextMenu}
            whileTap={{ cursor: "grabbing" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  ...(isDragging && { duration: 0.2 }),
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <TestimonialCard
                  testimonial={testimonials[currentIndex]}
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>

            {/* Touch indicator for mobile */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:hidden">
              <div className="flex items-center space-x-2 rounded-full bg-black/20 px-3 py-1 backdrop-blur-sm">
                <div className="h-1 w-1 animate-pulse rounded-full bg-white/60" />
                <span className="text-xs text-white/80">Swipe to navigate</span>
                <div className="h-1 w-1 animate-pulse rounded-full bg-white/60" />
              </div>
            </div>
          </motion.div>

          <CarouselControls
            onPrevious={goToPrevious}
            onNext={goToNext}
            currentIndex={currentIndex}
            totalItems={testimonials.length}
            onGoToSlide={goToSlide}
          />

          {/* Auto-play Indicator */}
          <div className="mt-4 flex justify-center">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground dark:text-blue-200">
              <div
                className={`h-2 w-2 rounded-full ${isAutoPlaying && !isDragging ? "animate-pulse bg-green-500" : "bg-gray-400"}`}
              />
              <span>
                {isAutoPlaying && !isDragging
                  ? "Auto-playing"
                  : isDragging
                    ? "Swiping..."
                    : "Paused"}
              </span>
            </div>
          </div>

          {/* Mobile Navigation Hints */}
          <div className="mt-4 text-center sm:hidden">
            <p className="text-xs text-muted-foreground dark:text-blue-300">
              👆 Swipe left or right to navigate • Tap dots to jump to
              testimonial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
