import { BarChart3, Mail, MessageSquare } from "lucide-react";

import { SettingItem } from "./settings-item";
import { SettingsSection } from "./settings-section";

interface AdvancedSettingsSectionProps {
  settings: {
    autoABTesting: boolean;
    multipleMailboxes: boolean;
    helloReplyEmails: boolean;
  };
  updateSetting: (key: string, value: string | boolean) => void;
}

export function AdvancedSettingsSection({
  settings,
  updateSetting,
}: AdvancedSettingsSectionProps) {
  return (
    <SettingsSection
      title="Advanced Settings"
      icon={<BarChart3 className="h-5 w-5" />}
    >
      <SettingItem
        title="Auto optimize AB testing - (reply rate, open, clicks)"
        description="Stop sending emails to a lead if a response has been received"
        type="toggle"
        value={settings.autoABTesting}
        onChange={(value) => updateSetting("autoABTesting", value)}
        icon={<BarChart3 className="h-4 w-4" />}
      />
      <SettingItem
        title="Account to use (you can select multiple mailboxes/LinkedIn accounts) rotate mailboxes ..."
        type="toggle"
        value={settings.multipleMailboxes}
        onChange={(value) => updateSetting("multipleMailboxes", value)}
        icon={<Mail className="h-4 w-4" />}
      />
      <SettingItem
        title="hello reply emails"
        description="Stop sending emails to a lead if a response has been received"
        type="toggle"
        value={settings.helloReplyEmails}
        onChange={(value) => updateSetting("helloReplyEmails", value)}
        icon={<MessageSquare className="h-4 w-4" />}
      />
    </SettingsSection>
  );
}
