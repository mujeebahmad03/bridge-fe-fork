"use client";

import { Plus, WandSparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { OptimizedSection } from "@/components/ui/optimized-motion";
import { authRoutes } from "@/config/routes";

export function HeroCtaButtons() {
  const { push } = useRouter();

  return (
    <OptimizedSection variant="fadeInUp" delay={0.3}>
      <div className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          size="lg"
          className="group rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl"
          onClick={() => push(authRoutes.signUp)}
        >
          <WandSparkles className="mr-2 h-5 w-5" />
          Get Started Free
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="group rounded-full border-2 px-8 py-3 text-lg font-semibold hover:bg-accent"
          onClick={() => push(authRoutes.signUp)}
        >
          <Plus className="mr-2 h-5 w-5" />
          See Pricing
        </Button>
      </div>
    </OptimizedSection>
  );
}
