import { Settings, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SettingItemProps {
  title: string;
  description?: string;
  type: "toggle" | "input" | "connect";
  value?: string | boolean;
  onChange?: (value: string | boolean) => void;
  placeholder?: string;
  suffix?: string;
  icon?: ReactNode;
  className?: string;
}

export function SettingItem({
  title,
  description,
  type,
  value,
  onChange,
  placeholder,
  suffix,
  icon,
  className,
}: SettingItemProps) {
  const renderControl = () => {
    switch (type) {
      case "toggle":
        return (
          <Switch
            checked={value as boolean}
            onCheckedChange={onChange}
            className="data-[state=checked]:bg-primary"
          />
        );
      case "input":
        return (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={value as string}
              onChange={(e) => onChange?.(e.target.value)}
              placeholder={placeholder}
              className="h-8 w-20 text-center"
            />
            {suffix && (
              <span className="text-sm text-muted-foreground">{suffix}</span>
            )}
          </div>
        );
      case "connect":
        return (
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Connect
            <ExternalLink className="h-3 w-3" />
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn("flex items-center justify-between gap-4 py-2", className)}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        {icon && <div className="mt-0.5 text-primary">{icon}</div>}
        <div className="min-w-0 flex-1">
          <Label className="text-sm font-medium leading-5 text-foreground">
            {title}
          </Label>
          {description && (
            <p className="mt-1 text-xs leading-4 text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">{renderControl()}</div>
    </div>
  );
}
