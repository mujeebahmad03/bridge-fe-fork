import { z } from "zod";

export const baseTaskSchema = z.object({
  to: z.string().min(2, "To must be at least 2 characters"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  body: z.string().min(2, "Body must be at least 2 characters"),
});

export const emailTaskSchema = baseTaskSchema;

export type EmailTaskDto = z.infer<typeof emailTaskSchema>;
