"use client";

import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AccountSelectorProps {
  selectedAccount: string;
  selectedPeriod: string;
  onAccountChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
}

export function AccountSelector({
  selectedAccount,
  selectedPeriod,
  onAccountChange,
  onPeriodChange,
}: AccountSelectorProps) {
  return (
    <div className="flex-1 space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-muted-foreground">
          LinkedIn Account
        </label>
        <Select value={selectedAccount} onValueChange={onAccountChange}>
          <SelectTrigger className="w-full max-w-xs">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-primary/10 text-xs text-primary">
                  SP
                </AvatarFallback>
              </Avatar>
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stephendayo">Stephendayo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select value={selectedPeriod} onValueChange={onPeriodChange}>
          <SelectTrigger className="w-full max-w-xs">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 Days</SelectItem>
            <SelectItem value="30">Last 30 Days</SelectItem>
            <SelectItem value="90">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
