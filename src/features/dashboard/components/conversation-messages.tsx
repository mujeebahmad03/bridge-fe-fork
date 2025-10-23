"use client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ConversationMessagesProps {
  messages: Message[];
  isLoading: boolean;
  loadingState: string;
}

export function ConversationMessages({
  messages,
  isLoading,
  loadingState,
}: ConversationMessagesProps) {
  return (
    <div className="mb-32 space-y-8">
      {messages.map((message, index) => (
        <div key={index}>
          {message.role === "user" ? (
            <div className="mb-6">
              <span className="inline-block rounded-full bg-muted px-4 py-2 text-sm text-foreground">
                {message.content}
              </span>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-foreground">
              <div className="whitespace-pre-line text-base leading-relaxed">
                {message.content}
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-sm">{loadingState}</span>
        </div>
      )}
    </div>
  );
}
