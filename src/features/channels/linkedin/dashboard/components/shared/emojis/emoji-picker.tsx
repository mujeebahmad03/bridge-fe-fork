"use client";

import { Search, X, Smile } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  useEmojiPicker,
  type UseEmojiPickerOptions,
} from "@/linkedin/dashboard/hooks/client";

import { cn } from "@/lib/utils";

interface EmojiPickerProps extends UseEmojiPickerOptions {
  isOpen: boolean;
  onClose: () => void;
  position?: "top" | "bottom";
  className?: string;
}

export function EmojiPicker({
  isOpen,
  onClose,
  position = "top",
  className = "",
  ...options
}: EmojiPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [hoveredEmoji, setHoveredEmoji] = useState<string | null>(null);

  const {
    selectedCategory,
    searchQuery,
    selectedSkinTone,
    filteredEmojis,
    availableCategories,
    skinTones,
    selectEmoji,
    changeCategory,
    handleSearch,
    clearSearch,
    changeSkinTone,
    enableSkinTones,
    enableSearch,
  } = useEmojiPicker(options);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      // Focus search input when opened
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    selectEmoji(emoji);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={pickerRef}
      className={cn(
        "absolute right-1 z-50 flex h-96 w-80 flex-col overflow-hidden rounded-lg border border-border bg-popover shadow-lg duration-200 animate-in fade-in-0 zoom-in-95",
        position === "top" ? "bottom-full mb-2" : "top-full mt-2",
        className,
      )}
      style={{ bottom: "100%" }}
    >
      {/* Header */}
      <div className="border-b border-border p-3">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Emojis</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-muted"
            title="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        {enableSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search emojis..."
              className="h-9 border-border bg-muted pl-10 pr-10 focus-visible:ring-2 focus-visible:ring-primary"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 transform p-0 hover:bg-accent"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Categories */}
      <div
        className="flex overflow-x-auto border-b border-border bg-muted/30"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {availableCategories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            onClick={() => changeCategory(category.id)}
            className={`h-10 flex-1 rounded-none text-lg transition-colors hover:bg-muted ${
              selectedCategory === category.id
                ? "bg-muted text-primary"
                : "text-muted-foreground"
            }`}
            title={category.name}
          >
            {category.icon}
          </Button>
        ))}
      </div>

      {/* Skin Tone Selector */}
      {enableSkinTones && selectedCategory !== "recent" && (
        <div className="flex items-center gap-1 border-b border-border bg-muted/20 p-2">
          <span className="mr-2 text-xs text-muted-foreground">Skin tone:</span>
          {skinTones.map((tone) => (
            <Button
              key={tone.id}
              variant="ghost"
              size="sm"
              onClick={() => changeSkinTone(tone.id)}
              className={`h-6 w-6 rounded-full p-0 text-sm transition-colors hover:bg-muted ${
                selectedSkinTone === tone.id
                  ? "bg-muted ring-2 ring-primary"
                  : ""
              }`}
              title={tone.name}
            >
              {tone.emoji}
            </Button>
          ))}
        </div>
      )}

      {/* Emoji Grid */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredEmojis.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
            <Smile className="mb-2 h-8 w-8" />
            <p className="text-sm">
              {searchQuery
                ? "No emojis found"
                : selectedCategory === "recent"
                  ? "No recent emojis"
                  : "No emojis"}
            </p>
          </div>
        ) : (
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: "repeat(8, minmax(0, 1fr))" }}
          >
            {filteredEmojis.map((emoji, index) => (
              <Button
                key={`${emoji.emoji}-${emoji.name}-${index}`}
                variant="ghost"
                size="sm"
                onClick={() => handleEmojiSelect(emoji.emoji)}
                onMouseEnter={() => setHoveredEmoji(emoji.name)}
                onMouseLeave={() => setHoveredEmoji(null)}
                className="h-8 w-8 transform rounded-md p-0 text-lg transition-all duration-150 hover:scale-110 hover:bg-muted"
                title={emoji.name}
              >
                {emoji.emoji}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Footer with hovered emoji info */}
      {hoveredEmoji && (
        <div className="border-t border-border bg-muted/30 p-2">
          <p className="text-center text-xs capitalize text-muted-foreground">
            {hoveredEmoji}
          </p>
        </div>
      )}
    </div>
  );
}
