"use client";

import { X, Plus } from "lucide-react";

import type React from "react";

import { useState } from "react";

import { Button, Input } from "@/components/ui";
import { FileUploader } from "@/components/common";

interface WorksheetFormProps {
  onSubmit: (data: { title: string; file?: File }) => void;
  onCancel: () => void;
}

export function WorksheetForm({ onSubmit, onCancel }: WorksheetFormProps) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      file: file || undefined,
    });
    setTitle("");
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-lg font-medium">
          Title
        </label>
        <Input
          id="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-12 text-base"
        />
      </div>

      <div className="space-y-2">
        <label className="text-lg font-medium">Import CSV</label>
        <FileUploader
          onFileSelect={(selectedFile) => setFile(selectedFile)}
          acceptedFileTypes=".csv"
          maxSize={5}
        />
      </div>

      <div className="flex justify-end gap-3 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="h-12 px-6 text-base font-medium"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button
          type="submit"
          className="h-12 bg-blue-600 px-6 text-base font-medium hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create
        </Button>
      </div>
    </form>
  );
}
