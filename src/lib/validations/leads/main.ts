import { z } from "zod";

export const findWorkEmail = z.object({
  firstName: z.string(),
  lastName: z.string(),
  companyDomain: z.string(),
});

export type FindWorKEmailType = z.infer<typeof findWorkEmail>;

export const profileType = ["person", "company"] as const;

export const linkedInUrlToWorkEmail = z.object({
  linkedInUrl: z.string().url(),
  profileType: z.enum(profileType),
});

export type LinkedInUrlToWorkEmailType = z.infer<typeof linkedInUrlToWorkEmail>;

export const fullNameToLinkedInProfile = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export type FullNameToLinkedInProfileType = z.infer<
  typeof fullNameToLinkedInProfile
>;

export const findLeadsUsingDomain = z.object({
  companyName: z.string(),
  domain: z.string(),
});

export type FindLeadsUsingDomainType = z.infer<typeof findLeadsUsingDomain>;

export const emailToLinkedInProfile = z.object({
  workEmail: z.string().email(),
});

export type EmailToLinkedInProfileType = z.infer<typeof emailToLinkedInProfile>;

export const companyData = z.object({
  companyWebsite: z.string().url(),
});

export type CompanyDataType = z.infer<typeof companyData>;

export const verifyEmail = z.object({
  email: z.string().email(),
});

export type VerifyEmailType = z.infer<typeof verifyEmail>;
