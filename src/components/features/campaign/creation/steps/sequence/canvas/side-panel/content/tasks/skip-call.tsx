"use client";

import { Clock, Phone, AlertTriangle, Check, X } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export const SkipCall = () => {
  const [skipEnabled, setSkipEnabled] = useState(false);
  const [skipValue, setSkipValue] = useState(24);
  const [timeUnit, setTimeUnit] = useState("hours");

  const handleSave = () => {
    const config = {
      enabled: skipEnabled,
      value: skipValue,
      unit: timeUnit,
      description: skipEnabled
        ? `Skip call step if previous step not completed within ${skipValue} ${timeUnit}`
        : "Skip functionality disabled",
    };
    console.log("Skip Configuration:", config);
    alert("Configuration saved successfully!");
  };

  const getTimeDescription = () => {
    if (!skipEnabled) return "";
    return `${skipValue} ${timeUnit}`;
  };

  return (
    <Card className="mx-auto max-w-2xl rounded-2xl bg-background text-foreground">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
          <Phone className="size-4 text-primary-foreground" />
        </div>
        <div>
          <CardTitle className="text-xl">Skip Call Configuration</CardTitle>
          <CardDescription className="text-sm">
            Set up automatic call step skipping based on timing
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Toggle */}
        <div className="rounded-xl bg-muted p-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Enable Skip Functionality</h3>
            </div>
            <Switch checked={skipEnabled} onCheckedChange={setSkipEnabled} />
          </div>
          <p className="text-sm text-muted-foreground">
            When enabled, the call step will be automatically skipped if the
            previous sequence step hasn&apos;t been completed within the
            specified time frame.
          </p>
        </div>

        {skipEnabled && (
          <div className="space-y-6">
            {/* Time Settings */}
            <Card className="border border-primary/20">
              <CardHeader>
                <CardTitle>Time Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Skip Value */}
                  <div>
                    <Label htmlFor="skipValue">Skip After</Label>
                    <Input
                      id="skipValue"
                      type="number"
                      min={1}
                      max={999}
                      value={skipValue}
                      onChange={(e) =>
                        setSkipValue(parseInt(e.target.value) || 1)
                      }
                      className="mt-2"
                    />
                  </div>

                  {/* Time Unit */}
                  <div>
                    <Label>Time Unit</Label>
                    <Select value={timeUnit} onValueChange={setTimeUnit}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="minutes">Minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Visual Timeline */}
                <div className="mt-6 flex items-center justify-between rounded-lg bg-muted p-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Previous Step</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-primary">
                    <Clock className="h-4 w-4" />
                    <span>Wait {getTimeDescription()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span>Skip Call</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Alert */}
            <Alert className="border-amber-500 bg-amber-50 dark:bg-amber-950">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Configuration Summary</AlertTitle>
              <AlertDescription>
                <strong>Action:</strong> Skip call step if previous step is not
                completed within{" "}
                <span className="font-bold">
                  {skipValue} {timeUnit}
                </span>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="flex w-full justify-between gap-3">
          <Button onClick={handleSave}>
            <Check className="mr-2 h-5 w-5" />
            Save Configuration
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSkipEnabled(false);
              setSkipValue(24);
              setTimeUnit("hours");
            }}
          >
            <X className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </div>

        {skipEnabled && (
          <div className="w-full">
            <p className="mb-3 text-sm font-medium">Quick Presets:</p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 1, unit: "hours", label: "1 Hour" },
                { value: 6, unit: "hours", label: "6 Hours" },
                { value: 24, unit: "hours", label: "1 Day" },
                { value: 3, unit: "days", label: "3 Days" },
                { value: 7, unit: "days", label: "1 Week" },
              ].map((preset) => (
                <Button
                  key={`${preset.value}-${preset.unit}`}
                  variant={
                    skipValue === preset.value && timeUnit === preset.unit
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    setSkipValue(preset.value);
                    setTimeUnit(preset.unit);
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
