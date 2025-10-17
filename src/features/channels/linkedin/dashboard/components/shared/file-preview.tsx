"use client";

import { Paperclip, X } from "lucide-react";
import Image from "next/image";

import { formatFileSize } from "@/linkedin/dashboard/utils";

interface FilePreviewProps {
  files: File[];
  onRemoveFile: (index: number) => void;
  disabled?: boolean;
}

export function FilePreview({
  files,
  onRemoveFile,
  disabled = false,
}: FilePreviewProps) {
  if (files.length === 0) return null;

  return (
    <div className="mb-3 rounded-lg border border-border bg-muted/50 p-3">
      <div className="mb-2 text-sm text-muted-foreground">
        {files.length} file{files.length !== 1 ? "s" : ""} selected:
      </div>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-md bg-background p-2"
          >
            {file.type.startsWith("image/") ? (
              <Image
                src={URL.createObjectURL(file) || "/placeholder.svg"}
                alt={file.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                <Paperclip className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-foreground">
                {file.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </div>
            </div>
            <button
              onClick={() => onRemoveFile(index)}
              className="rounded-md p-1 hover:bg-muted"
              disabled={disabled}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
