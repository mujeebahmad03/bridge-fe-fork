"use client";

import type { Editor } from "@tiptap/react";
import { VariableIcon, Plus, Search, Sparkles } from "lucide-react";
import { useState } from "react";

import {
  Badge,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Separator,
} from "@/components/ui";
import { TooltipWrapper } from "./tooltip-wrapper";

import { defaultVariables, type Variable } from "@/config/variable";

interface VariableControlProps {
  editor: Editor;
}

export const VariableControl = ({ editor }: VariableControlProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customVariables, setCustomVariables] = useState<Variable[]>([]);
  const [newVariableName, setNewVariableName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const allVariables = [...defaultVariables, ...customVariables];

  const filteredVariables = allVariables.filter(
    (variable) =>
      variable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variable.syntax.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const insertVariable = (variable: Variable) => {
    editor
      .chain()
      .focus()
      .setVariable({
        id: variable.id,
        name: variable.name,
        syntax: variable.syntax,
      })
      .run();
    setIsOpen(false);
    setSearchTerm("");
  };

  const addCustomVariable = () => {
    if (!newVariableName.trim()) return;

    const id = newVariableName.toLowerCase().replace(/\s+/g, "");
    const syntax = `{{${id}}}`;

    const newVariable: Variable = {
      id,
      name: newVariableName.trim(),
      syntax,
      icon: <Sparkles className="h-4 w-4" />,
    };

    setCustomVariables((prev) => [...prev, newVariable]);
    setNewVariableName("");
    setShowAddForm(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <TooltipWrapper content="Insert variable">
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-2 px-3 transition-all duration-200 hover:bg-accent/50 hover:shadow-sm"
          >
            <VariableIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Variables</span>
          </Button>
        </PopoverTrigger>
      </TooltipWrapper>
      <PopoverContent
        className="w-80 border border-border/50 bg-popover/95 shadow-lg backdrop-blur-sm"
        align="start"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <VariableIcon className="h-4 w-4 text-primary" />
              <h4 className="font-medium leading-none">Insert Variable</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Add dynamic variables to your template.
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search variables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 bg-background/50 pl-9"
            />
          </div>

          <ScrollArea className="h-48">
            <div className="space-y-1">
              {filteredVariables.map((variable) => (
                <Button
                  key={variable.id}
                  variant="ghost"
                  className="h-auto w-full justify-start p-3 transition-all duration-200 hover:bg-accent/50"
                  onClick={() => insertVariable(variable)}
                >
                  <div className="flex w-full items-center gap-3">
                    <div className="flex-shrink-0 text-muted-foreground">
                      {variable.icon}
                    </div>
                    <div className="flex min-w-0 flex-col items-start">
                      <span className="w-full truncate text-sm font-medium">
                        {variable.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className="font-mono text-xs text-primary"
                      >
                        {variable.syntax}
                      </Badge>
                    </div>
                  </div>
                </Button>
              ))}

              {filteredVariables.length === 0 && searchTerm && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  <Search className="mx-auto mb-2 h-8 w-8 opacity-50" />
                  No variables found
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          {!showAddForm ? (
            <Button
              variant="outline"
              size="sm"
              className="w-full transition-all duration-200 hover:bg-accent/50"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Custom Variable
            </Button>
          ) : (
            <div className="space-y-3">
              <Input
                placeholder="Variable name (e.g., 'Email Address')"
                value={newVariableName}
                onChange={(e) => setNewVariableName(e.target.value)}
                className="h-9 bg-background/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addCustomVariable();
                  } else if (e.key === "Escape") {
                    setShowAddForm(false);
                    setNewVariableName("");
                  }
                }}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={addCustomVariable}
                  className="flex-1"
                >
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewVariableName("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
