"use client";

import type { UseFormReturn } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const noteSchema = z.object({
  title: z.string().min(1, "Note title is required"),
  content: z.string().min(1, "Note content is required"),
});

interface NoteFormProps {
  form: UseFormReturn<z.infer<typeof noteSchema>>;
  onSubmit: (values: z.infer<typeof noteSchema>) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export function NoteForm({
  form,
  onSubmit,
  onCancel,
  isEdit = false,
}: NoteFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter note title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your note here..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="bg-transparent"
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEdit ? "Update Note" : "Create Note"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
