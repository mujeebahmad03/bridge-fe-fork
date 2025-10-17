"use client";

import { ChevronDown, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Sender {
  id: string;
  name: string;
  initials: string;
  hasWarning?: boolean;
}

interface SenderSelectorProps {
  value?: Sender;
  onChange: (sender: Sender | undefined) => void;
  senders: Sender[];
}

export function SenderSelector({
  value,
  onChange,
  senders,
}: SenderSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-12 w-full justify-between rounded-xl border-2 px-4 text-left font-normal shadow-sm transition-colors"
        >
          <span
            className={
              value ? "font-medium text-foreground" : "text-muted-foreground"
            }
          >
            {value ? value.name : "Select a sender ..."}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-full min-w-[400px] shadow-lg"
      >
        {senders.map((sender) => (
          <DropdownMenuItem
            key={sender.id}
            onClick={() => onChange(sender)}
            className="flex items-center gap-3 p-4 transition-colors"
          >
            <div className="flex flex-1 items-center gap-3">
              <Avatar className="h-9 w-9 bg-primary shadow-sm">
                <AvatarFallback className="text-sm font-semibold text-white">
                  {sender.initials}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">{sender.name}</span>
              {sender.hasWarning && (
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
        {senders.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onChange(undefined)}
              className="justify-center p-4 text-center text-muted-foreground transition-colors hover:bg-muted"
            >
              Clear Senders
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
