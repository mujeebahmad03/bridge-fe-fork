import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DynamicSelect } from "@/components/common/select";
import { Form } from "@/components/ui";
import { useDataGrid } from "../data-grid-context";
import { findWorkEmail, FindWorKEmailType } from "@/lib/validations/leads/main";
import { FormFieldWrapper } from "@/components/common/forms";

export const FindWorkEmail = () => {
  const { columns } = useDataGrid();
  const form = useForm<FindWorKEmailType>({
    resolver: zodResolver(findWorkEmail),
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormFieldWrapper
          control={form.control}
          name="firstName"
          label="First Name Column"
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
          name="lastName"
          label="Last Name Column"
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
          name="companyDomain"
          label="Company Domain Column"
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
      </form>
    </Form>
  );
};
