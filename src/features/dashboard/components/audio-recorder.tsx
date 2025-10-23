"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, X, Check } from "lucide-react";

interface AudioRecorderProps {
  onTranscript: (text: string) => void;
  variant?: "icon" | "inline";
  isRecording?: boolean;
  onRecordingChange?: (recording: boolean) => void;
}

export function AudioRecorder({
  onTranscript,
  variant = "icon",
  isRecording: externalIsRecording,
  onRecordingChange,
}: AudioRecorderProps) {
  const [internalIsRecording, setInternalIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const isRecording =
    externalIsRecording !== undefined
      ? externalIsRecording
      : internalIsRecording;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        console.log("Audio blob:", audioBlob);

        // In a real implementation, you would send this to a transcription API
        // For now, we'll simulate a transcription
        const mockTranscript =
          "Send new email to John about the quarterly report";
        onTranscript(mockTranscript);

        // Clean up
        stream.getTracks().forEach((track) => track.stop());
        setInternalIsRecording(false);
        onRecordingChange?.(false);
        setRecordingTime(0);
      };

      mediaRecorder.start();
      setInternalIsRecording(true);
      onRecordingChange?.(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      // Clear the audio chunks to prevent processing
      audioChunksRef.current = [];
      setInternalIsRecording(false);
      onRecordingChange?.(false);
      setRecordingTime(0);

      // Stop all tracks
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (variant === "inline" && isRecording) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
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
          onClick={cancelRecording}
          className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={stopRecording}
          className="h-8 w-8 rounded-full bg-foreground text-background hover:bg-foreground/90"
        >
          <Check className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={isRecording ? stopRecording : startRecording}
      className={`h-10 w-10 rounded-full ${
        isRecording
          ? "animate-pulse text-red-500 hover:text-red-600"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Mic className="h-4 w-4" />
    </Button>
  );
}
