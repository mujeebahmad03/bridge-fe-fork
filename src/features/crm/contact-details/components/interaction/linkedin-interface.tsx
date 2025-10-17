"use client";

import { useState } from "react";
import { ChatArea } from "@/linkedin/dashboard/components/chats";
import { cn } from "@/lib/utils";

export function LinkedInInterface() {
  const [showMobileChat, setShowMobileChat] = useState(false);

  const handleBackToList = () => {
    setShowMobileChat(false);
  };

  return (
    <div className="space-y-4">
      <ChatArea
        onBackToList={handleBackToList}
        className={cn("flex-1", showMobileChat ? "flex" : "hidden lg:flex")}
      />
    </div>
  );
}
