"use client";

import * as React from "react";
import { Check, ChevronsUpDown, AlertCircle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxOption {
  id: string;
  name: string;
}

interface FloatingLabelComboboxProps {
  label: string;
  options: ComboboxOption[];
  error?: string;
  valid?: boolean;
  leftIcon?: React.ReactNode;
  onValueChange?: (id: string) => void;
  className?: string;
  listClassName?: string;
}

export function FloatingLabelCombobox({
  label,
  options,
  error,
  valid,
  leftIcon,
  onValueChange,
  className,
  listClassName,
}: FloatingLabelComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setOpen(false);
    onValueChange?.(newValue);
  };

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "h-[60px] w-full justify-between rounded-lg border bg-background px-3 text-sm ring-offset-background",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus:ring-destructive",
              valid && "border-green-500 focus:ring-green-500",
              leftIcon && "pl-10",
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <span className="truncate pt-4">
              {value ? options.find((option) => option.id === value)?.name : ""}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className={listClassName}>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.id}
                    onSelect={handleValueChange}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <label
        className={cn(
          "absolute left-3 transition-all duration-200 ease-in-out",
          "pointer-events-none",
          isFocused || value ? "top-2 text-xs" : "top-[18px] text-sm",
          "text-muted-foreground",
          error && "text-destructive",
          valid && "text-green-500",
          leftIcon && "left-10",
        )}
      >
        {label}
      </label>
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {leftIcon}
        </div>
      )}
      <div className="absolute right-10 top-1/2 -translate-y-1/2">
        {error && <AlertCircle className="h-5 w-5 text-destructive" />}
        {valid && <CheckCircle2 className="h-5 w-5 text-green-500" />}
      </div>
    </div>
  );
}
