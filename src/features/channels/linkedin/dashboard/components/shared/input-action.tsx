"use client";

import { ImageIcon, Paperclip } from "lucide-react";
import { useRef } from "react";

import { EmojiButton } from "./emojis";

interface InputActionsProps {
  onFileSelect: (files: File[]) => void;
  onEmojiSelect: (emoji: string) => void;
  disabled?: boolean;
}

export function InputActions({
  onFileSelect,
  onEmojiSelect,
  disabled = false,
}: InputActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileSelect(files);
    }
  };

  return (
    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center gap-1">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileInputChange}
      />
      <input
        ref={imageInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="rounded-md p-1 hover:bg-accent disabled:opacity-50"
        disabled={disabled}
        title="Attach file"
      >
        <Paperclip className="h-4 w-4 text-muted-foreground" />
      </button>
      <button
        onClick={() => imageInputRef.current?.click()}
        className="rounded-md p-1 hover:bg-accent disabled:opacity-50"
        disabled={disabled}
        title="Add image"
      >
        <ImageIcon className="h-4 w-4 text-muted-foreground" />
      </button>
      <EmojiButton
        onEmojiSelect={onEmojiSelect}
        className="rounded-md p-1 hover:bg-accent disabled:opacity-50"
        disabled={disabled}
        size="sm"
        position="bottom"
        enableSkinTones={true}
        enableSearch={true}
      />
    </div>
  );
}
