"use client";

import type React from "react";

import { Upload } from "lucide-react";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  file: File | null;
}

export function FileUploader({ onFileSelected, file }: FileUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelected(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      onFileSelected(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="py-4">
      <div
        className="cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors hover:bg-muted/50"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <div className="mt-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-primary hover:underline"
          >
            Click to upload
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="text-muted-foreground"> or drag and drop</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          CSV only (max. 5MB)
        </p>
      </div>
      {file && (
        <div className="mt-4 rounded-md border p-4">
          <p className="font-medium">{file.name}</p>
          <p className="text-sm text-muted-foreground">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}
    </div>
  );
}
