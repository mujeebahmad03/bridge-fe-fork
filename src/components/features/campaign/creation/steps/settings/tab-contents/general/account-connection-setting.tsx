import { Mail, Linkedin, Users } from "lucide-react";
import { SettingsSection } from "./settings-section";
import { SettingItem } from "./settings-item";

export function AccountConnectionsSection() {
  return (
    <SettingsSection
      title="Account Connections"
      icon={<Users className="h-5 w-5" />}
    >
      <SettingItem
        title="Accounts to use"
        description="Select one or more accounts to send emails from"
        type="connect"
        icon={<Mail className="h-4 w-4" />}
      />
      <SettingItem
        title="Connect New Email Account"
        type="connect"
        icon={<Mail className="h-4 w-4" />}
      />
      <SettingItem
        title="Connect New LinkedIn Account"
        type="connect"
        icon={<Linkedin className="h-4 w-4" />}
      />
    </SettingsSection>
  );
}
