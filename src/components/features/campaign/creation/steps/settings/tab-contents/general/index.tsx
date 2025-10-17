"use client";

import { useState } from "react";

import { AccountConnectionsSection } from "./account-connection-setting";
import { CampaignAutomationSection } from "./campaign-automation";
import { EmailSettingsSection } from "./email-settings";
import { AdvancedSettingsSection } from "./advanced-settings";
import { LimitsTimingSection } from "./limit-timing-section";
import { ContactSignatureSection } from "./contact-signature";

export function GeneralSettings() {
  const [settings, setSettings] = useState({
    stopCampaignReplies: true,
    changeLeadStatus: true,
    createNewTask: true,
    createTaskOnClick: true,
    stopAutoReply: true,
    stopSameCompany: true,
    prioritizeLeads: true,
    autoABTesting: true,
    multipleMailboxes: true,
    helloReplyEmails: true,
    linkedinMessagesPerDay: "30",
    timeBetweenEmails: "30",
    maxEmailsPerDay: "30",
    connectionRequestLimit: "30",
    messageLimit: "30",
    newLeadsLimit: "30",
    followUpsLimit: "30",
    phoneCallTask: true,
    markUnableToContact30: true,
    markUnableToContact30Days: true,
  });

  const updateSetting = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <AccountConnectionsSection />

      <CampaignAutomationSection
        settings={settings}
        updateSetting={updateSetting}
      />

      <EmailSettingsSection settings={settings} updateSetting={updateSetting} />

      <AdvancedSettingsSection
        settings={settings}
        updateSetting={updateSetting}
      />

      <LimitsTimingSection settings={settings} updateSetting={updateSetting} />

      <ContactSignatureSection
        settings={settings}
        updateSetting={updateSetting}
      />
    </>
  );
}
