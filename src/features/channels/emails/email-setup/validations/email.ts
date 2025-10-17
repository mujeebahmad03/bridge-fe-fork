import { z } from "zod";

export type EmailProvider = "google" | "microsoft" | "custom";
export type ConnectionMode = "single" | "multiple";

export const emailAccountSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  imapServer: z.string().min(1, "IMAP server is required"),
  imapPort: z.coerce
    .number()
    .min(1, "IMAP port must be a valid number")
    .max(65535, "Port must be less than 65536"),
  smtpServer: z.string().min(1, "SMTP server is required"),
  smtpPort: z.coerce
    .number()
    .min(1, "SMTP port must be a valid number")
    .max(65535, "Port must be less than 65536"),
  password: z.string().min(1, "Password is required"),
  useSameCredentials: z.boolean().default(true),
  smtpUsername: z.string().optional(),
  smtpPassword: z.string().optional(),
});

export type EmailAccountFormData = z.infer<typeof emailAccountSchema>;

export interface EmailSetupState {
  step: "provider" | "connection-mode" | "imap-setup" | "form";
  provider: EmailProvider | null;
  connectionMode: ConnectionMode | null;
}
