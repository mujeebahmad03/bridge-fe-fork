import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DynamicSelect } from "@/components/common/select";
import { FormFieldWrapper } from "@/components/common/forms";
import { Form } from "@/components/ui";
import { useDataGrid } from "../data-grid-context";
import { companyData, CompanyDataType } from "@/lib/validations/leads/main";

export const CompanyData = () => {
  const { columns } = useDataGrid();
  const form = useForm<CompanyDataType>({
    resolver: zodResolver(companyData),
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormFieldWrapper
          control={form.control}
          name="companyWebsite"
          label="Company Website Column"
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

        {/* <FormFieldWrapper
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
        /> */}
      </form>
    </Form>
  );
};
