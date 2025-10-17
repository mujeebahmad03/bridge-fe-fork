"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/crmContacts/utils";

interface AvatarDisplayProps {
  name: string;
  avatar?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AvatarDisplay({
  name,
  avatar,
  size = "md",
  className = "",
}: AvatarDisplayProps) {
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-12 w-12 text-base",
  };

  if (avatar && avatar.length <= 3) {
    // Simple avatar initials
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-primary/20 font-medium text-primary ${sizeClasses[size]} ${className}`}
      >
        {avatar}
      </div>
    );
  }

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage
        src={avatar || `/placeholder.svg?height=32&width=32&query=${name}`}
      />
      <AvatarFallback className="text-xs">{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
