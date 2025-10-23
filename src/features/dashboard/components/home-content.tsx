"use client";

import type React from "react";
import { Send, X, Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AudioRecorder } from "./audio-recorder";
import { QuickActions } from "./quick-actions";
import { TaskList } from "./task-list";
import { mockTasks } from "../data";

interface HomeContentProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onQuickAction: (action: string) => void;
  onTranscript: (text: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function HomeContent({
  input,
  onInputChange,
  onSubmit,
  onQuickAction,
  onTranscript,
  inputRef,
}: HomeContentProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleViewAllTasks = () => {
    onQuickAction("Today's tasks");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRecordingChange = (recording: boolean) => {
    setIsRecording(recording);
    if (recording) {
      const timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setRecordingTime(0);
    }
  };

  return (
    <div className="ml-16 flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-2xl px-8 py-12">
        {/* Greeting */}
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-3xl font-semibold text-foreground">
            Good afternoon, Stephen!
          </h1>
          <p className="text-muted-foreground">
            Time to focus on what matters most!
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={onSubmit} className="mb-6">
          {isRecording ? (
            <div className="flex h-14 items-center gap-3 rounded-xl border border-border bg-card px-6">
              <span className="text-sm italic text-muted-foreground">
                Listening...
              </span>
              <span className="ml-auto font-mono text-sm text-foreground">
                {formatTime(recordingTime)}
              </span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => setIsRecording(false)}
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                onClick={() => setIsRecording(false)}
                className="h-8 w-8 rounded-full bg-foreground text-background hover:bg-foreground/90"
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="relative">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="What can I do for you?"
                className="h-14 w-full rounded-xl border border-border bg-card pl-6 pr-24 text-foreground placeholder:text-muted-foreground"
              />
              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-2">
                <AudioRecorder
                  onTranscript={onTranscript}
                  isRecording={isRecording}
                  onRecordingChange={handleRecordingChange}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </form>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions onActionClick={onQuickAction} />
        </div>

        <div className="mb-8">
          <TaskList
            tasks={mockTasks}
            maxDisplay={6}
            onViewAll={handleViewAllTasks}
          />
        </div>
      </div>
    </div>
  );
}
