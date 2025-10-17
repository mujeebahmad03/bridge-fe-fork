import { z } from "zod";

export const campaignDetailsSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  goal: z.string().min(1, "Campaign goal is required"),
  companyName: z.string().min(1, "Company/Product name is required"),
  companyInfo: z.string().min(1, "Company/Product info is required"),
  companyDomain: z.string().optional(),
  valueProposition: z.string().min(1, "Value proposition is required"),
  customerStories: z.string().optional(),
});

export type CampaignDetailsValues = z.infer<typeof campaignDetailsSchema>;
