"use client";

import type { Editor } from "@tiptap/react";
import { Link, ExternalLink } from "lucide-react";
import { useState } from "react";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { TooltipWrapper } from "./tooltip-wrapper";

import { cn } from "@/lib/utils";

interface LinkControlProps {
  editor: Editor;
}

export const LinkControl = ({ editor }: LinkControlProps) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  const setLink = () => {
    if (linkUrl === "") {
      editor.chain().focus().unsetLink().run();
      setIsLinkPopoverOpen(false);
      return;
    }

    if (editor.state.selection.empty && linkText) {
      editor
        .chain()
        .focus()
        .insertContent(linkText)
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    }

    setLinkUrl("");
    setLinkText("");
    setIsLinkPopoverOpen(false);
  };

  return (
    <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
      <TooltipWrapper content="Insert link">
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "h-8 w-8 p-0 transition-all duration-200",
              editor.isActive("link")
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-accent/50",
            )}
          >
            <Link className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </TooltipWrapper>
      <PopoverContent className="w-80 border border-border/50 bg-popover/95 shadow-lg backdrop-blur-sm">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Link</h4>
            <p className="text-sm text-muted-foreground">
              Enter the URL and optional display text for your link.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="url" className="text-sm font-medium">
                URL
              </label>
              <Input
                id="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="col-span-2 h-8"
                placeholder="https://example.com"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="text" className="text-sm font-medium">
                Display Text
              </label>
              <Input
                id="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="col-span-2 h-8"
                placeholder="Optional text"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm" onClick={setLink} className="shadow-sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Add Link
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
