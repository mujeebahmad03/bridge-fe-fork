import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DynamicSelect } from "@/components/common/select";
import { Form } from "@/components/ui";
import { useDataGrid } from "../data-grid-context";
import {
  emailToLinkedInProfile,
  EmailToLinkedInProfileType,
} from "@/lib/validations/leads/main";
import { FormFieldWrapper } from "@/components/common/forms";

export const EmailToLinkedInProfile = () => {
  const { columns } = useDataGrid();
  const form = useForm<EmailToLinkedInProfileType>({
    resolver: zodResolver(emailToLinkedInProfile),
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormFieldWrapper
          control={form.control}
          name="workEmail"
          label="Email Column"
          render={({ field }) => (
            <DynamicSelect
              className="w-full"
              options={columns.map((col) => ({
                value: col.id,
                label: col.name,
              }))}
              onChange={field.onChange}
            />
          )}
        />
      </form>
    </Form>
  );
};
