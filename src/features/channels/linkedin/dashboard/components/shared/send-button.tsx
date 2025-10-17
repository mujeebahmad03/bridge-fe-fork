"use client";

import { Send, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SendButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading?: boolean;
}

export function SendButton({
  onClick,
  disabled,
  isLoading = false,
}: SendButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="default"
      size="icon"
      className="min-w-[40px]"
      title="Send message"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Send className="h-4 w-4" />
      )}
    </Button>
  );
}
