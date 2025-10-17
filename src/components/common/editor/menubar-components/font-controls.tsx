"use client";

import type { Editor } from "@tiptap/react";
import { Type } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipWrapper } from "./tooltip-wrapper";

interface FontControlsProps {
  editor: Editor;
}

const fontFamilies = [
  { label: "Default", value: "Inter" },
  { label: "Comic Sans MS", value: "Comic Sans MS" },
  { label: "Arial", value: "Arial" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Helvetica", value: "Helvetica" },
];

const fontSizes = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
  "48px",
];

export const FontControls = ({ editor }: FontControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <TooltipWrapper content="Font family">
        <Select
          value={editor.getAttributes("textStyle").fontFamily}
          onValueChange={(value) =>
            editor.chain().focus().setFontFamily(value).run()
          }
        >
          <SelectTrigger className="h-8 w-[160px] border-border/50 bg-background/50 transition-all duration-200 hover:bg-accent/50">
            <Type className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Font..." />
          </SelectTrigger>

          <SelectContent className="border border-border/50 bg-popover/95 backdrop-blur-sm">
            {fontFamilies.map((font) => (
              <SelectItem
                key={font.value}
                value={font.value}
                className="hover:bg-accent/50"
              >
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TooltipWrapper>

      <TooltipWrapper content="Font size">
        <Select
          value={editor.getAttributes("textStyle").size}
          onValueChange={(value) =>
            editor.chain().focus().setMark("textStyle", { size: value }).run()
          }
        >
          <SelectTrigger className="h-8 w-[80px] border-border/50 bg-background/50 transition-all duration-200 hover:bg-accent/50">
            <SelectValue placeholder="Size..." />
          </SelectTrigger>
          <SelectContent className="border border-border/50 bg-popover/95 backdrop-blur-sm">
            {fontSizes.map((size) => (
              <SelectItem
                key={size}
                value={size}
                className="hover:bg-accent/50"
              >
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TooltipWrapper>
    </div>
  );
};
