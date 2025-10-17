"use client";

import { FileText, ImageIcon } from "lucide-react";
import Image from "next/image";

import type { FileUpload } from "@/linkedin/dashboard/types";
import { formatFileSize } from "@/linkedin/dashboard/utils";

interface FileUploadPreviewProps {
  uploads: FileUpload[];
}

export function FileUploadPreview({ uploads }: FileUploadPreviewProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/50 p-3">
      <div className="mb-2 text-sm text-muted-foreground">
        Uploading files...
      </div>
      <div className="space-y-2">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="flex items-center gap-3 rounded-md bg-background p-2"
          >
            {upload.preview ? (
              <Image
                src={upload.preview || "/placeholder.svg"}
                alt={upload.file.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded object-cover"
              />
            ) : upload.file.type.startsWith("image/") ? (
              <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-foreground">
                {upload.file.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatFileSize(upload.file.size)}
              </div>

              {/* Progress Bar */}
              <div className="mt-1 h-1 w-full rounded-full bg-muted">
                <div
                  className="h-1 rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${upload.progress}%` }}
                />
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              {upload.progress}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
