"use client";

import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FloatingLabelCombobox } from "./floating-label-combobox";

import { cn } from "@/lib/utils";

type BaseItem = {
  name: string;
};

type ItemWithId = BaseItem & {
  id: string;
};

interface ComboboxFormFieldProps<
  TFieldValues extends FieldValues,
  TItem extends BaseItem | ItemWithId,
> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  items: TItem[];
  label: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  listClassName?: string;
}

export const ComboboxFormField = <
  TFieldValues extends FieldValues,
  TItem extends BaseItem | ItemWithId,
>({
  name,
  control,
  items,
  label,
  className,
  listClassName,
}: ComboboxFormFieldProps<TFieldValues, TItem>) => {
  // Helper function to get the value to store
  const getValue = (item: TItem) => {
    return "id" in item ? item.id : item.name;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex-1", className)}>
          <FormControl>
            <FloatingLabelCombobox
              label={label}
              options={items.map((item) => ({
                id: "id" in item ? item.id : getValue(item),
                name: item.name,
              }))}
              onValueChange={field.onChange}
              listClassName={listClassName}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
