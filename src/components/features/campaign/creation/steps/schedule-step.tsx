/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScheduleIllustration } from "@/components/common/illustrations";

interface ScheduleStepProps {
  onNext: () => void;
  onBack: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

export function ScheduleStep({
  onNext,
  onBack,
  formData,
  updateFormData,
}: ScheduleStepProps) {
  const [scheduleType, setScheduleType] = useState(
    formData?.scheduleType || "immediate",
  );

  const handleSubmit = () => {
    updateFormData({
      scheduleType,
      // Additional schedule data would be collected here
    });
    onNext();
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Schedule</h2>
          <p className="text-muted-foreground">
            Set up the schedule for your campaign
          </p>
        </div>
        <div className="flex justify-center lg:w-1/3">
          <ScheduleIllustration />
        </div>
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">
            When do you want to send your campaign?
          </h3>
          <RadioGroup
            value={scheduleType}
            onValueChange={setScheduleType}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="immediate" id="immediate" />
              <div>
                <Label htmlFor="immediate" className="font-medium">
                  Send immediately
                </Label>
                <p className="text-sm text-muted-foreground">
                  Your campaign will be sent as soon as you complete setup
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="scheduled" id="scheduled" />
              <div>
                <Label htmlFor="scheduled" className="font-medium">
                  Schedule for later
                </Label>
                <p className="text-sm text-muted-foreground">
                  Choose a specific date and time to send your campaign
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="recurring" id="recurring" />
              <div>
                <Label htmlFor="recurring" className="font-medium">
                  Set up recurring schedule
                </Label>
                <p className="text-sm text-muted-foreground">
                  Send your campaign on a regular schedule
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        {scheduleType === "scheduled" && (
          <div className="grid gap-4 rounded-md border p-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <input
                  type="time"
                  id="time"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
          </div>
        )}

        {scheduleType === "recurring" && (
          <div className="grid gap-4 rounded-md border p-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <input
                  type="time"
                  id="time"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={handleSubmit}>Continue</Button>
      </div>
    </div>
  );
}
