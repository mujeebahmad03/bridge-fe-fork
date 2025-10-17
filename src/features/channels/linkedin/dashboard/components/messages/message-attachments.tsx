"use client";

import { Download, Eye, FileText, ImageIcon } from "lucide-react";
import Image from "next/image";

import type { Attachment } from "@/linkedin/dashboard/types";
import { formatFileSize } from "@/linkedin/dashboard/utils";

interface MessageAttachmentsProps {
  attachments: Attachment[];
}

export function MessageAttachments({ attachments }: MessageAttachmentsProps) {
  const handleDownload = (attachment: Attachment) => {
    const link = document.createElement("a");
    link.href = attachment.url;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (attachment: Attachment) => {
    window.open(attachment.url, "_blank");
  };

  return (
    <div className="mt-2 space-y-2">
      {attachments.map((attachment) => (
        <div key={attachment.id}>
          {attachment.type === "image" ? (
            <div className="group relative">
              <Image
                src={attachment.url || "/placeholder.svg"}
                alt={attachment.name}
                width={300}
                height={300}
                className="h-auto max-w-full cursor-pointer rounded-lg transition-opacity hover:opacity-90"
                onClick={() => handlePreview(attachment)}
                style={{ maxHeight: "300px" }}
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/0 opacity-0 transition-colors group-hover:bg-black/20 group-hover:opacity-100">
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePreview(attachment)}
                    className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                    title="Preview"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDownload(attachment)}
                    className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-lg border border-background/20 bg-background/10 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-background/20">
                {attachment.mimeType.includes("pdf") ? (
                  <FileText className="h-5 w-5 text-red-500" />
                ) : attachment.mimeType.includes("image") ? (
                  <ImageIcon className="h-5 w-5 text-blue-500" />
                ) : (
                  <FileText className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">
                  {attachment.name}
                </div>
                <div className="text-xs opacity-70">
                  {formatFileSize(attachment.size)}
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handlePreview(attachment)}
                  className="rounded p-1 transition-colors hover:bg-background/20"
                  title="Preview"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDownload(attachment)}
                  className="rounded p-1 transition-colors hover:bg-background/20"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
