"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/icons";
import { dashboardRoutes } from "@/config/routes";

export const HowYouHearAboutUs = () => {
  const [selectedSource, setSelectedSource] = useState<string>("");

  const { push } = useRouter();

  const sources = [
    "Youtube",
    "Google",
    "LinkedIn",
    "Twitter",
    "Instagram",
    "Facebook",
    "Blog",
    "Other",
  ];

  const handleContinue = () => {
    push(dashboardRoutes.wizard);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-primary p-8 md:p-16">
      <Card className="mx-auto w-full max-w-md p-8">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4">
          <Logo />

          <h2 className="text-center text-2xl font-bold text-foreground">
            How did you hear
            <br /> about us?
          </h2>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4">
          {sources.map((source) => (
            <button
              key={source}
              onClick={() => setSelectedSource(source)}
              className={`source-button ${
                selectedSource === source ? "active" : ""
              }`}
            >
              {source}
            </button>
          ))}
        </div>

        <Button
          className="w-full py-6 text-lg"
          disabled={!selectedSource}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Card>
    </div>
  );
};
