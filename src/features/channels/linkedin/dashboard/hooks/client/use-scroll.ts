import { useEffect, useRef, useState } from "react";
import type { Conversation } from "@/linkedin/dashboard/types";

export function useScrollManagement(conversation: Conversation | null) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
  };

  const checkScrollPosition = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    setShowScrollButton(!isNearBottom);
    setShouldAutoScroll(isNearBottom);
  };

  const handleScrollToBottom = () => {
    scrollToBottom();
    setShouldAutoScroll(true);
  };

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScrollPosition);
    return () => el.removeEventListener("scroll", checkScrollPosition);
  }, []);

  useEffect(() => {
    if (shouldAutoScroll && conversation?.messages) {
      setTimeout(() => scrollToBottom(), 100);
    }
  }, [conversation?.messages, shouldAutoScroll]);

  useEffect(() => {
    if (conversation) {
      setShouldAutoScroll(true);
      setTimeout(() => scrollToBottom(false), 100);
    }
  }, [conversation]);

  return {
    messagesEndRef,
    messagesContainerRef,
    showScrollButton,
    scrollToBottom,
    handleScrollToBottom,
  };
}
