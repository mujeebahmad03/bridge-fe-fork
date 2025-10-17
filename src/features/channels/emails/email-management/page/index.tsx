"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import {
  ConfigurationModal,
  EmailManagementTable,
  UnlinkConfirmationModal,
} from "../components";

import { dashboardRoutes } from "@/config/routes";
import { mockEmailAccounts } from "@/data/mock-email-accounts";
import type { EmailAccount } from "@/types/email-account";
import { ConfigurationFormData } from "../validations";

export default function EmailManagementPage() {
  const [accounts, setAccounts] = useState(mockEmailAccounts);
  const [selectedAccount, setSelectedAccount] = useState<EmailAccount | null>(
    null,
  );
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showUnlinkModal, setShowUnlinkModal] = useState(false);
  const [accountToUnlink, setAccountToUnlink] = useState<EmailAccount | null>(
    null,
  );
  const { push } = useRouter();

  const handleCheckDeliverability = (accountId: string) => {
    console.log("Checking deliverability for account:", accountId);
    push(`${dashboardRoutes.emails}/${accountId}/delivery-report`);
    // Implement deliverability check logic
  };

  const handleOpenConfiguration = (account: EmailAccount) => {
    setSelectedAccount(account);
    setShowConfigModal(true);
  };

  const handleUnlinkAccount = (accountId: string) => {
    const account = accounts.find((acc) => acc.id === accountId);
    if (account) {
      setAccountToUnlink(account);
      setShowUnlinkModal(true);
    }
  };

  const handleConfirmUnlink = () => {
    if (accountToUnlink) {
      setAccounts((prev) =>
        prev.filter((account) => account.id !== accountToUnlink.id),
      );
      setShowUnlinkModal(false);
      setAccountToUnlink(null);
    }
  };

  const handleToggleWarmUp = (accountId: string, enabled: boolean) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === accountId
          ? {
              ...account,
              warmUp: {
                ...account.warmUp,
                status: enabled ? "warming" : "paused",
              },
            }
          : account,
      ),
    );
  };

  const handleSaveConfiguration = (
    accountId: string,
    config: ConfigurationFormData,
  ) => {
    console.log("Saving configuration for account:", accountId, config);
    // Update the account configuration
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === accountId
          ? {
              ...account,
              configuration: {
                ...account.configuration,
                signature: config.signature,
                sendingLimit: {
                  daily: config.dailyLimit,
                  hourly: config.hourlyLimit,
                },
                optOutLink: config.optOutLink,
                subdomainTracking: config.subdomainTracking,
                domainAuthentication: {
                  dkim: config.dkimEnabled,
                  spf: config.spfEnabled,
                  dmarc: config.dmarcEnabled,
                },
              },
            }
          : account,
      ),
    );
  };

  return (
    <>
      {/* Page Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Page Header */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20" />
            <div className="relative flex items-center justify-between rounded-2xl border border-white/20 p-6 dark:border-white/10">
              <div>
                <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                  Email Account Management
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  Manage and configure your connected email accounts
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* Enhanced Animated Illustration */}
                <div className="relative">
                  <div className="relative h-20 w-20">
                    {/* Email Icons with enhanced styling */}
                    <div className="absolute right-0 top-0 h-7 w-10 animate-float rounded-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-2xl">
                      <div className="absolute inset-1 rounded-md bg-white/30" />
                      <div className="absolute left-2 right-2 top-2 h-0.5 rounded bg-white/50" />
                      <div className="absolute left-2 right-2 top-3.5 h-0.5 rounded bg-white/40" />
                    </div>
                    <div className="absolute bottom-2 left-2 h-5 w-8 animate-float rounded-lg bg-gradient-to-br from-green-500 via-green-600 to-green-700 shadow-2xl delay-300">
                      <div className="absolute inset-1 rounded-md bg-white/30" />
                      <div className="absolute left-1.5 right-1.5 top-1.5 h-0.5 rounded bg-white/50" />
                    </div>
                    <div className="absolute left-0 top-4 h-4 w-6 animate-float rounded-lg bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 shadow-2xl delay-700">
                      <div className="absolute inset-1 rounded-sm bg-white/30" />
                    </div>
                    {/* Floating particles */}
                    <div className="absolute -right-2 -top-2 h-3 w-3 animate-pulse rounded-full bg-blue-200 dark:bg-blue-800" />
                    <div className="absolute -bottom-1 -left-3 h-2 w-2 animate-pulse rounded-full bg-green-200 delay-500 dark:bg-green-800" />
                    <div className="absolute -left-4 top-6 h-1.5 w-1.5 animate-pulse rounded-full bg-purple-200 delay-1000 dark:bg-purple-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email Management Table */}
          <Card className="border-0 bg-gradient-to-br from-card/80 to-card/60 shadow-xl backdrop-blur-xl">
            <div className="p-8">
              <EmailManagementTable
                accounts={accounts}
                onCheckDeliverability={handleCheckDeliverability}
                onOpenConfiguration={handleOpenConfiguration}
                onUnlinkAccount={handleUnlinkAccount}
                onToggleWarmUp={handleToggleWarmUp}
              />
            </div>
          </Card>
        </div>
      </main>

      {/* Configuration Modal */}
      <ConfigurationModal
        isOpen={showConfigModal}
        onClose={() => {
          setShowConfigModal(false);
          setSelectedAccount(null);
        }}
        emailAccount={selectedAccount}
        onSave={handleSaveConfiguration}
      />

      {/* Unlink Confirmation Modal */}
      <UnlinkConfirmationModal
        isOpen={showUnlinkModal}
        onClose={() => {
          setShowUnlinkModal(false);
          setAccountToUnlink(null);
        }}
        emailAccount={accountToUnlink}
        onConfirm={handleConfirmUnlink}
      />
    </>
  );
}
