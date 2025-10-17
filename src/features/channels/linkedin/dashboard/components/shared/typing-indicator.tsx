"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TypingIndicatorProps {
  avatar: string;
}

export function TypingIndicatorComponent({ avatar }: TypingIndicatorProps) {
  return (
    <div className="flex items-start gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar || "/placeholder.svg"} alt="Contact" />
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
      <div className="rounded-lg bg-muted px-4 py-2">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
