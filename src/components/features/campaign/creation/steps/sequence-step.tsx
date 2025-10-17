/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, FileCode, Copy, Layout } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SequenceStepProps {
  onNext: () => void;
  onBack: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

export function SequenceStep({
  onNext,
  onBack,
  updateFormData,
}: SequenceStepProps) {
  const handleSelectOption = (option: string) => {
    updateFormData({ type: option });
    onNext();
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Create Sequence</h2>
          <p className="text-muted-foreground">
            Choose how to create your campaign sequence
          </p>
        </div>
        <div className="flex justify-center lg:w-1/3">
          <SequenceIllustration />
        </div>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <SequenceOption
          icon={<Sparkles className="h-8 w-8 text-primary" />}
          title="Create with AI"
          description="Create your first email campaign to reach out to potential clients."
          onClick={() => handleSelectOption("ai")}
        />

        <SequenceOption
          icon={<FileCode className="h-8 w-8 text-primary" />}
          title="Create Manually"
          description="Create your first email campaign to reach out to potential clients."
          onClick={() => handleSelectOption("manual")}
        />

        <SequenceOption
          icon={<Layout className="h-8 w-8 text-primary" />}
          title="Create with Template"
          description="Create your first email campaign to reach out to potential clients."
          onClick={() => handleSelectOption("template")}
        />

        <SequenceOption
          icon={<Copy className="h-8 w-8 text-primary" />}
          title="Duplicate Sequence"
          description="Create your first email campaign to reach out to potential clients."
          onClick={() => handleSelectOption("duplicate")}
        />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
      </div>
    </div>
  );
}

interface SequenceOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function SequenceOption({
  icon,
  title,
  description,
  onClick,
}: SequenceOptionProps) {
  return (
    <Card
      className="cursor-pointer transition-all hover:border-primary/50"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="mb-2 w-fit rounded-md bg-primary/10 p-2">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function SequenceIllustration() {
  return (
    <div className="relative h-[150px] w-[200px]">
      <svg
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <circle
          cx="100"
          cy="75"
          r="50"
          fill="currentColor"
          fillOpacity="0.1"
          className="text-primary"
        />

        {/* Cloud with ideas */}
        <path
          d="M120 50C120 44.4772 115.523 40 110 40C104.477 40 100 44.4772 100 50C100 50.7733 100.077 51.5293 100.223 52.2592C97.7199 53.3406 95.7024 55.3581 94.621 57.8612C93.8911 57.7147 93.1351 57.6379 92.3618 57.6379C86.8389 57.6379 82.3618 62.1151 82.3618 67.6379C82.3618 73.1608 86.8389 77.6379 92.3618 77.6379H120C125.523 77.6379 130 73.1608 130 67.6379C130 62.1151 125.523 57.6379 120 57.6379C119.227 57.6379 118.471 57.7147 117.741 57.8612C116.66 55.3581 114.642 53.3406 112.139 52.2592C112.285 51.5293 112.362 50.7733 112.362 50Z"
          fill="#6366F1"
          fillOpacity="0.8"
        />

        {/* Light bulb */}
        <circle cx="105" cy="65" r="5" fill="yellow" />
        <path d="M102 70L105 75L108 70" stroke="yellow" strokeWidth="2" />

        {/* People */}
        <circle cx="70" cy="100" r="10" fill="#6366F1" />
        <rect x="65" y="112" width="10" height="15" rx="2" fill="#6366F1" />

        <circle cx="130" cy="100" r="10" fill="#6366F1" />
        <rect x="125" y="112" width="10" height="15" rx="2" fill="#6366F1" />

        <circle cx="100" cy="110" r="10" fill="#6366F1" />
        <rect x="95" y="122" width="10" height="15" rx="2" fill="#6366F1" />

        {/* Connection lines */}
        <line
          x1="80"
          y1="100"
          x2="90"
          y2="105"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
        <line
          x1="110"
          y1="105"
          x2="120"
          y2="100"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
        <line
          x1="105"
          y1="80"
          x2="105"
          y2="95"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
