"use client";

import type React from "react";

import { useState } from "react";
import { Search, Plus, ChevronDown } from "lucide-react";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { CreateVariableModal } from "./create-variable-modal";
import { defaultVariables, type Variable } from "@/config/variable";

interface VariableSelectorProps {
  onVariableSelect: (variable: Variable) => void;
}

export function VariableSelector({ onVariableSelect }: VariableSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const filteredVariables = defaultVariables.filter((variable) =>
    variable.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleVariableClick = (variable: Variable) => {
    onVariableSelect(variable);
    setOpen(false);
    setSearchTerm("");
  };

  const handleCreateVariable = (variableName: string) => {
    // Here you would typically add the variable to your variables list
    // For now, we'll just close the modal
    console.log("Creating variable:", variableName);
    // You can add logic here to update the variables array
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-10 px-4 text-sm font-medium shadow-sm transition-colors"
        >
          Add variables
          <ChevronDown className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[420px] p-0 shadow-lg" align="start">
        <div className="space-y-5 p-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 pl-10 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              onClick={() => setCreateModalOpen(true)}
              className="h-auto w-full justify-start rounded-lg p-3 text-primary transition-colors hover:bg-primary/10"
            >
              <Plus className="mr-3 h-4 w-4" />
              <span className="font-medium">Create variable</span>
            </Button>
          </div>

          <div className="space-y-1">
            {filteredVariables.map((variable) => (
              <Button
                key={variable.id}
                variant="ghost"
                onClick={() => handleVariableClick(variable)}
                className="h-auto w-full justify-between rounded-lg p-3 transition-colors hover:bg-primary/20"
              >
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground">{variable.icon}</div>
                  <span className="font-medium text-foreground">
                    {variable.name}
                  </span>
                </div>
                <span className="font-mono text-sm font-medium text-primary">
                  {variable.syntax}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <CreateVariableModal
          open={createModalOpen}
          onOpenChange={setCreateModalOpen}
          onSave={handleCreateVariable}
        />
      </PopoverContent>
    </Popover>
  );
}
