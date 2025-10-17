import { useQuery } from "@tanstack/react-query";

import { useMessagingStore } from "@/linkedin/dashboard/stores";
import { messagingApi } from "@/linkedin/dashboard/lib/api";

export function useConversations() {
  const searchQuery = useMessagingStore((state) => state.searchQuery);

  return useQuery({
    queryKey: ["conversations", searchQuery],
    queryFn: () =>
      searchQuery
        ? messagingApi.searchConversations(searchQuery)
        : messagingApi.getConversations(),
  });
}

export function useSelectedConversation() {
  const selectedConversationId = useMessagingStore(
    (state) => state.selectedConversationId,
  );

  return useQuery({
    queryKey: ["conversation", selectedConversationId],
    queryFn: () =>
      selectedConversationId
        ? messagingApi.getConversation(selectedConversationId)
        : null,
    enabled: !!selectedConversationId,
  });
}

export function useMessageSearch() {
  const selectedConversationId = useMessagingStore(
    (state) => state.selectedConversationId,
  );
  const messageSearchQuery = useMessagingStore(
    (state) => state.messageSearchQuery,
  );

  return useQuery({
    queryKey: ["messageSearch", selectedConversationId, messageSearchQuery],
    queryFn: () =>
      selectedConversationId && messageSearchQuery
        ? messagingApi.searchMessages(
            selectedConversationId,
            messageSearchQuery,
          )
        : [],
    enabled: !!selectedConversationId && !!messageSearchQuery,
  });
}
