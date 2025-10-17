"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

// Define types for our dynamic select component
type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectGroup = {
  label: string;
  options: SelectOption[];
};

type SelectProps = {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  groups?: SelectGroup[];
  disabled?: boolean;
  className?: string;
  renderItem?: (option: SelectOption) => React.ReactNode;
};

export function DynamicSelect({
  placeholder = "Select an option",
  value,
  defaultValue,
  onChange,
  options = [],
  groups = [],
  disabled = false,
  className = "w-[180px]",
  renderItem,
}: SelectProps) {
  // Handle both controlled and uncontrolled modes
  const handleValueChange = React.useCallback(
    (newValue: string) => {
      onChange?.(newValue);
    },
    [onChange],
  );

  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {/* Render flat options if provided */}
        {options.length > 0 && (
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="capitalize"
              >
                {renderItem ? renderItem(option) : option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        )}

        {/* Render grouped options if provided */}
        {groups.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {renderItem ? renderItem(option) : option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

// Example usage with the original demo
export function SelectDemo() {
  const [selectedFruit, setSelectedFruit] = React.useState<string>();

  // Example with flat options
  const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "blueberry", label: "Blueberry" },
    { value: "grapes", label: "Grapes" },
    { value: "pineapple", label: "Pineapple" },
  ];

  // Example with grouped options
  const foodGroups = [
    {
      label: "Fruits",
      options: [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana", disabled: true },
        { value: "blueberry", label: "Blueberry" },
      ],
    },
    {
      label: "Vegetables",
      options: [
        { value: "carrot", label: "Carrot" },
        { value: "broccoli", label: "Broccoli" },
        { value: "spinach", label: "Spinach" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Basic Select</h3>
        <DynamicSelect
          options={fruits}
          placeholder="Select a fruit"
          onChange={setSelectedFruit}
          value={selectedFruit}
        />
        {selectedFruit && (
          <p className="text-sm text-muted-foreground">
            Selected: {selectedFruit}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Grouped Select</h3>
        <DynamicSelect groups={foodGroups} placeholder="Select a food" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Custom Rendering</h3>
        <DynamicSelect
          options={fruits}
          placeholder="Select a fruit"
          renderItem={(option) => (
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
              {option.label}
            </div>
          )}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Disabled Select</h3>
        <DynamicSelect options={fruits} placeholder="Select a fruit" disabled />
      </div>
    </div>
  );
}
