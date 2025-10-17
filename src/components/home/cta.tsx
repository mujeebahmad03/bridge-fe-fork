import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="px-4 py-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <h2 className="scroll-animation animate-[fade-in_0.5s_ease-out_forwards] text-3xl font-bold opacity-0 md:text-4xl">
          Ready to Transform Your Sales Outreach?
        </h2>
        <p className="scroll-animation animate-[fade-in_0.5s_ease-out_0.2s_forwards] text-lg text-muted-foreground opacity-0">
          Join thousands of businesses using Bridge to automate and personalize
          their sales outreach.
        </p>
        <Button
          size="lg"
          className="scroll-animation animate-[fade-in_0.5s_ease-out_0.4s_forwards] px-8 text-lg opacity-0"
        >
          Start Free Trial <ArrowRight className="ml-2" />
        </Button>
      </div>
    </section>
  );
};
