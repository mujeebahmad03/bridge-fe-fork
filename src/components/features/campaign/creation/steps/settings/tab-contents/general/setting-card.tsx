import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SettingsCardProps {
  children: ReactNode;
  className?: string;
}

export function SettingsCard({ children, className }: SettingsCardProps) {
  return (
    <Card className={cn("space-y-6 border-border/50 p-6 shadow-sm", className)}>
      {children}
    </Card>
  );
}
