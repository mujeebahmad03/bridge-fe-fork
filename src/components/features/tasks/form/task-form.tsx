"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui";
import {
  ComboboxFormField,
  DatePickerField,
  FloatingLabelTimePicker,
  FormFieldWrapper,
  FormInputFieldWrapper,
  SelectFormField,
} from "@/components/common/forms";

import { CreateTaskDto, createTaskSchema } from "@/lib/validations/task";
import { TaskAssociatedWith, TaskPriority, TaskType } from "@/types/task";
import { FloatingLabelTextarea } from "@/components/common/forms/floating-label-textarea";

interface TaskFormProps {
  onCancel?: () => void;
}

export function TaskForm({ onCancel }: TaskFormProps) {
  const form = useForm<CreateTaskDto>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      associatedWith: TaskAssociatedWith.CONTACT,
      campaign: "",
      dueDate: undefined,
      dueTime: "",
      priority: TaskPriority.MEDIUM,
      assignedTo: "",
      taskType: TaskType.CALL,
    },
  });

  const onSubmit = (data: CreateTaskDto) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        <div className="grid gap-6">
          <FormInputFieldWrapper
            control={form.control}
            name="title"
            label="Title"
          />

          <SelectFormField
            control={form.control}
            name="associatedWith"
            label="Associated With"
            options={Object.values(TaskAssociatedWith)}
            getLabel={(option) => option}
            getValue={(option) => option}
          />

          <div className="grid grid-cols-2 gap-4">
            {form.watch("associatedWith") === TaskAssociatedWith.CONTACT && (
              <ComboboxFormField
                control={form.control}
                name="contact"
                label="Contact"
                items={[
                  { id: "1", name: "John Doe" },
                  { id: "2", name: "Jane Doe" },
                ]}
                listClassName="w-96"
              />
            )}

            {form.watch("associatedWith") === TaskAssociatedWith.COMPANY && (
              <ComboboxFormField
                control={form.control}
                name="company"
                label="Company"
                items={[
                  { id: "1", name: "Company A" },
                  { id: "2", name: "Company B" },
                ]}
                listClassName="w-96"
              />
            )}

            <ComboboxFormField
              control={form.control}
              name="campaign"
              label="Campaign"
              items={[
                { id: "1", name: "Campaign A" },
                { id: "2", name: "Campaign B" },
              ]}
              listClassName="w-96"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DatePickerField
              control={form.control}
              name="dueDate"
              label=""
              disabledDates={(date) => date < new Date()}
            />

            <FormFieldWrapper
              control={form.control}
              name="dueTime"
              render={({ field }) => (
                <FloatingLabelTimePicker
                  label="Select Time"
                  onSelect={field.onChange}
                />
              )}
            />
          </div>

          <SelectFormField
            control={form.control}
            name="priority"
            label="Priority"
            options={Object.values(TaskPriority)}
            getLabel={(option) => option}
            getValue={(option) => option}
          />

          <div className="grid grid-cols-2 gap-4">
            <ComboboxFormField
              control={form.control}
              name="assignedTo"
              label="Assigned To"
              items={[
                { id: "1", name: "Campaign A" },
                { id: "2", name: "Campaign B" },
              ]}
              listClassName="w-96"
            />

            <SelectFormField
              control={form.control}
              name="taskType"
              label="Task Type"
              options={Object.values(TaskType)}
              getLabel={(option) => option}
              getValue={(option) => option}
            />
          </div>

          <FormFieldWrapper
            control={form.control}
            name="description"
            render={({ field }) => (
              <FloatingLabelTextarea
                label="Description"
                {...field}
                value={field.value as string}
              />
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">Create Task</Button>
        </div>
      </form>
    </Form>
  );
}
