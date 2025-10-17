import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation } from "@/linkedin/dashboard/types";

interface ConversationAvatarProps {
  conversation: Conversation;
}

export function ConversationAvatar({ conversation }: ConversationAvatarProps) {
  return (
    <div className="relative">
      <Avatar className="h-10 w-10">
        <AvatarImage
          src={conversation.avatar || "/placeholder.svg"}
          alt={conversation.name}
        />
        <AvatarFallback>{conversation.name?.[0]}</AvatarFallback>
      </Avatar>
      {conversation.isOnline && (
        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
      )}
    </div>
  );
}
