import { Mail, Users, Target } from "lucide-react";

import { SettingsSection } from "./settings-section";
import { SettingItem } from "./settings-item";

interface EmailSettingsSectionProps {
  settings: {
    stopAutoReply: boolean;
    stopSameCompany: boolean;
    prioritizeLeads: boolean;
  };
  updateSetting: (key: string, value: string | boolean) => void;
}

export function EmailSettingsSection({
  settings,
  updateSetting,
}: EmailSettingsSectionProps) {
  return (
    <SettingsSection title="Email Settings" icon={<Mail className="h-5 w-5" />}>
      <SettingItem
        title="Stop sending emails on auto reply"
        description="Stop sending emails to a lead if a response has been received"
        type="toggle"
        value={settings.stopAutoReply}
        onChange={(value) => updateSetting("stopAutoReply", value)}
        icon={<Mail className="h-4 w-4" />}
      />
      <SettingItem
        title="Stop campaign for people reply from the same company"
        description="Stop sending emails to a lead if a response has been received"
        type="toggle"
        value={settings.stopSameCompany}
        onChange={(value) => updateSetting("stopSameCompany", value)}
        icon={<Users className="h-4 w-4" />}
      />
      <SettingItem
        title="Prioritize new lead over follow-ups"
        description="Stop sending emails to a lead if a response has been received"
        type="toggle"
        value={settings.prioritizeLeads}
        onChange={(value) => updateSetting("prioritizeLeads", value)}
        icon={<Target className="h-4 w-4" />}
      />
    </SettingsSection>
  );
}
