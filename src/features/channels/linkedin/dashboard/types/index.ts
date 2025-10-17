export interface Message {
  id: string;
  sender: "user" | "contact";
  content: string;
  timestamp: string;
  isLatest?: boolean;
  reactions?: MessageReaction[];
  status?: "sending" | "sent" | "delivered" | "read";
  type?: "text" | "image" | "file";
  attachments?: Attachment[];
}

export interface MessageReaction {
  id: string;
  emoji: string;
  userId: string;
  userName: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: "image" | "file";
  size: number;
  mimeType: string;
}

export interface Conversation {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
  messages: Message[];
  isTyping?: boolean;
  isOnline?: boolean;
}

export interface TypingIndicator {
  conversationId: string;
  isTyping: boolean;
  timestamp: number;
}

export interface FileUpload {
  file: File;
  preview?: string;
  progress: number;
  id: string;
}
