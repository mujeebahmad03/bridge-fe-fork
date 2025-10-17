"use client";

import { useEffect, useState } from "react";

export function AnimatedIllustration() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute right-4 top-4 hidden h-40 w-64 lg:block">
      <div className="relative h-full w-full">
        {/* Background elements */}
        <div className="bg-illustration-background absolute inset-0 rounded-2xl opacity-50" />

        {/* Animated elements */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          {/* Person with laptop */}
          <div className="bg-illustration-secondary absolute right-8 top-6 flex h-12 w-12 animate-pulse items-center justify-center rounded-full">
            <div className="bg-illustration-primary h-4 w-6 rounded-sm" />
          </div>

          {/* Documents/charts */}
          <div className="absolute left-4 top-4 space-y-1">
            <div className="bg-illustration-accent h-1 w-8 animate-pulse rounded delay-300" />
            <div className="bg-illustration-secondary h-1 w-6 animate-pulse rounded delay-500" />
            <div className="bg-illustration-accent h-1 w-10 animate-pulse rounded delay-700" />
          </div>

          {/* Email/message icons */}
          <div className="bg-illustration-accent absolute bottom-6 left-6 h-6 w-8 animate-bounce rounded delay-1000">
            <div className="border-illustration-primary absolute left-1 top-1 h-4 w-6 rounded-sm border" />
            <div className="bg-illustration-primary absolute left-2 top-2 h-0.5 w-4" />
            <div className="bg-illustration-secondary absolute left-2 top-3 h-0.5 w-3" />
          </div>

          {/* Connection lines */}
          <div className="bg-illustration-accent absolute left-12 top-12 h-0.5 w-16 animate-pulse delay-200" />
          <div className="bg-illustration-accent delay-400 absolute right-16 top-16 h-0.5 w-12 animate-pulse" />

          {/* LinkedIn logo placeholder */}
          <div className="bg-illustration-primary delay-600 absolute bottom-4 right-4 flex h-6 w-6 animate-pulse items-center justify-center rounded-sm">
            <div className="h-3 w-3 rounded-sm bg-background" />
          </div>
        </div>
      </div>
    </div>
  );
}
