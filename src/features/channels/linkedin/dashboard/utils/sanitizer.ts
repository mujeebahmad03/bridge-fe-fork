import DOMPurify from "dompurify";

/**
 * Check if we're in a client environment where DOM sanitization is available
 */
const isClient = (): boolean => {
  return typeof window !== "undefined" && !!window.document;
};

/**
 * Sanitize HTML content to prevent XSS attacks
 * Uses DOMPurify on client-side, fallback sanitization on server-side
 * @param dirty - The potentially unsafe HTML string
 * @returns Sanitized HTML string
 */
export const sanitizeHtml = (dirty: string): string => {
  // Client-side: Use DOMPurify for robust sanitization
  if (isClient()) {
    try {
      return DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: ["b", "i", "em", "strong", "u", "br", "p"],
        ALLOWED_ATTR: [],
        ALLOW_DATA_ATTR: false,
      });
    } catch (error) {
      console.error("DOMPurify sanitization failed:", error);
      // Fall through to basic sanitization
    }
  }

  // Server-side or fallback: Basic sanitization without DOM dependency
  return dirty
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/<[^>]*>/g, "") // Remove all HTML tags for server-side safety
    .trim();
};

/**
 * Client-side only HTML sanitization with full DOMPurify features
 * Returns original string on server-side (for SSR compatibility)
 * @param dirty - The potentially unsafe HTML string
 * @param options - DOMPurify configuration options
 * @returns Sanitized HTML string or original string on server
 */
export const sanitizeHtmlClient = (
  dirty: string,
  options?: Parameters<typeof DOMPurify.sanitize>[1],
): string => {
  if (!isClient()) {
    // On server, return original - sanitization happens on client hydration
    return dirty;
  }

  try {
    return DOMPurify.sanitize(dirty, options);
  } catch (error) {
    console.error("HTML sanitization failed:", error);
    return "";
  }
};

/**
 * Sanitize URLs to prevent malicious redirects
 * @param url - The potentially unsafe URL
 * @returns Sanitized URL or empty string if invalid
 */
export const sanitizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);

    // Only allow http/https protocols
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return "";
    }

    // Block suspicious patterns
    const suspicious = ["javascript:", "data:", "vbscript:", "file:", "ftp:"];

    const lowerUrl = url.toLowerCase();
    if (suspicious.some((pattern) => lowerUrl.includes(pattern))) {
      return "";
    }

    return urlObj.toString();
  } catch {
    return "";
  }
};

/**
 * Sanitize text content by removing or escaping dangerous characters
 * @param text - The potentially unsafe text
 * @returns Sanitized text
 */
export const sanitizeText = (text: string): string => {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

/**
 * Sanitize file names to prevent directory traversal
 * @param fileName - The potentially unsafe file name
 * @returns Sanitized file name
 */
export const sanitizeFileName = (fileName: string): string => {
  return fileName
    .replace(/[<>:"\/\\|?*]/g, "") // Remove invalid file name characters
    .replace(/^\.+/, "") // Remove leading dots
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .substring(0, 255); // Limit length
};

/**
 * Validate and sanitize emoji to prevent unicode attacks
 * @param emoji - The potentially unsafe emoji
 * @returns Sanitized emoji or empty string if invalid
 */
export const sanitizeEmoji = (emoji: string): string => {
  // Basic emoji pattern - this is a simplified version
  const emojiPattern =
    /^[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]+$/u;

  if (emoji.length > 4 || !emojiPattern.test(emoji)) {
    return "";
  }

  return emoji;
};

/**
 * Check if DOMPurify is available and ready to use
 * @returns boolean indicating if client-side sanitization is available
 */
export const isSanitizationAvailable = (): boolean => {
  return isClient();
};

/**
 * Get sanitization environment info for debugging
 * @returns object with environment details
 */
export const getSanitizationInfo = () => {
  return {
    isClient: isClient(),
    hasDOMPurify: isClient() && typeof DOMPurify !== "undefined",
    environment: isClient() ? "client" : "server",
  };
};
