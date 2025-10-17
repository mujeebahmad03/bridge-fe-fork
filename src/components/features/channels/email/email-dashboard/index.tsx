"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { useEmailSetup } from "@/hooks/channels";
import { CsvEmailAccount } from "@/utils/csv-validator";
import type { EmailAccountFormData } from "@/types/email";
import { Button } from "@/components/ui";
import { EmailContent } from "./data-content";
import { EmailAccountForm } from "@/emails/email-setup/components/email-account-form";
import { CsvUploadForm } from "@/emails/email-setup/components/csv-upload-form";
import { ImapSetupGuide } from "@/emails/email-setup/components/imap-setup-guide";
import { ConnectionModeSelection } from "@/emails/email-setup/components/connection-mode-selection";
import { ProviderSelection } from "@/emails/email-setup/components/provider-selection";
import { ModalHeader } from "@/emails/email-setup/components/modal-header";

export default function EmailDashboard() {
  const [showEmailSetup, setShowEmailSetup] = useState(false);
  const [activeTab, setActiveTab] = useState("inbox");

  const emailSetup = useEmailSetup();

  const handleEmailAccountSubmit = (data: EmailAccountFormData) => {
    console.log("Email account data:", data);
    setShowEmailSetup(false);
    emailSetup.reset();
    // Here you would typically save the email account
  };

  const handleCsvUpload = (file: CsvEmailAccount[]) => {
    console.log("CSV file uploaded:", file);
    setShowEmailSetup(false);
    emailSetup.reset();
    // Here you would typically process the CSV file
  };

  const handleCloseModal = () => {
    setShowEmailSetup(false);
    emailSetup.reset();
  };

  return (
    <>
      {/* Page Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-8">
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold text-foreground">Email</h1>
              <p className="text-muted-foreground">
                Send and manage emails right where your leads are.
              </p>
            </div>
            <Button
              className="bg-primary text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl"
              onClick={() => setShowEmailSetup(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Email
            </Button>
          </div>

          <EmailContent activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Empty State */}
          {/* <EmptyState setShowEmailSetup={setShowEmailSetup} /> */}
        </div>
      </main>
      {/* Email Setup Modal */}
      <ResponsiveModal
        isOpen={showEmailSetup}
        onClose={handleCloseModal}
        showCloseButton={false}
      >
        <ModalHeader
          showBackButton={emailSetup.state.step !== "provider"}
          onBack={emailSetup.goBack}
          onClose={handleCloseModal}
        />

        <div className="p-6 md:p-8">
          {emailSetup.state.step === "provider" && (
            <ProviderSelection onSelectProvider={emailSetup.setProvider} />
          )}

          {emailSetup.state.step === "connection-mode" && (
            <ConnectionModeSelection
              onSelectMode={emailSetup.setConnectionMode}
            />
          )}

          {emailSetup.state.step === "imap-setup" && (
            <ImapSetupGuide onContinue={emailSetup.goToForm} />
          )}

          {emailSetup.state.step === "form" &&
            emailSetup.state.connectionMode === "single" && (
              <EmailAccountForm onSubmit={handleEmailAccountSubmit} />
            )}

          {emailSetup.state.step === "form" &&
            emailSetup.state.connectionMode === "multiple" && (
              <CsvUploadForm onUpload={handleCsvUpload} />
            )}
        </div>
      </ResponsiveModal>
    </>
  );
}
