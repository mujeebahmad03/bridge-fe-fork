"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Minimize2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChatArea } from "./chat-area";
import { ChatInput } from "./chat-input";

import { useChat } from "@/dashboard/hooks";

interface AIAssistantProps {
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export function AIAssistant({
  isExpanded,
  onToggleExpanded,
}: AIAssistantProps) {
  const [input, setInput] = useState("");
  const { messages, isLoading, messagesEndRef, sendMessage } = useChat();

  const handleSubmit = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  return (
    <motion.div layout transition={{ duration: 0.3, ease: "easeInOut" }}>
      <Card className="overflow-hidden border-primary/20 bg-card shadow-lg">
        <CardContent className="p-6">
          <motion.div layout className="space-y-4">
            <motion.div layout className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <motion.div
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Sparkles className="h-3 w-3 text-primary" />
                </motion.div>
                <h2 className="text-lg font-medium text-foreground">
                  AI Assistant
                </h2>
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onToggleExpanded}
                      className="h-8 w-8 p-0 hover:bg-muted"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative"
                >
                  <Input
                    placeholder="✍️ Draft message  ➕ Add lead  📆 Today's tasks"
                    className="h-12 cursor-pointer border-muted-foreground/20 bg-muted/50 pr-12 text-base transition-all duration-200 hover:bg-muted/70 focus:border-primary focus:bg-background"
                    onClick={onToggleExpanded}
                    readOnly
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 bg-primary p-0 transition-transform hover:scale-110 hover:bg-primary/90"
                    onClick={onToggleExpanded}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 20, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <ChatArea
                    messages={messages}
                    isLoading={isLoading}
                    messagesEndRef={messagesEndRef}
                  />
                  <ChatInput
                    input={input}
                    setInput={setInput}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
