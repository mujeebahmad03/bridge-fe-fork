import type { ReactNode } from "react";
import { FieldValues, Path, Control } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui";
import { FloatingLabelInput } from "./floating-label-input";

interface FormInputFieldWrapperProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type?: string;
  description?: string | ReactNode;
}

export const FormInputFieldWrapper = <T extends FieldValues>({
  control,
  name,
  label,
  leftIcon,
  rightIcon,
  type = "text",
  description,
}: FormInputFieldWrapperProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <FloatingLabelInput
              label={label}
              {...field}
              error={fieldState.error?.message}
              valid={!fieldState.error && field.value !== ""}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              type={type}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
