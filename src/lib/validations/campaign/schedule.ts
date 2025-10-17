import { dayLongs, timeOptions } from "@/config/time-options";
import { timezones } from "@/config/timezone";
import { z } from "zod";

export const scheduleFormSchema = z.object({
  name: z.string().min(1, "Schedule name is required"),
  days: z.array(z.enum(dayLongs)).min(1, "Select at least one day"),
  startTime: z.enum(timeOptions),
  endTime: z.enum(timeOptions),
  interval: z.number().min(1, "Interval must be at least 1 minute"),
  timezone: z.enum(timezones),
});

export type ScheduleValues = z.infer<typeof scheduleFormSchema>;
