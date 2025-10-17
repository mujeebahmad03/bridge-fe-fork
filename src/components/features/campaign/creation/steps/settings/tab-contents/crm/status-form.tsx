"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ColorPicker from "./color-picker";

interface Status {
  id: string;
  title: string;
  color: string;
}

interface StatusFormProps {
  status?: Status | null;
  onSave: (status: Omit<Status, "id">) => void;
  onCancel: () => void;
}

const StatusForm = ({ status, onSave, onCancel }: StatusFormProps) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#3b82f6");

  useEffect(() => {
    if (status) {
      setTitle(status.title);
      setColor(status.color);
    } else {
      setTitle("");
      setColor("#3b82f6");
    }
  }, [status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({ title: title.trim(), color });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-1">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Status Title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter status title..."
          className="h-11 border-2 transition-colors focus:border-primary"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Status Color</Label>
        <ColorPicker color={color} onChange={setColor} />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          className="h-11 flex-1 bg-primary text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl"
        >
          {status ? "Update Status" : "Create Status"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="h-11 border-2 px-6 hover:bg-accent"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default StatusForm;
