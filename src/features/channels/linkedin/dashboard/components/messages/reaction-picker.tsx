"use client";

import { useEffect, useRef } from "react";

import { useEmojiPicker } from "@/linkedin/dashboard/hooks/client";

interface ReactionPickerProps {
  onSelectReaction: (emoji: string) => void;
  onClose: () => void;
}

export function ReactionPicker({
  onSelectReaction,
  onClose,
}: ReactionPickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { getQuickReactions } = useEmojiPicker({
    onEmojiSelect: onSelectReaction,
  });

  const reactions = getQuickReactions();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute bottom-full left-0 z-10 mb-2 flex gap-1 rounded-lg border border-border bg-popover p-2 shadow-lg duration-200 animate-in fade-in-0 zoom-in-95"
    >
      {reactions.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onSelectReaction(emoji)}
          className="flex h-8 w-8 transform items-center justify-center rounded-md text-lg transition-colors duration-150 hover:scale-110 hover:bg-muted"
          title={`React with ${emoji}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
