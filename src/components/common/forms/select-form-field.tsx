import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FloatingLabelSelect } from "./floating-label-select";

interface SelectFormFieldProps<TFieldValues extends FieldValues, TOption> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  options: TOption[];
  getLabel: (option: TOption) => string;
  getValue: (option: TOption) => string;
}

export const SelectFormField = <TFieldValues extends FieldValues, TOption>({
  control,
  name,
  label,
  options,
  getLabel,
  getValue,
}: SelectFormFieldProps<TFieldValues, TOption>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <FloatingLabelSelect
              label={label}
              options={options.map((option) => ({
                label: getLabel(option),
                value: getValue(option),
              }))}
              defaultValue={field.value}
              onValueChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
