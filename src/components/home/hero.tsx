"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authRoutes } from "@/config/routes";

export const Hero = () => {
  const { push } = useRouter();

  const gotoSignup = () => {
    push(authRoutes.signUp);
  };

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-20 md:px-6 md:pb-24 md:pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="animate-fade-in space-y-8 text-center">
          <h1 className="animate-[fade-in_0.5s_ease-out_0.2s_forwards] text-4xl font-bold opacity-0 md:text-6xl">
            AI-Powered Sales Outreach
            <br />
            <span className="animate-[fade-in_0.5s_ease-out_0.4s_forwards] text-primary opacity-0">
              That Actually Works
            </span>
          </h1>
          <p className="mx-auto max-w-2xl animate-[fade-in_0.5s_ease-out_0.6s_forwards] text-xl text-muted-foreground opacity-0">
            Bridge helps you find, engage, and close your target clients using
            advanced AI and multi-channel automation.
          </p>
          <div className="flex animate-[fade-in_0.5s_ease-out_0.8s_forwards] flex-col justify-center gap-4 opacity-0 sm:flex-row">
            <Button size="lg" className="px-8 text-lg" onClick={gotoSignup}>
              Get Started <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 text-lg"
              onClick={gotoSignup}
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
