import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FloatingLabelDatePicker } from "./floating-label-date-picker";

import { cn } from "@/lib/utils";

interface DatePickerFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  disabledDates?: (date: Date) => boolean;
  className?: string;
}

export const DatePickerField = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  disabledDates,
  className,
}: DatePickerFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FloatingLabelDatePicker
              label="Select Date"
              onSelect={field.onChange}
              disabledDates={disabledDates}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
