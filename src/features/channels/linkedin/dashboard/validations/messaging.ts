import { z } from "zod";

// Message content validation
export const messageContentSchema = z
  .string()
  .trim()
  .min(1, "Message cannot be empty")
  .max(2000, "Message cannot exceed 2000 characters")
  .refine(
    (content) => {
      // Basic XSS prevention - no script tags
      const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
      return !scriptRegex.test(content);
    },
    { message: "Invalid content detected" },
  );

// Search query validation
export const searchQuerySchema = z
  .string()
  .trim()
  .max(100, "Search query too long")
  .optional()
  .transform((val) => val || "");

// File validation - validate File objects directly
const validateFileObject = (file: File) => {
  const allowedTypes = [
    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    // Documents
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    // Archives
    "application/zip",
    "application/x-rar-compressed",
  ];

  if (!file.name || file.name.length === 0) {
    throw new Error("File name is required");
  }

  if (file.size > 10 * 1024 * 1024) {
    // 10MB limit
    throw new Error("File size cannot exceed 10MB");
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error("File type not supported");
  }

  return file;
};

// Multiple files validation
const validateFilesArray = (files: File[]) => {
  if (files.length > 5) {
    throw new Error("Cannot upload more than 5 files at once");
  }

  // Validate each file
  files.forEach(validateFileObject);

  // Check total size
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > 50 * 1024 * 1024) {
    // 50MB total limit
    throw new Error("Total file size cannot exceed 50MB");
  }

  return files;
};

// Emoji validation (prevent malicious unicode)
export const emojiSchema = z
  .string()
  .length(1, "Invalid emoji")
  .refine(
    (emoji) => {
      // Basic emoji unicode range check
      const emojiRegex =
        /^[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]+$/u;
      return emojiRegex.test(emoji);
    },
    { message: "Invalid emoji" },
  );

// Conversation ID validation
export const conversationIdSchema = z
  .string()
  .uuid("Invalid conversation ID")
  .or(z.string().regex(/^[a-zA-Z0-9]+$/, "Invalid conversation ID format"));

// Message ID validation
export const messageIdSchema = z
  .string()
  .min(1, "Message ID required")
  .regex(/^[a-zA-Z0-9-_]+$/, "Invalid message ID format");

// Combined validation schemas for API calls
export const sendTextMessageSchema = z.object({
  content: messageContentSchema,
  conversationId: conversationIdSchema,
});

export const addReactionSchema = z.object({
  messageId: messageIdSchema,
  emoji: emojiSchema,
  conversationId: conversationIdSchema,
});

export const searchMessagesSchema = z.object({
  query: searchQuerySchema,
  conversationId: conversationIdSchema,
});

// Export validation functions
export const validateMessageContent = (content: string) => {
  try {
    return messageContentSchema.parse(content);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw error;
  }
};

export const validateFiles = (files: File[]) => {
  return validateFilesArray(files);
};

export const validateEmoji = (emoji: string) => {
  try {
    return emojiSchema.parse(emoji);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw error;
  }
};
