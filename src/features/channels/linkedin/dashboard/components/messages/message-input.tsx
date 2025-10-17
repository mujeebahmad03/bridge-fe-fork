"use client";

import { useState, useRef } from "react";
import { MessageTextInput } from "./message-text-input";

import {
  FileDropZone,
  FilePreview,
  InputActions,
  SendButton,
} from "@/linkedin/dashboard/components/shared";
import {
  useDragAndDrop,
  useMessaging,
  useTypingIndicator,
} from "@/linkedin/dashboard/hooks/client";

interface MessageInputProps {
  disabled?: boolean;
}

export function MessageInput({ disabled = false }: MessageInputProps) {
  const { sendFileMessage, setTyping, sendMessage } = useMessaging();
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { handleStartTyping, handleStopTyping } = useTypingIndicator(setTyping);

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const { isDragOver, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop(handleFileSelect);

  const handleSendMessage = () => {
    if (selectedFiles.length > 0) {
      sendFileMessage(selectedFiles, message.trim() || undefined);
      setSelectedFiles([]);
      setMessage("");
    } else if (message.trim() && !disabled) {
      sendMessage(message.trim());
      setMessage("");
    }
    handleStopTyping();
  };

  const handleInputChange = (value: string) => {
    setMessage(value);
    if (value.trim()) {
      handleStartTyping();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    // Allow Shift+Enter for new lines
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEmojiSelect = (emoji: string) => {
    handleInputChange(message + emoji);
  };

  const canSend = (message.trim() || selectedFiles.length > 0) && !disabled;

  return (
    <div className="relative">
      {isDragOver && <FileDropZone />}

      <div
        className="border-t border-border bg-card p-4"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FilePreview
          files={selectedFiles}
          onRemoveFile={handleRemoveFile}
          disabled={disabled}
        />

        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <MessageTextInput
              ref={inputRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onBlur={handleStopTyping}
              disabled={disabled}
              hasFiles={selectedFiles.length > 0}
            />
            <InputActions
              onFileSelect={handleFileSelect}
              onEmojiSelect={handleEmojiSelect}
              disabled={disabled}
            />
          </div>
          <SendButton
            onClick={handleSendMessage}
            disabled={!canSend}
            isLoading={disabled}
          />
        </div>
      </div>
    </div>
  );
}
