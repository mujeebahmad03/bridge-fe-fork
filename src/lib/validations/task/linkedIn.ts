import { z } from "zod";

import { baseTaskSchema } from "./email";

export const linkedInTaskSchema = baseTaskSchema;

export type LinkedInTaskDto = z.infer<typeof linkedInTaskSchema>;
