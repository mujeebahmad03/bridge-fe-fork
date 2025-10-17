import type {
  Conversation,
  Message,
  MessageReaction,
  Attachment,
} from "@/linkedin/dashboard/types";

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate file upload
const simulateFileUpload = async (
  file: File,
  onProgress?: (progress: number) => void,
): Promise<Attachment> => {
  // Simulate upload progress
  for (let progress = 0; progress <= 100; progress += 10) {
    await delay(100);
    onProgress?.(progress);
  }

  // Create mock URL (in real app, this would be from your file storage service)
  const mockUrl = URL.createObjectURL(file);

  return {
    id: Date.now().toString(),
    name: file.name,
    url: mockUrl,
    type: file.type.startsWith("image/") ? "image" : "file",
    size: file.size,
    mimeType: file.type,
  };
};

// Mock data
const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Senior Product Manager at Google",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the quick response! Looking forward to our call.",
    timestamp: "2m",
    unread: true,
    isOnline: true,
    messages: [
      {
        id: "1",
        sender: "contact",
        content:
          "Hi! I saw your profile and would love to connect about the PM role at our company.",
        timestamp: "10:30 AM",
        status: "read",
        type: "text",
      },
      {
        id: "2",
        sender: "user",
        content:
          "Hi Sarah! Thanks for reaching out. I'd be happy to learn more about the opportunity.",
        timestamp: "10:45 AM",
        status: "read",
        type: "text",
      },
      {
        id: "3",
        sender: "contact",
        content:
          "Great! Are you available for a quick call this week to discuss the details?",
        timestamp: "11:00 AM",
        status: "read",
        type: "text",
      },
      {
        id: "4",
        sender: "user",
        content:
          "I'm free Thursday or Friday afternoon. What works best for you?",
        timestamp: "11:15 AM",
        status: "read",
        type: "text",
      },
      {
        id: "5",
        sender: "contact",
        content: "Thanks for the quick response! Looking forward to our call.",
        timestamp: "11:20 AM",
        isLatest: true,
        status: "delivered",
        type: "text",
        reactions: [{ id: "1", emoji: "👍", userId: "user", userName: "You" }],
      },
      {
        id: "6",
        sender: "user",
        content: "Here's my portfolio for reference",
        timestamp: "11:25 AM",
        status: "read",
        type: "file",
        attachments: [
          {
            id: "1",
            name: "portfolio.pdf",
            url: "/placeholder.svg?height=200&width=200&text=PDF",
            type: "file",
            size: 2048576,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    role: "Engineering Manager at Meta",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The technical interview went well. Next steps?",
    timestamp: "1h",
    isOnline: false,
    messages: [
      {
        id: "1",
        sender: "user",
        content: "Hi Michael, thanks for the interview today!",
        timestamp: "2:00 PM",
        status: "read",
        type: "text",
      },
      {
        id: "2",
        sender: "contact",
        content: "The technical interview went well. Next steps?",
        timestamp: "2:30 PM",
        isLatest: true,
        status: "delivered",
        type: "text",
      },
    ],
  },
  {
    id: "3",
    name: "Emily Johnson",
    role: "UX Designer at Airbnb",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Would love to collaborate on that project!",
    timestamp: "3h",
    isOnline: true,
    messages: [
      {
        id: "1",
        sender: "contact",
        content: "Hey! I saw your design work on Dribbble. Really impressive!",
        timestamp: "9:00 AM",
        status: "read",
        type: "text",
      },
      {
        id: "2",
        sender: "user",
        content: "Thank you! I really appreciate the feedback.",
        timestamp: "9:15 AM",
        status: "read",
        type: "text",
      },
      {
        id: "3",
        sender: "contact",
        content: "Would love to collaborate on that project!",
        timestamp: "9:30 AM",
        isLatest: true,
        status: "delivered",
        type: "text",
      },
      {
        id: "4",
        sender: "contact",
        content: "Check out this design inspiration",
        timestamp: "9:35 AM",
        status: "delivered",
        type: "image",
        attachments: [
          {
            id: "2",
            name: "design-inspiration.jpg",
            url: "/placeholder.svg?height=300&width=400&text=Design+Image",
            type: "image",
            size: 1024000,
            mimeType: "image/jpeg",
          },
        ],
      },
    ],
  },
];

// API functions
export const messagingApi = {
  // Get all conversations
  getConversations: async (): Promise<Conversation[]> => {
    await delay(500);
    return [...mockConversations];
  },

  // Get conversation by ID
  getConversation: async (id: string): Promise<Conversation | null> => {
    await delay(300);
    return mockConversations.find((conv) => conv.id === id) || null;
  },

  // Send text message
  sendMessage: async (
    conversationId: string,
    content: string,
  ): Promise<Message> => {
    await delay(800);

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      isLatest: true,
      type: "text",
    };

    // Update mock data
    const conversation = mockConversations.find((c) => c.id === conversationId);
    if (conversation) {
      // Remove isLatest from other messages
      conversation.messages.forEach((msg) => (msg.isLatest = false));

      // Add new message
      conversation.messages.push(newMessage);
      conversation.lastMessage = content;
      conversation.timestamp = "now";
      conversation.unread = false;
    }

    return newMessage;
  },

  // Send file message
  sendFileMessage: async (
    conversationId: string,
    files: File[],
    content?: string,
    onProgress?: (fileId: string, progress: number) => void,
  ): Promise<Message> => {
    // Upload files
    const attachments: Attachment[] = [];

    for (const file of files) {
      const attachment = await simulateFileUpload(file, (progress) => {
        onProgress?.(file.name, progress);
      });
      attachments.push(attachment);
    }

    await delay(500);

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content:
        content ||
        (attachments.length === 1
          ? `Sent ${attachments[0].name}`
          : `Sent ${attachments.length} files`),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      isLatest: true,
      type: attachments[0]?.type === "image" ? "image" : "file",
      attachments,
    };

    // Update mock data
    const conversation = mockConversations.find((c) => c.id === conversationId);
    if (conversation) {
      // Remove isLatest from other messages
      conversation.messages.forEach((msg) => (msg.isLatest = false));

      // Add new message
      conversation.messages.push(newMessage);
      conversation.lastMessage = newMessage.content;
      conversation.timestamp = "now";
      conversation.unread = false;
    }

    return newMessage;
  },

  // Search messages within conversation
  searchMessages: async (
    conversationId: string,
    query: string,
  ): Promise<Message[]> => {
    await delay(300);

    const conversation = mockConversations.find((c) => c.id === conversationId);
    if (!conversation || !query.trim()) return [];

    return conversation.messages.filter(
      (message) =>
        message.content.toLowerCase().includes(query.toLowerCase()) ||
        message.attachments?.some((att) =>
          att.name.toLowerCase().includes(query.toLowerCase()),
        ),
    );
  },

  // Simulate contact response
  simulateContactResponse: async (
    conversationId: string,
  ): Promise<Message | null> => {
    await delay(2000 + Math.random() * 3000);

    const responses = [
      "That sounds great!",
      "I'll get back to you on that.",
      "Thanks for the update!",
      "Let me think about it.",
      "Perfect timing!",
      "When would work best for you?",
      "I appreciate you reaching out.",
      "That's exactly what I was looking for.",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    const responseMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: "contact",
      content: randomResponse,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "delivered",
      isLatest: true,
      type: "text",
    };

    // Update mock data
    const conversation = mockConversations.find((c) => c.id === conversationId);
    if (conversation) {
      // Remove isLatest from other messages
      conversation.messages.forEach((msg) => (msg.isLatest = false));

      // Add response message
      conversation.messages.push(responseMessage);
      conversation.lastMessage = randomResponse;
      conversation.timestamp = "now";
    }

    return responseMessage;
  },

  // Add reaction to message
  addReaction: async (
    conversationId: string,
    messageId: string,
    emoji: string,
  ): Promise<MessageReaction> => {
    await delay(200);

    const conversation = mockConversations.find((c) => c.id === conversationId);
    const message = conversation?.messages.find((m) => m.id === messageId);

    if (message) {
      if (!message.reactions) message.reactions = [];

      const existingReaction = message.reactions.find(
        (r) => r.emoji === emoji && r.userId === "user",
      );

      if (existingReaction) {
        // Remove reaction
        message.reactions = message.reactions.filter(
          (r) => !(r.emoji === emoji && r.userId === "user"),
        );
        throw new Error("Reaction removed");
      } else {
        // Add reaction
        const newReaction: MessageReaction = {
          id: Date.now().toString(),
          emoji,
          userId: "user",
          userName: "You",
        };
        message.reactions.push(newReaction);
        return newReaction;
      }
    }

    throw new Error("Message not found");
  },

  // Update typing status
  updateTypingStatus: async (
    conversationId: string,
    isTyping: boolean,
  ): Promise<void> => {
    await delay(100);

    const conversation = mockConversations.find((c) => c.id === conversationId);
    if (conversation) {
      conversation.isTyping = isTyping;
    }
  },

  // Search conversations
  searchConversations: async (query: string): Promise<Conversation[]> => {
    await delay(300);

    if (!query.trim()) return [...mockConversations];

    return mockConversations.filter(
      (conv) =>
        conv.name.toLowerCase().includes(query.toLowerCase()) ||
        conv.role.toLowerCase().includes(query.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(query.toLowerCase()),
    );
  },
};
