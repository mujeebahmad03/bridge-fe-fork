import { z } from "zod";

export const configurationSchema = z.object({
  signature: z.string().min(1, "Signature is required"),
  dailyLimit: z.coerce
    .number()
    .min(1, "Daily limit must be at least 1")
    .max(1000, "Daily limit cannot exceed 1000"),
  hourlyLimit: z.coerce
    .number()
    .min(1, "Hourly limit must be at least 1")
    .max(100, "Hourly limit cannot exceed 100"),
  optOutLink: z.string().url("Please enter a valid URL"),
  subdomainTracking: z.boolean(),
  dkimEnabled: z.boolean(),
  spfEnabled: z.boolean(),
  dmarcEnabled: z.boolean(),
});

export type ConfigurationFormData = z.infer<typeof configurationSchema>;
