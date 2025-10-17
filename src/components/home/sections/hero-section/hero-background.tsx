"use client";

import { ParticleBackground } from "@/components/ui/particle-background";

export function HeroBackground() {
  return (
    <>
      {/* Optimized Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-purple-50/40 to-background dark:from-blue-950/30 dark:via-purple-950/20 dark:to-background" />
        <div className="absolute bottom-0 left-0 top-0 w-1/3 bg-gradient-to-r from-blue-100/40 to-transparent dark:from-blue-900/20 dark:to-transparent" />
        <div className="absolute bottom-0 right-0 top-0 w-1/3 bg-gradient-to-l from-purple-100/40 to-transparent dark:from-purple-900/20 dark:to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-50/50 via-purple-50/30 to-transparent dark:from-blue-950/25 dark:via-purple-950/15 dark:to-transparent" />
      </div>

      {/* Particle Background - Only on desktop for performance */}
      <div className="hidden lg:block">
        <ParticleBackground />
      </div>
    </>
  );
}
