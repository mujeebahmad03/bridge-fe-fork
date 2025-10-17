import { Control, FieldValues, Path, PathValue } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultipleSelector, Option } from "@/components/ui/multiselect";

import { cn } from "@/lib/utils";

interface MultipleSelectorFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  options: Option[];
  label?: string;
  placeholder?: string;
  className?: string;
  emptyIndicator?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  defaultValue?: PathValue<TFieldValues, TName>;
}

export const MultipleSelectorField = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  name,
  control,
  options,
  label,
  placeholder = "Select options...",
  className,
  emptyIndicator = (
    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
      No results found.
    </p>
  ),
  disabled = false,
  required = false,
  defaultValue,
}: MultipleSelectorFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className={cn("flex-1", className)}>
          {label && (
            <FormLabel
              className={cn(
                required && "after:ml-1 after:text-red-500 after:content-['*']",
              )}
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <MultipleSelector
              {...field}
              defaultOptions={options}
              placeholder={placeholder}
              emptyIndicator={emptyIndicator}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
