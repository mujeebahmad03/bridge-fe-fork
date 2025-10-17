import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui";
import { ConversationAvatar } from "./conversation-avatar";
import type { Conversation } from "@/linkedin/dashboard/types";

interface ConversationInfoProps {
  conversation: Conversation;
  isTyping: boolean;
  onBackToList: () => void;
}

export function ConversationInfo({
  conversation,
  isTyping,
  onBackToList,
}: ConversationInfoProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onBackToList}
      >
        <ArrowLeft className="h-5 w-5 text-muted-foreground" />
      </Button>

      <ConversationAvatar conversation={conversation} />

      <div>
        <h2 className="font-semibold text-foreground">{conversation.name}</h2>
        <p className="text-sm text-muted-foreground">
          {isTyping ? (
            <span className="text-primary">typing...</span>
          ) : (
            conversation.role
          )}
        </p>
      </div>
    </div>
  );
}
