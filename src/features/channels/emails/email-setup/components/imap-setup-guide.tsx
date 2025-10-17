"use client";

import { Mail, Settings, CheckSquare, Save } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ImapSetupGuideProps {
  onContinue: () => void;
}

export function ImapSetupGuide({ onContinue }: ImapSetupGuideProps) {
  const steps = [
    {
      icon: Mail,
      title: "Open your email",
      description: "Open your email account in a web browser.",
    },
    {
      icon: Settings,
      title: "Go to Settings",
      description: "Go to Settings > See all settings.",
    },
    {
      icon: CheckSquare,
      title: "Enable IMAP",
      description: "Click on the 'Forwarding and POP/IMAP' tab.",
    },
    {
      icon: Save,
      title: "Save Changes",
      description: "In the 'IMAP access' section, select 'Enable IMAP'.",
    },
    {
      icon: Save,
      title: "Save Changes",
      description: "Click 'Save Changes' at the bottom of the page.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">Connect your email</h1>
        <div className="flex items-center justify-center gap-2">
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
          >
            Step 1 of 3
          </Badge>
        </div>
        <div className="mx-auto h-2 w-full max-w-md rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-2 w-1/3 rounded-full bg-blue-600 transition-all duration-300"></div>
        </div>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-semibold">Enable IMAP</h2>
              <p className="text-muted-foreground">
                To connect your email, you&apos;ll need to enable IMAP in your
                email settings. Here&apos;s how:
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                      <step.icon className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 text-center">
              <Button
                onClick={onContinue}
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/40"
                size="lg"
              >
                Yes, IMAP is activated
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
