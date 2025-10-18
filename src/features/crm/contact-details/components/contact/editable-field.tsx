"use client";

import { Edit, Check, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditableFieldProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  onSave: (value: string) => void;
  multiline?: boolean;
  className?: string;
  type?: string;
}

export function EditableField({
  label,
  value,
  icon,
  onSave,
  multiline = false,
  className,
  type,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <div className={`flex items-start gap-3 text-sm ${className}`}>
      {icon && (
        <div className="mt-1 flex h-9 w-9 min-w-9 items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
      )}
      {type !== "contact" && (
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{label}</p>
            {!isEditing && (
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-3 w-3" />
              </Button>
            )}
          </div>
          {isEditing ? (
            <div className="space-y-2">
              {multiline ? (
                <Textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="min-h-[80px] text-sm"
                />
              ) : (
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="text-sm"
                />
              )}
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>
                  <Check className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ) : (
            <p className={`font-medium ${multiline ? "" : "truncate"}`}>
              {value}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
