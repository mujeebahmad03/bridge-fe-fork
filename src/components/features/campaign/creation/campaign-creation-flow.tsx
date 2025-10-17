"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AnalyticsStep, CampaignDetailsStep } from "./steps";
import { LeadsStep } from "./steps/leads";
import { FlowBuilderLayout } from "./steps/sequence";
import { CampaignContainer } from "./campaign-container";
import { Settings } from "./steps/settings";

import { dashboardRoutes } from "@/config/routes";
import { CampaignDetailsValues } from "@/lib/validations/campaign";

const steps = [
  { id: "campaign-details", label: "Details" },
  { id: "leads", label: "Leads" },
  { id: "sequence", label: "Sequence" },
  { id: "settings", label: "Settings" },
  { id: "analytics", label: "Analytics" },
];

export function CampaignCreationFlow() {
  const [currentStep, setCurrentStep] = useState("campaign-details");
  const [formData] = useState({
    campaignDetails: {},
    leads: [],
    sequence: {},
    settings: {},
    analytics: {},
  });

  const router = useRouter();

  const goToNextStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const renderStep = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {(() => {
            switch (currentStep) {
              case "campaign-details":
                return (
                  <CampaignContainer currentStep={currentStep} steps={steps}>
                    <CampaignDetailsStep
                      onNext={goToNextStep}
                      formData={
                        formData.campaignDetails as CampaignDetailsValues
                      }
                      updateFormData={(data) =>
                        console.log("campaignDetails", data)
                      }
                    />
                  </CampaignContainer>
                );
              case "leads":
                return (
                  <CampaignContainer currentStep={currentStep} steps={steps}>
                    <LeadsStep
                      onNext={goToNextStep}
                      onBack={goToPreviousStep}
                    />
                  </CampaignContainer>
                );
              case "sequence":
                return (
                  <FlowBuilderLayout
                    onNext={goToNextStep}
                    onBack={goToPreviousStep}
                    steps={steps}
                    currentStep={currentStep}
                  />
                );
              case "settings":
                return (
                  <CampaignContainer currentStep={currentStep} steps={steps}>
                    <Settings onNext={goToNextStep} onBack={goToPreviousStep} />
                  </CampaignContainer>
                );
              case "analytics":
                return (
                  <CampaignContainer currentStep={currentStep} steps={steps}>
                    <AnalyticsStep
                      onComplete={() => router.push(dashboardRoutes.campaign)}
                      onBack={goToPreviousStep}
                      updateFormData={(data) => console.log("analytics", data)}
                    />
                  </CampaignContainer>
                );
              default:
                return null;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return renderStep();
}
