import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface SearchAndUniboxProps {
  isUniboxEnabled: boolean;
  setIsUniboxEnabled: (enabled: boolean) => void;
}

export function SearchAndUnibox({
  isUniboxEnabled,
  setIsUniboxEnabled,
}: SearchAndUniboxProps) {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input placeholder="Search emails..." className="pl-10" />
      </div>

      <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2">
        <span className="text-sm font-medium">Unibox</span>
        <Switch
          checked={isUniboxEnabled}
          onCheckedChange={setIsUniboxEnabled}
        />
      </div>
    </div>
  );
}
