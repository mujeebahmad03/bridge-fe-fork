/* eslint-disable quotes */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CampaignStepIndicatorProps } from "@/types/campaign";

// Utility class to hide scrollbars while maintaining scroll functionality
const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`;

export function CampaignStepIndicator({
  steps,
  currentStep,
}: CampaignStepIndicatorProps) {
  // Find the index of the current step
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Add scrollbar hiding styles
  React.useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = scrollbarHideStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Scroll to the current step when it changes
  React.useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const activeElements = container.querySelectorAll('[data-active="true"]');

      if (activeElements.length > 0) {
        const lastActiveElement = activeElements[
          activeElements.length - 1
        ] as HTMLElement;

        if (lastActiveElement) {
          const containerWidth = container.offsetWidth;
          const scrollPosition =
            lastActiveElement.offsetLeft -
            containerWidth / 2 +
            lastActiveElement.offsetWidth / 2;

          container.scrollTo({
            left: Math.max(0, scrollPosition),
            behavior: "smooth",
          });
        }
      }
    }
  }, [currentStep, steps]);

  return (
    <div className="w-full overflow-hidden bg-muted/30 p-1 shadow-sm">
      <div
        ref={containerRef}
        className="scrollbar-hide flex w-full items-center overflow-x-auto"
      >
        {steps.map((step, index) => {
          // Determine if this step is active (current or before current)
          const isActive = index <= currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              {/* Step item */}
              <div
                data-active={isActive}
                className={cn(
                  "flex h-10 min-w-[100px] flex-1 items-center justify-center whitespace-nowrap px-3 text-sm font-medium transition-colors first:rounded-l-2xl last:rounded-r-2xl sm:px-4",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "bg-background text-muted-foreground",
                )}
              >
                <span>{step.label}</span>
              </div>

              {/* Don't add a separator after the last item */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-10 w-px",
                    index < currentStepIndex ? "bg-blue-700" : "bg-border",
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
