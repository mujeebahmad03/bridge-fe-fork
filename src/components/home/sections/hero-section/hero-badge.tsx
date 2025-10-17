"use client";

import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { OptimizedSection } from "@/components/ui/optimized-motion";

export function HeroBadge() {
  return (
    <OptimizedSection variant="fadeIn" delay={0}>
      <Badge
        variant="secondary"
        className="mb-8 rounded-full border border-primary/20 bg-background/80 px-6 py-3 text-sm font-medium text-primary shadow-lg backdrop-blur-sm"
      >
        <Plus className="mr-2 h-4 w-4" />
        Powered By AI
      </Badge>
    </OptimizedSection>
  );
}
