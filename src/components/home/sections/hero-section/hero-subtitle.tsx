"use client";

import { OptimizedSection } from "@/components/ui/optimized-motion";

export function HeroSubtitle() {
  return (
    <OptimizedSection variant="fadeInUp" delay={0.2}>
      <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
        Scale multichannel outreach, manage leads in one place, and close more
        deals faster.
        <br />
        Send the right message to the right contact, and never miss a follow-up
        again.
      </p>
    </OptimizedSection>
  );
}
