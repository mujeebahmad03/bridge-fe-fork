"use client";

import { Footer } from "@/components/home/layout/footer";
import { Header } from "@/components/home/layout/header";
import { AIPlatformSection } from "@/components/home/sections/ai-platform-section";
import { FinalCtaSection } from "@/components/home/sections/final-cta-section";
import { HeroSection } from "@/components/home/sections/hero-section";
import { TestimonialsSection } from "@/components/home/sections/testimonials-section";
import { WhyDifferentSection } from "@/components/home/sections/why-different-section";
import {
  CriticalCSS,
  PerformanceOptimizations,
  WebVitals,
} from "@/components/home/seo";

export default function HomePage() {
  return (
    <>
      {/* SEO and Performance Optimizations */}
      <PerformanceOptimizations />
      <WebVitals />
      <CriticalCSS />

      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground transition-all duration-200 focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      {/* Main Content */}
      <div className="min-h-screen bg-background">
        <Header />

        <main id="main-content" role="main">
          {/* Hero Section with primary keywords */}
          <HeroSection />

          {/* Features Section */}
          <section id="features" aria-labelledby="features-heading">
            <h2 id="features-heading" className="sr-only">
              Platform Features and Capabilities
            </h2>
            <WhyDifferentSection />
          </section>

          {/* Social Proof Section */}
          <section id="testimonials" aria-labelledby="testimonials-heading">
            <h2 id="testimonials-heading" className="sr-only">
              Customer Testimonials and Success Stories
            </h2>
            <TestimonialsSection />
          </section>

          {/* AI Platform Section */}
          <section id="ai-platform" aria-labelledby="ai-platform-heading">
            <h2 id="ai-platform-heading" className="sr-only">
              AI-Powered Sales Features and Tools
            </h2>
            <AIPlatformSection />
          </section>

          {/* Final CTA Section */}
          <section id="get-started" aria-labelledby="cta-heading">
            <h2 id="cta-heading" className="sr-only">
              Get Started with Bridge AI Sales Platform
            </h2>
            <FinalCtaSection />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
