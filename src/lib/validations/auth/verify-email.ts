import { z } from "zod";

export const verifyEmailSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export type VerifyEmailDto = z.infer<typeof verifyEmailSchema>;
