import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DynamicSelect } from "@/components/common/select";
import { Form } from "@/components/ui";
import { useDataGrid } from "../data-grid-context";
import { verifyEmail, VerifyEmailType } from "@/lib/validations/leads/main";
import { FormFieldWrapper } from "@/components/common/forms";

export const VerifyEmail = () => {
  const { columns } = useDataGrid();
  const form = useForm<VerifyEmailType>({
    resolver: zodResolver(verifyEmail),
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormFieldWrapper
          control={form.control}
          name="email"
          label="Email Column"
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
