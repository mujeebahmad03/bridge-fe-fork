"use client";

import { motion } from "framer-motion";
import { CompanyList } from "./social-proof-companies";
import { OptimizedSection } from "@/components/ui/optimized-motion";

export function SocialProofScroll() {
  return (
    <OptimizedSection variant="fadeInUp" delay={0.7}>
      <div className="mt-16 overflow-hidden rounded-3xl border border-border/50 bg-background/95 p-8 shadow-xl backdrop-blur-sm sm:p-12">
        <div className="mb-8 text-center">
          <p className="text-lg font-semibold text-primary sm:text-xl">
            Used By <span className="font-bold">500+</span> Sales Team
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-background/95 to-transparent" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-background/95 to-transparent" />

          <motion.div
            className="flex"
            animate={{ x: [0, -50] }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <CompanyList keyPrefix="first" />
            <div className="ml-8 sm:ml-12 lg:ml-16">
              <CompanyList keyPrefix="second" />
            </div>
          </motion.div>
        </div>
      </div>
    </OptimizedSection>
  );
}
