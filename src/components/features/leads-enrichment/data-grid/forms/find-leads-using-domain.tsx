import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DynamicSelect } from "@/components/common/select";
import { Form } from "@/components/ui";
import { useDataGrid } from "../data-grid-context";
import {
  findLeadsUsingDomain,
  FindLeadsUsingDomainType,
} from "@/lib/validations/leads/main";
import { FormFieldWrapper } from "@/components/common/forms";

export const FindLeadsUsingDomain = () => {
  const { columns } = useDataGrid();
  const form = useForm<FindLeadsUsingDomainType>({
    resolver: zodResolver(findLeadsUsingDomain),
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormFieldWrapper
          control={form.control}
          name="companyName"
          label="Company Name Column"
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
          name="domain"
          label="Domain Column"
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
