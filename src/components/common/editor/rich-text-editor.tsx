"use client";

import { Extension } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";

import { Variable } from "./extensions";
import { MenuBar } from "./menubar";

import "@/styles/rich-text.css";
import { CharacterCounter } from "./character-counter";

const lowlight = createLowlight(common);

interface FontSizeAttribute {
  size: string;
}

interface FontSizeOptions {
  types: string[];
  defaultSize?: string;
}

// Custom extension for font size with proper typing
const FontSize = Extension.create<FontSizeOptions>({
  name: "fontSize",
  addAttributes() {
    return {
      size: {
        default: this.options?.defaultSize || "16px",
        parseHTML: (element: HTMLElement) => element.style.fontSize,
        renderHTML: (attributes: FontSizeAttribute) => {
          if (!attributes.size) return {};
          return { style: `font-size: ${attributes.size}` };
        },
      },
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options?.types || ["textStyle"],
        attributes: {
          size: {
            default: this.options?.defaultSize || "16px",
            parseHTML: (element: HTMLElement) => element.style.fontSize,
            renderHTML: (attributes: Record<string, string>) => {
              if (!attributes.size) return {};
              return { style: `font-size: ${attributes.size}` };
            },
          },
        },
      },
    ];
  },
});

interface RichTextEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  className?: string;
  minHeight?: string;
  placeholder?: string;
  showMenuBar?: boolean;
  maxCharacters?: number;
  showCharacterCount?: boolean;
}

type HeadingLevel = 1 | 2 | 3;

type TextAlignOptions = "left" | "center" | "right" | "justify";

export const RichTextEditor = ({
  content = "",
  onChange,
  className = "",
  minHeight = "400px",
  placeholder,
  showMenuBar = true,
  maxCharacters = 5000,
  showCharacterCount = true,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3] as HeadingLevel[],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"] as const,
        alignments: [
          "left",
          "center",
          "right",
          "justify",
        ] as TextAlignOptions[],
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
          rel: "noopener noreferrer",
        },
      }),
      TextStyle,
      Color,
      Underline,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      FontFamily.configure({
        types: ["textStyle"] as const,
      }),
      FontSize.configure({
        types: ["textStyle"],
        defaultSize: "16px",
      }),
      CharacterCount.configure({
        limit: maxCharacters,
      }),
      Variable,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-neutral dark:prose-invert max-w-none focus:outline-none ${className}`,
        ...(placeholder && { "data-placeholder": placeholder }),
      },
    },
  });

  return (
    <div className="rich-text-editor group relative overflow-hidden rounded-xl border border-border/50 bg-background shadow-sm transition-all duration-200 focus-within:border-primary/50 focus-within:shadow-lg focus-within:ring-4 focus-within:ring-primary/10 hover:shadow-md">
      <div className="relative">
        <EditorContent
          editor={editor}
          className="relative overflow-hidden"
          style={{ minHeight }}
        />
        {showCharacterCount && editor && (
          <CharacterCounter editor={editor} maxCharacters={maxCharacters} />
        )}

        <MenuBar editor={editor} showMenuBar={showMenuBar} />
      </div>
    </div>
  );
};
