"use client";

import { Plus, Mail, Phone, BarChart3, Linkedin } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TopographicBackground } from "./topography-background";
import { AnimatedGlow } from "./animated-glow";
import { FeatureCard } from "./feature-card";
import { AIOrb } from "./ai-orb";

export interface MousePosition {
  x: number;
  y: number;
}

export function AIPlatformSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-4 overflow-hidden rounded-[48px] py-20 sm:mx-6 lg:mx-8"
      style={{
        background:
          "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)",
      }}
    >
      {/* Topographic Background */}
      <TopographicBackground />

      {/* Animated Glow Effects */}
      <AnimatedGlow mousePosition={mousePosition} />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Badge
                variant="secondary"
                className="relative overflow-hidden rounded-full border px-6 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-sm"
                style={{
                  background: "rgba(59, 130, 246, 0.1)",
                  borderColor: "rgba(59, 130, 246, 0.3)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
                      "linear-gradient(90deg, transparent 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)",
                      "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative z-10 flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Powerful Features
                </span>
              </Badge>
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-8 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Everything to Scale Your
            <br />
            Business
          </motion.h2>
        </div>

        {/* AI Hub and Feature Cards */}
        <div className="relative mx-auto mb-20 max-w-7xl">
          {/* Mobile Layout - Stacked Cards */}
          <div className="space-y-6 lg:hidden">
            <FeatureCard
              icon={<Linkedin className="h-6 w-6" />}
              title="LinkedIn"
              description="Connect and engage with your professional network. AI optimizes outreach, monitors interactions, and suggests the most valuable connections for business growth."
              position=""
              delay={0.2}
            />
            <FeatureCard
              icon={<Mail className="h-6 w-6" />}
              title="Emails"
              description="Manage and automate email campaigns with precision. AI analyzes recipient behavior to craft perfect messages, optimize timing, and increase response rates."
              position=""
              delay={0.4}
            />
            <FeatureCard
              icon={<Phone className="h-6 w-6" />}
              title="Calls"
              description="Every call becomes a data-rich interaction. AI captures insights, analyzes conversations, and provides actionable recommendations to improve client relationships."
              position=""
              delay={0.6}
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="CRM"
              description="Your CRM becomes intelligent. AI surfaces predictive insights, identifies opportunities, and helps you prioritize leads, accounts, and customer needs effectively."
              position=""
              delay={0.8}
            />
          </div>

          {/* Desktop Layout - Positioned around AI Orb */}
          <div className="relative hidden h-[800px] lg:block">
            {/* Central AI Orb */}
            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
              <AIOrb />
            </div>

            {/* Feature Cards positioned around the AI orb */}
            <FeatureCard
              icon={<Linkedin className="h-6 w-6" />}
              title="LinkedIn"
              description="Connect and engage with your professional network. AI optimizes outreach, monitors interactions, and suggests the most valuable connections for business growth."
              position="absolute top-8 left-8"
              delay={0.8}
            />

            <FeatureCard
              icon={<Phone className="h-6 w-6" />}
              title="Calls"
              description="Every call becomes a data-rich interaction. AI captures insights, analyzes conversations, and provides actionable recommendations to improve client relationships."
              position="absolute top-8 right-8"
              delay={1.0}
            />

            <FeatureCard
              icon={<Mail className="h-6 w-6" />}
              title="Emails"
              description="Manage and automate email campaigns with precision. AI analyzes recipient behavior to craft perfect messages, optimize timing, and increase response rates."
              position="absolute bottom-8 left-8"
              delay={1.2}
            />

            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="CRM"
              description="Your CRM becomes intelligent. AI surfaces predictive insights, identifies opportunities, and helps you prioritize leads, accounts, and customer needs effectively."
              position="absolute bottom-8 right-8"
              delay={1.4}
            />
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              size="lg"
              className="group relative min-w-[280px] overflow-hidden rounded-full px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
              }}
            >
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  background: [
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
                    "linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)",
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <span className="relative z-10 flex items-center text-white">
                <Plus className="mr-2 h-5 w-5" />
                Get Started Today For Free
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
