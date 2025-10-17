"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OptimizedSection } from "@/components/ui/optimized-motion";

export function HeroMobileCta() {
  return (
    <OptimizedSection
      variant="fadeInUp"
      delay={0.6}
      className="mb-16 lg:hidden"
    >
      <div className="rounded-3xl border border-border/50 bg-background/95 p-8 shadow-xl backdrop-blur-sm">
        <div className="text-center">
          <h3 className="mb-4 text-xl font-semibold text-foreground">
            Ready to transform your sales process?
          </h3>
          <p className="mb-6 text-muted-foreground">
            Join thousands of sales teams already using Bridge to close more
            deals.
          </p>
          <Button
            size="lg"
            className="w-full rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl sm:w-auto"
          >
            <Plus className="mr-2 h-5 w-5" />
            Start Your Free Trial
          </Button>
        </div>
      </div>
    </OptimizedSection>
  );
}
