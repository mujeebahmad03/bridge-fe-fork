"use client";

import { Upload } from "lucide-react";

export function FileDropZone() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg border-2 border-dashed border-primary bg-primary/10">
      <div className="text-center">
        <Upload className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h3 className="mb-2 text-lg font-semibold text-primary">
          Drop files here
        </h3>
        <p className="text-sm text-muted-foreground">
          Release to upload files and images
        </p>
      </div>
    </div>
  );
}
