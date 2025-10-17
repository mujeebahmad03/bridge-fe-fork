import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DynamicSelect } from "@/components/common/select";
import { Form } from "@/components/ui";
import { useDataGrid } from "../data-grid-context";
import {
  linkedInUrlToWorkEmail,
  LinkedInUrlToWorkEmailType,
  profileType,
} from "@/lib/validations/leads/main";
import { FormFieldWrapper } from "@/components/common/forms";

export const LinkedInToWorkEmail = () => {
  const { columns } = useDataGrid();
  const form = useForm<LinkedInUrlToWorkEmailType>({
    resolver: zodResolver(linkedInUrlToWorkEmail),
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormFieldWrapper
          control={form.control}
          name="linkedInUrl"
          label="LinkedIn URL Column"
          render={({ field }) => (
            <DynamicSelect
              options={columns.map((col) => ({
                value: col.id,
                label: col.name,
              }))}
              onChange={field.onChange}
              className="w-full"
            />
          )}
        />

        <FormFieldWrapper
          control={form.control}
          name="profileType"
          label="Profile Type"
          render={({ field }) => (
            <DynamicSelect
              options={profileType.map((col) => ({
                value: col,
                label: col,
              }))}
              onChange={field.onChange}
              className="w-full"
            />
          )}
        />
      </form>
    </Form>
  );
};
