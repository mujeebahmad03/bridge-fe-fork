"use client";

import type { Editor } from "@tiptap/react";
import { ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "./tooltip-wrapper";

interface ImageControlProps {
  editor: Editor;
}

export const ImageControl = ({ editor }: ImageControlProps) => {
  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      if (!e.target) return;
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          editor.chain().focus().setImage({ src: result }).run();
        }
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };

  return (
    <TooltipWrapper content="Insert image">
      <Button
        size="sm"
        variant="ghost"
        onClick={addImage}
        className="h-8 w-8 p-0 transition-all duration-200 hover:bg-accent/50"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
    </TooltipWrapper>
  );
};
