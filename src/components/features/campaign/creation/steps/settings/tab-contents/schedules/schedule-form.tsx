"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save, X } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  scheduleFormSchema,
  ScheduleValues,
} from "@/lib/validations/campaign/schedule";
import TimezoneSelect from "./timezone-select";
import DaySelector from "./day-selector";
import TimeSelect from "./time-select";
import IntervalCounter from "./interval-counter";
import SchedulePreview from "./schedule-preview";

import { timezones } from "@/config/timezone";
import type { Day } from "@/config/time-options";

interface ScheduleFormProps {
  onSubmit: (values: ScheduleValues) => void;
  onCancel: () => void;
  defaultValues?: Partial<ScheduleValues>;
}

const ScheduleForm = ({
  onSubmit,
  onCancel,
  defaultValues = {
    name: "",
    startTime: "9:00 AM",
    endTime: "6:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    interval: 20,
    timezone: timezones[0],
  },
}: ScheduleFormProps) => {
  const form = useForm<ScheduleValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues,
  });

  const selectedDays = form.watch("days") || [];
  const interval = form.watch("interval");
  const startTime = form.watch("startTime");
  const endTime = form.watch("endTime");

  const handleDayToggle = (day: Day) => {
    const currentDays = form.getValues("days") || [];

    if (currentDays.includes(day)) {
      form.setValue(
        "days",
        currentDays.filter((d) => d !== day),
        { shouldValidate: true },
      );
    } else {
      form.setValue("days", [...currentDays, day], { shouldValidate: true });
    }
  };

  return (
    <div className="rounded-2xl border-2 border-border bg-card p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel className="text-sm font-semibold text-foreground">
                  Schedule name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Local Timezone"
                    className="h-12 border-2 bg-card transition-all duration-200 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel className="text-sm font-semibold text-foreground">
                  Timezone used
                </FormLabel>
                <FormControl>
                  <TimezoneSelect
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DaySelector
            selectedDays={selectedDays}
            onDayToggle={handleDayToggle}
            error={form.formState.errors.days?.message}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <FormLabel className="text-sm font-semibold text-foreground">
                    Between
                  </FormLabel>
                  <FormControl>
                    <TimeSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select start time"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <FormLabel className="text-sm font-semibold text-foreground">
                    And
                  </FormLabel>
                  <FormControl>
                    <TimeSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select end time"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="interval"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel className="text-sm font-semibold text-foreground">
                  Reach a new lead every
                </FormLabel>
                <FormControl>
                  <IntervalCounter
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SchedulePreview
            selectedDays={selectedDays}
            interval={interval}
            startTime={startTime}
            endTime={endTime}
          />

          <div className="mt-6 flex flex-col justify-end gap-3 border-t-2 border-border pt-6 sm:flex-row">
            <Button
              variant="outline"
              type="button"
              onClick={onCancel}
              className="h-12 border-2 px-6 transition-all duration-200 hover:bg-accent"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              className="h-12 bg-primary px-6 font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl"
              type="submit"
            >
              <Save className="mr-2 h-4 w-4" />
              {defaultValues.name ? "Update schedule" : "Add this schedule"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ScheduleForm;
