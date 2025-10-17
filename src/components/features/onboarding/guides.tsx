"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { setupSteps } from "@/config/constants";
import { cn } from "@/lib/utils";
import { dashboardRoutes } from "@/config/routes";

export const Guides = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [progress, setProgress] = useState(20);
  const { push } = useRouter();

  const handleStepToggle = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const handleSkipAll = () => {
    push(dashboardRoutes.home);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={handleSkipAll}
            className="text-primary transition-colors duration-200 hover:text-primary/80"
          >
            Skip all
          </button>
          <div className="text-sm text-muted-foreground">
            {progress}% Completed
          </div>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary dark:bg-primary/5">
              Users get free coins per setup completed.
            </div>
            <h1 className="mb-2 text-2xl font-semibold text-foreground">
              Recommended Setups
            </h1>
            <p className="text-muted-foreground">
              We ensure every interaction is personalized using our AI
              technology
            </p>
          </div>

          {setupSteps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300",
                expandedStep === step.id ? "ring-2 ring-primary" : "",
              )}
            >
              <button
                onClick={() => handleStepToggle(step.id)}
                className="flex w-full items-start justify-between p-6 text-left transition-colors duration-200 hover:bg-muted/50"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 dark:bg-primary/5">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {expandedStep === step.id ? (
                  <ChevronUp className="h-6 w-6 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-muted-foreground" />
                )}
              </button>

              <div
                className={cn(
                  "transition-all duration-300 ease-in-out",
                  expandedStep === step.id
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0",
                )}
              >
                <div className="p-6 pt-0">
                  <div className="mb-4 rounded-lg bg-muted p-6">
                    <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-muted-foreground/20"></div>
                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted-foreground/20"></div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setProgress((prev) => Math.min(prev + 20, 100));
                    }}
                  >
                    {step.title}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
