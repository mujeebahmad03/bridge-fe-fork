"use client";

import { useState, useCallback, useMemo } from "react";
import {
  emojis,
  emojiCategories,
  quickReactions,
  frequentEmojis,
  type EmojiData,
} from "@/linkedin/dashboard/lib/data";
import {
  searchEmojis,
  getEmojisByCategory,
  getRecentEmojis,
  addToRecentEmojis,
} from "@/linkedin/dashboard/utils/emoji-utils";

export interface UseEmojiPickerOptions {
  onEmojiSelect?: (emoji: string) => void;
  maxRecentEmojis?: number;
  enableSkinTones?: boolean;
  enableSearch?: boolean;
  defaultCategory?: string;
}

export function useEmojiPicker(options: UseEmojiPickerOptions = {}) {
  const {
    onEmojiSelect,
    maxRecentEmojis = 24,
    enableSkinTones = true,
    enableSearch = true,
    defaultCategory = "recent",
  } = options;

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkinTone, setSelectedSkinTone] = useState<string>("default");
  const [recentEmojis, setRecentEmojis] = useState<string[]>(() =>
    getRecentEmojis(),
  );

  // Skin tone options
  const skinTones = useMemo(
    () => [
      { id: "default", name: "Default", emoji: "👋" },
      { id: "light", name: "Light", emoji: "👋🏻" },
      { id: "medium-light", name: "Medium Light", emoji: "👋🏼" },
      { id: "medium", name: "Medium", emoji: "👋🏽" },
      { id: "medium-dark", name: "Medium Dark", emoji: "👋🏾" },
      { id: "dark", name: "Dark", emoji: "👋🏿" },
    ],
    [],
  );

  // Get filtered emojis based on search and category
  const filteredEmojis = useMemo(() => {
    let result: EmojiData[] = [];

    if (selectedCategory === "recent") {
      // Show recent emojis
      result = recentEmojis
        .map((emojiChar) => emojis.find((e) => e.emoji === emojiChar))
        .filter((e): e is EmojiData => e !== undefined)
        .slice(0, maxRecentEmojis);
    } else {
      // Show emojis by category
      result = getEmojisByCategory(emojis, selectedCategory);
    }

    // Apply search filter
    if (searchQuery && enableSearch) {
      result = searchEmojis(result, searchQuery);
    }

    return result;
  }, [
    selectedCategory,
    searchQuery,
    recentEmojis,
    maxRecentEmojis,
    enableSearch,
  ]);

  // Get quick reactions
  const getQuickReactions = useCallback(() => {
    return quickReactions;
  }, []);

  // Get frequent emojis
  const getFrequentEmojis = useCallback(() => {
    return frequentEmojis.slice(0, 24);
  }, []);

  // Handle emoji selection
  const selectEmoji = useCallback(
    (emoji: string) => {
      // Apply skin tone if applicable and enabled
      let finalEmoji = emoji;
      if (enableSkinTones && selectedSkinTone !== "default") {
        const emojiData = emojis.find((e) => e.emoji === emoji);
        if (emojiData?.skinTones) {
          const skinToneIndex = skinTones.findIndex(
            (tone) => tone.id === selectedSkinTone,
          );
          if (skinToneIndex > 0 && emojiData.skinTones[skinToneIndex - 1]) {
            finalEmoji = emojiData.skinTones[skinToneIndex - 1];
          }
        }
      }

      // Add to recent emojis
      addToRecentEmojis(finalEmoji);
      setRecentEmojis((prev) => {
        const filtered = prev.filter((e) => e !== finalEmoji);
        return [finalEmoji, ...filtered].slice(0, maxRecentEmojis);
      });

      // Call the callback
      onEmojiSelect?.(finalEmoji);
    },
    [
      enableSkinTones,
      selectedSkinTone,
      skinTones,
      maxRecentEmojis,
      onEmojiSelect,
    ],
  );

  // Handle category change
  const changeCategory = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery(""); // Clear search when changing category
  }, []);

  // Handle search
  const handleSearch = useCallback(
    (query: string) => {
      if (enableSearch) {
        setSearchQuery(query);
        if (query.trim()) {
          // Switch to a category that has results, or stay in current
          const hasResults = searchEmojis(emojis, query).length > 0;
          if (hasResults && selectedCategory === "recent") {
            setSelectedCategory("smileys"); // Default to smileys for search
          }
        }
      }
    },
    [enableSearch, selectedCategory],
  );

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  // Handle skin tone change
  const changeSkinTone = useCallback(
    (skinToneId: string) => {
      if (enableSkinTones) {
        setSelectedSkinTone(skinToneId);
      }
    },
    [enableSkinTones],
  );

  // Get available categories (filter out recent if no recent emojis)
  const availableCategories = useMemo(() => {
    return emojiCategories.filter((category) => {
      if (category.id === "recent") {
        return recentEmojis.length > 0;
      }
      return true;
    });
  }, [recentEmojis]);

  return {
    // State
    selectedCategory,
    searchQuery,
    selectedSkinTone,
    recentEmojis,

    // Data
    filteredEmojis,
    availableCategories,
    skinTones,

    // Actions
    selectEmoji,
    changeCategory,
    handleSearch,
    clearSearch,
    changeSkinTone,

    // Helpers
    getQuickReactions,
    getFrequentEmojis,

    // Options
    enableSkinTones,
    enableSearch,
  };
}
