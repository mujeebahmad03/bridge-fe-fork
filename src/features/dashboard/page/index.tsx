"use client";

import { ArrowLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense, useRef } from "react";

import { ConversationMessages, ChatInput, HomeContent } from "../components";

const mockAIResponses: Record<string, string> = {
  "what can you do?": `As your elite executive assistant, I can help you manage your entire sales workflow seamlessly. Here's what I do for you:

• Manage your deals, contacts, and companies: search, create, update, and link records.
• Retrieve and summarize recent activities like emails, notes, and calls.
• Create and manage tasks, get AI-powered next-step suggestions.
• Generate professional emails instantly and handle sending with your confirmation.
• Schedule meetings and calendar events smartly, avoiding conflicts.
• Add notes and keep your records detailed and organized.
• Proactively anticipate your needs and provide insights.`,
  "get new lead": `I'd be happy to help you capture a new lead! To get started, I'll need some information:

• What's the lead's name?
• What company are they from?
• What's their email address or phone number?
• How did you connect with them? (e.g., conference, referral, website)
• What's their level of interest or any notes about the conversation?

Please provide these details and I'll create the lead record for you.`,
  "send new email":
    "To send a new email, I need to know the recipient or the context (such as a contact or deal) to select the right recipients automatically. Could you please specify the contact or deal this email is related to, or provide the recipient's details?",
  "today's tasks": `Here are your tasks for today:

• Follow up with Acme Corp about proposal (Due: 2:00 PM) - High Priority
• Prepare presentation for TechStart meeting (Due: 4:00 PM)
• Review and approve Q4 budget (Due: End of day)
• Call Sarah Johnson regarding contract renewal (Due: 3:30 PM)

You have 4 tasks total. Would you like me to help you with any of these?`,
};

const loadingStates = [
  "Thinking...",
  "Analyzing your request...",
  "Gathering information...",
  "Preparing response...",
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

function HomeContentWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingState, setLoadingState] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingState((prev) => (prev + 1) % loadingStates.length);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect(() => {
    const query = searchParams.get("query");
    if (sessionId && query && messages.length === 0) {
      setIsLoading(true);

      setMessages([{ role: "user", content: query }]);

      setTimeout(() => {
        const response =
          mockAIResponses[query.toLowerCase()] ||
          `I understand you want to: "${query}". How can I assist you further with this?`;

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response },
        ]);
        setIsLoading(false);
        setLoadingState(0);
      }, 2500);
    }
  }, [sessionId, searchParams, messages.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      if (sessionId) {
        const userMessage = input.trim();
        setMessages((prev) => [
          ...prev,
          { role: "user", content: userMessage },
        ]);
        setInput("");
        setIsLoading(true);

        setTimeout(() => {
          const response =
            mockAIResponses[userMessage.toLowerCase()] ||
            `I understand you want to: "${userMessage}". Let me help you with that.`;

          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: response },
          ]);
          setIsLoading(false);
          setLoadingState(0);
        }, 2500);
      } else {
        const newSessionId = crypto.randomUUID();
        router.push(
          `/dashboard/?session_id=${newSessionId}&query=${encodeURIComponent(input)}`,
        );
        setInput("");
      }
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleTranscript = (text: string) => {
    setInput(text);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleBack = () => {
    router.push("/dashboard");
    setMessages([]);
    setInput("");
  };

  if (sessionId) {
    return (
      <div className="ml-16 min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-8 py-6">
          <button
            onClick={handleBack}
            className="mb-8 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <ConversationMessages
            messages={messages}
            isLoading={isLoading}
            loadingState={loadingStates[loadingState]}
          />

          <ChatInput
            ref={inputRef}
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            onTranscript={handleTranscript}
          />
        </div>
      </div>
    );
  }

  return (
    <HomeContent
      input={input}
      onInputChange={setInput}
      onSubmit={handleSubmit}
      onQuickAction={handleQuickAction}
      onTranscript={handleTranscript}
      inputRef={inputRef}
    />
  );
}

export default function Home() {
  return (
    <>
      <Suspense
        fallback={
          <div className="ml-16 flex min-h-screen items-center justify-center bg-background">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        }
      >
        <HomeContentWrapper />
      </Suspense>
    </>
  );
}
