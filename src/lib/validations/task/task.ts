import { z } from "zod";
import { TaskAssociatedWith, TaskPriority, TaskType } from "@/types/task";

export const createTaskSchema = z
  .object({
    associatedWith: z.nativeEnum(TaskAssociatedWith, {
      required_error: "Associated with is required",
    }),
    contact: z.string().optional(),
    company: z.string().optional(),
    campaign: z.string().min(2, "Campaign is required"),
    title: z.string().min(2, "Title must be at least 2 characters"),
    dueDate: z.coerce.date().min(new Date(), "Due date must be in the future"),
    dueTime: z.string().min(2, "Due time must be at least 2 characters"),
    priority: z.nativeEnum(TaskPriority, {
      required_error: "Priority is required",
    }),
    taskType: z.nativeEnum(TaskType, {
      required_error: "Task type is required",
    }),
    assignedTo: z.string().min(1),
    description: z.string().min(2, "Description must be at least 2 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.associatedWith === TaskAssociatedWith.CONTACT) {
      if (!data.contact || data.contact.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Contact must be provided when associated with a contact",
          path: ["contact"],
        });
      }
    } else if (data.associatedWith === TaskAssociatedWith.COMPANY) {
      if (!data.company || data.company.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company must be provided when associated with a company",
          path: ["company"],
        });
      }
    }
  });

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
