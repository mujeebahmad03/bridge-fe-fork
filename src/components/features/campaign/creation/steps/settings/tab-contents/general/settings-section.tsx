import { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";
import { SettingsCard } from "./setting-card";

interface SettingsSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export function SettingsSection({
  title,
  icon,
  children,
}: SettingsSectionProps) {
  return (
    <SettingsCard>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="text-primary">{icon}</div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <Separator />
        <div className="space-y-4">{children}</div>
      </div>
    </SettingsCard>
  );
}
