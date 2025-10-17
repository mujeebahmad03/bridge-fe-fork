import { EmojiData } from "@/linkedin/dashboard/lib/data";

export function searchEmojis(emojis: EmojiData[], query: string): EmojiData[] {
  if (!query.trim()) return emojis;

  const searchTerm = query.toLowerCase().trim();

  return emojis.filter(
    (emoji) =>
      emoji.name.toLowerCase().includes(searchTerm) ||
      emoji.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm),
      ) ||
      emoji.emoji.includes(searchTerm),
  );
}

export function getEmojisByCategory(
  emojis: EmojiData[],
  category: string,
): EmojiData[] {
  return emojis.filter((emoji) => emoji.category === category);
}

export function getRecentEmojis(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const recent = localStorage.getItem("recent-emojis");
    return recent ? JSON.parse(recent) : [];
  } catch {
    return [];
  }
}

export function addToRecentEmojis(emoji: string): void {
  if (typeof window === "undefined") return;

  try {
    const recent = getRecentEmojis();
    const filtered = recent.filter((e) => e !== emoji);
    const updated = [emoji, ...filtered].slice(0, 24); // Keep only 24 recent emojis

    localStorage.setItem("recent-emojis", JSON.stringify(updated));
  } catch {
    // Ignore localStorage errors
  }
}

export function getSkinToneVariant(
  baseEmoji: string,
  skinTone: string,
): string {
  // This is a simplified implementation
  // In a real app, you'd have a more comprehensive mapping
  const skinToneMap: Record<string, string> = {
    light: "🏻",
    "medium-light": "🏼",
    medium: "🏽",
    "medium-dark": "🏾",
    dark: "🏿",
  };

  const tone = skinToneMap[skinTone];
  if (!tone) return baseEmoji;

  // Simple replacement - in reality you'd need more sophisticated logic
  return baseEmoji + tone;
}

export function formatEmojiForDisplay(emoji: string): string {
  // Ensure emoji is properly formatted for display
  return emoji.trim();
}

export function isValidEmoji(text: string): boolean {
  // Simple emoji validation - in reality you'd use a more robust method
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
  return emojiRegex.test(text);
}

export function getEmojiUnicode(emoji: string): string {
  return emoji.codePointAt(0)?.toString(16) || "";
}

export function categorizeCustomEmoji(name: string): string {
  // Simple categorization based on name patterns
  if (name.includes("heart") || name.includes("love")) return "symbols";
  if (name.includes("face") || name.includes("smile") || name.includes("laugh"))
    return "smileys";
  if (name.includes("hand") || name.includes("finger")) return "smileys";
  if (name.includes("animal") || name.includes("cat") || name.includes("dog"))
    return "animals";
  if (name.includes("food") || name.includes("drink")) return "food";
  if (name.includes("car") || name.includes("plane") || name.includes("travel"))
    return "travel";
  if (name.includes("ball") || name.includes("sport")) return "activities";
  if (
    name.includes("tool") ||
    name.includes("phone") ||
    name.includes("computer")
  )
    return "objects";
  if (name.includes("flag") || name.includes("country")) return "flags";

  return "symbols"; // Default category
}
