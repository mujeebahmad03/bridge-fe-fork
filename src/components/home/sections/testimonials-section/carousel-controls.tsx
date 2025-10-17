"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalItems: number;
  onGoToSlide: (index: number) => void;
}

export function CarouselControls({
  onPrevious,
  onNext,
  currentIndex,
  totalItems,
  onGoToSlide,
}: CarouselControlsProps) {
  return (
    <>
      {/* Navigation Arrows - Hidden on mobile */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 border border-border/50 bg-background/80 shadow-lg backdrop-blur-sm hover:bg-background dark:bg-slate-800/80 dark:hover:bg-slate-800 sm:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 border border-border/50 bg-background/80 shadow-lg backdrop-blur-sm hover:bg-background dark:bg-slate-800/80 dark:hover:bg-slate-800 sm:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots Indicator */}
      <div className="mt-8 flex justify-center space-x-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => onGoToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`h-3 w-3 touch-manipulation rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary shadow-lg dark:bg-blue-400"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50 dark:bg-blue-300/30 dark:hover:bg-blue-300/50"
            }`}
          />
        ))}
      </div>
    </>
  );
}
