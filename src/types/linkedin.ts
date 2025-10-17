import { z } from "zod";

export type LinkedInConnectionMode = "single" | "multiple";

export const linkedInAccountSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  synchronizeChats: z.boolean().default(false),
  synchronizeMessages: z.boolean().default(false),
  country: z.string().min(1, "Please select a country"),
  useOwnProxy: z.boolean().default(false),
  proxyUrl: z.string().optional(),
});

export type LinkedInAccountFormData = z.infer<typeof linkedInAccountSchema>;

export interface LinkedInSetupState {
  step: "connection-mode" | "form";
  connectionMode: LinkedInConnectionMode | null;
}

export interface LinkedInAccount {
  id: string;
  email: string;
  profileName: string;
  profileUrl: string;
  connectionCount: number;
  status: "connected" | "syncing" | "failed" | "disconnected";
  lastSynced: Date;
  messagesSynced: number;
  chatsSynced: number;
}
