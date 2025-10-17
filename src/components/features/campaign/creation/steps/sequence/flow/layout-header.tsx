import { cn } from "@/lib/utils";
import { StepProgressIndicator } from "./step-progress-indicator";

import { CampaignStep } from "@/types/campaign";
import { Button, Separator } from "@/components/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export interface LayoutHeaderProps {
  steps: CampaignStep[];
  currentStep: string;
  onNext?: () => void;
  onBack?: () => void;
  className?: string;
}

export const LayoutHeader = ({
  steps,
  currentStep,
  onNext,
  onBack,
}: LayoutHeaderProps) => {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  return (
    <header className="flex h-20 shrink-0 items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex w-full items-center justify-between gap-6">
        <div className="w-full md:w-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            disabled={isFirstStep}
            className={cn(
              "flex items-center gap-2 transition-all",
              isFirstStep
                ? "pointer-events-none opacity-50"
                : "opacity-100 hover:bg-muted",
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>

        <StepProgressIndicator steps={steps} currentStep={currentStepIndex} />

        {/* Next button */}
        <div className="w-full text-right md:w-auto">
          <Button
            variant={isLastStep ? "default" : "outline"}
            size="sm"
            onClick={onNext}
            className={cn(
              "flex items-center gap-2 transition-all",
              isLastStep
                ? "bg-primary hover:bg-primary/90"
                : "hover:border-primary/50",
            )}
          >
            <span>{isLastStep ? "Complete" : "Next"}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
