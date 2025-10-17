import { z } from "zod";

// Shared field schemas
export const linkSchema = z.object({
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  linkedin: z.string().optional(),
  phone: z.string().optional(),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  organization: z.string().min(1, "Organization is required"),
  companyRole: z.string().min(1, "Company role is required"),
  assignedTo: z.string().min(1, "Assigned to is required"),
  ...linkSchema.shape,
});

// Company form schema
export const companyFormSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  companyOwner: z.string().min(1, "Company owner is required"),
  industry: z.string().min(1, "Industry is required"),
  assignedTo: z.string().min(1, "Assigned to is required"),
  organizationSize: z.string().min(1, "Organization size is required"),
  ...linkSchema.shape,
});

// Lead form schema
export const leadFormSchema = z.object({
  campaignName: z.string().min(1, "Campaign name is required"),
  name: z.string().min(1, "Name is required"),
  organization: z.string().min(1, "Organization is required"),
  companyRole: z.string().min(1, "Company role is required"),
  assignedTo: z.string().min(1, "Assigned to is required"),
  ...linkSchema.shape,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CompanyFormData = z.infer<typeof companyFormSchema>;
export type LeadFormData = z.infer<typeof leadFormSchema>;
