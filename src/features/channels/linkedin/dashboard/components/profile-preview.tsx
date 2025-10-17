"use client";

import { MoreHorizontal, Mail, MapPin } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import type { Conversation } from "@/linkedin/dashboard/types";

interface ProfilePreviewProps {
  conversation: Conversation;
  className?: string;
}

export function ProfilePreview({
  conversation,
  className = "",
}: ProfilePreviewProps) {
  return (
    <Card
      className={cn(
        "hidden flex-col overflow-auto border-l border-border bg-card lg:flex",
        className,
      )}
    >
      {/* Profile Header */}
      <CardHeader className="flex flex-col border-b border-border p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1 text-center">
            <div className="relative inline-block">
              <Avatar className="mx-auto mb-3 h-20 w-20">
                <AvatarImage
                  src={conversation.avatar || "/placeholder.svg"}
                  alt={conversation.name}
                />
                <AvatarFallback>{conversation.name?.[0]}</AvatarFallback>
              </Avatar>
              {conversation.isOnline && (
                <div className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-background bg-green-500" />
              )}
            </div>
            <h3 className="mb-1 font-semibold text-foreground">
              {conversation.name}
            </h3>
            <p className="mb-2 text-sm text-muted-foreground">
              {conversation.role}
            </p>
            <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
              2nd connection
            </span>
          </div>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* About */}
      <CardContent className="p-6">
        <h4 className="mb-3 font-semibold text-foreground">About</h4>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Experienced product manager with a passion for building user-centric
          solutions. Currently leading product initiatives at Google with focus
          on mobile experiences.
        </p>
      </CardContent>

      {/* Contact Info */}
      <CardContent className="border-t border-border p-6">
        <h4 className="mb-3 font-semibold text-foreground">Contact Info</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground">Email:</span>
              <span className="ml-2 text-foreground">
                sarah.chen@google.com
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground">Location:</span>
              <span className="ml-2 text-foreground">San Francisco, CA</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Mutual Connections */}
      <CardFooter className="flex flex-col items-start border-t border-border p-6">
        <h4 className="mb-3 font-semibold text-foreground">
          Mutual Connections
        </h4>
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <Avatar key={i} className="h-8 w-8 border-2 border-background">
              <AvatarImage
                src={`/placeholder.svg?height=32&width=32&text=${i}`}
                alt={`Mutual connection ${i}`}
              />
              <AvatarFallback>{i}</AvatarFallback>
            </Avatar>
          ))}
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs text-muted-foreground">
            +5
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
