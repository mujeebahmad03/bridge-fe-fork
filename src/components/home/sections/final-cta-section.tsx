"use client";

import { motion } from "framer-motion";
import { Plus, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authRoutes } from "@/config/routes";

export function FinalCtaSection() {
  const { push } = useRouter();

  return (
    <section className="relative overflow-hidden py-20">
      {/* Enhanced Dark Gradient Background */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 dark:from-purple-950 dark:via-blue-950 dark:to-slate-950" />

        {/* Additional gradient layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/50 via-transparent to-blue-800/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/30 to-purple-900/50" />

        {/* Radial gradient for center focus */}
        <div className="bg-radial-gradient absolute inset-0 from-blue-600/20 via-purple-600/10 to-transparent" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Badge
            variant="secondary"
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-sm"
          >
            <Zap className="mr-2 h-4 w-4" />
            Powerful Features
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          One simple platform to supercharge
          <br />
          outbound sales
        </motion.h2>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="min-w-[200px] rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-xl transition-all duration-300 hover:bg-primary/90 hover:shadow-2xl"
              onClick={() => push(authRoutes.signUp)}
            >
              <Plus className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
            >
              <Plus className="mr-2 h-5 w-5" />
              See Pricing
            </Button>
          </motion.div>
        </motion.div>

        {/* No Credit Card Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-sm text-white/80"
        >
          → No credit card required
        </motion.p>
      </div>
    </section>
  );
}
