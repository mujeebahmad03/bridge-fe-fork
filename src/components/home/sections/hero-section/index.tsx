"use client";

import { OptimizedSection } from "@/components/ui/optimized-motion";
import { HeroBackground } from "./hero-background";
import { HeroBadge } from "./hero-badge";
import { HeroHeadline } from "./hero-headline";
import { HeroSubtitle } from "./hero-subtitle";
import { HeroCtaButtons } from "./hero-cta-buttons";
import { HeroMobileCta } from "./hero-mobile-cta";
import { SocialProofScroll } from "./social-proof-scroll";
import { DashboardVideoPreview } from "./dashboard-preview";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pb-20 pt-24 sm:pb-24 sm:pt-32 lg:pb-32 lg:pt-40">
      <HeroBackground />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <HeroBadge />
          <HeroHeadline />
          <HeroSubtitle />
          <HeroCtaButtons />

          {/* No Credit Card Text */}
          <OptimizedSection variant="fadeIn" delay={0.4}>
            <p className="mb-16 text-sm text-muted-foreground">
              → No credit card required
            </p>
          </OptimizedSection>

          {/* Dashboard Preview - Hidden on mobile for performance */}
          <OptimizedSection
            variant="scaleIn"
            delay={0.5}
            className="hidden lg:block"
          >
            <div className="relative mx-auto mb-20 max-w-6xl">
              <DashboardVideoPreview />
            </div>
          </OptimizedSection>

          <HeroMobileCta />
          <SocialProofScroll />
        </div>
      </div>
    </section>
  );
}
