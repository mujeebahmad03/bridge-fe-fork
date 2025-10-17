"use client";

import { useState } from "react";

import { LinkedInPageHeader } from "./linkedin-page-header";
import { LinkedInMessagingDashboard } from "./linkedin-messaging-dashboard";
import { LinkedInEmptyState } from "./linkedin-empty-state";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { ModalHeader } from "@/emails/email-setup/components/modal-header";
import {
  LinkedInAccountForm,
  LinkedInConnectionModeSelection,
  LinkedInCsvUploadForm,
} from "@/linkedin/linkedin-setup";

import { mockLinkedInAccounts } from "@/data/mock-linkedin-accounts";
import { useLinkedInSetup } from "@/hooks/channels";

export default function LinkedInPage() {
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const linkedInSetup = useLinkedInSetup();

  const hasLinkedInAccounts = mockLinkedInAccounts.length > 0;

  const handleAddAccount = () => {
    setShowSetupModal(true);
    linkedInSetup.reset();
  };

  const handleScheduleMessage = () => {
    setShowScheduleModal(true);
  };

  const handleSetupComplete = () => {
    setShowSetupModal(false);
    linkedInSetup.reset();
  };

  const renderSetupContent = () => {
    switch (linkedInSetup.state.step) {
      case "connection-mode":
        return (
          <LinkedInConnectionModeSelection
            onSelectMode={linkedInSetup.setConnectionMode}
          />
        );
      case "form":
        if (linkedInSetup.state.connectionMode === "single") {
          return <LinkedInAccountForm onSubmit={handleSetupComplete} />;
        } else {
          return <LinkedInCsvUploadForm onUpload={handleSetupComplete} />;
        }
      default:
        return (
          <LinkedInConnectionModeSelection
            onSelectMode={linkedInSetup.setConnectionMode}
          />
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <LinkedInPageHeader onAddAccount={handleAddAccount} />

      {/* Main Content */}
      {hasLinkedInAccounts ? (
        <LinkedInMessagingDashboard onScheduleMessage={handleScheduleMessage} />
      ) : (
        <LinkedInEmptyState onConnectAccount={handleAddAccount} />
      )}

      {/* Setup Modal */}
      <ResponsiveModal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
      >
        <ModalHeader
          showBackButton={linkedInSetup.state.step !== "connection-mode"}
          onBack={linkedInSetup.goBack}
          onClose={() => setShowSetupModal(false)}
        />
        <div className="p-6 md:p-8">{renderSetupContent()}</div>
      </ResponsiveModal>

      {/* Schedule Message Modal */}
      <ResponsiveModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      >
        <ModalHeader onClose={() => setShowScheduleModal(false)} />
        <div className="p-6">
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold">Schedule Message</h2>
            <p className="text-muted-foreground">
              Schedule message functionality coming soon...
            </p>
          </div>
        </div>
      </ResponsiveModal>
    </div>
  );
}
