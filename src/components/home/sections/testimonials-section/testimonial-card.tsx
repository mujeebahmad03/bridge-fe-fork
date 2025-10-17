"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { GearPatternBackground } from "@/components/ui/gear-pattern-background";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
  metrics?: {
    label: string;
    value: string;
  }[];
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

export function TestimonialCard({
  testimonial,
  isActive,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.95,
        y: 0,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="relative overflow-hidden border-blue-500/20 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 shadow-2xl dark:from-slate-900 dark:via-blue-950 dark:to-slate-950">
        <GearPatternBackground className="text-blue-400/30 dark:text-blue-300/20" />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-purple-500/10" />

        <div className="relative p-8 sm:p-12">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
            {/* Profile Section */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 text-center lg:text-left"
            >
              <div className="relative flex flex-col items-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-50 blur-lg" />
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={100}
                  height={100}
                  className="relative h-20 w-20 rounded-full border-4 border-blue-400/50 object-cover shadow-xl sm:h-24 sm:w-24"
                />
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-bold text-white">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-blue-200">{testimonial.role}</p>
                <p className="text-sm font-medium text-blue-300">
                  {testimonial.company}
                </p>

                <div className="mt-2 flex justify-center lg:justify-start">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quote Section */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <Quote className="absolute -left-2 -top-2 h-8 w-8 text-blue-400/50" />
                <blockquote className="pl-6 text-lg leading-relaxed text-white sm:text-xl">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
              </motion.div>

              {testimonial.metrics && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start"
                >
                  {testimonial.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-blue-400/30 bg-blue-500/20 px-4 py-2 backdrop-blur-sm"
                    >
                      <div className="text-2xl font-bold text-blue-300">
                        {metric.value}
                      </div>
                      <div className="text-xs text-blue-200">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
