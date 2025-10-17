"use client";

import { useState, useMemo } from "react";

import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { ModalHeader } from "@/emails/email-setup/components/modal-header";
import {
  AccountsTable,
  PageHeader,
  Pagination,
} from "@/linkedin/account-mgt/components";
import {
  LinkedInConnectionModeSelection,
  LinkedInAccountForm,
  LinkedInCsvUploadForm,
} from "@/linkedin/linkedin-setup";

import { useLinkedInSetup } from "@/hooks/channels";
import type { Account } from "@/linkedin/account-mgt/types";

// Mock data - in a real app this would come from an API
const mockAccounts: Account[] = [
  {
    id: 1,
    username: "Thenoskshade",
    status: "syncing",
    lastSynced: "27 May 2025, 15:45",
  },
  {
    id: 2,
    username: "Andrebitcham",
    status: "failed",
    lastSynced: "27 May 2025, 15:45",
  },
  {
    id: 3,
    username: "jaysontyper",
    status: "connected",
    lastSynced: "27 May 2025, 15:45",
  },
  {
    id: 4,
    username: "jaysontyper",
    status: "connected",
    lastSynced: "27 May 2025, 15:45",
  },
  {
    id: 5,
    username: "marketingpro",
    status: "connected",
    lastSynced: "26 May 2025, 14:30",
  },
  {
    id: 6,
    username: "salesexpert",
    status: "syncing",
    lastSynced: "26 May 2025, 12:15",
  },
  {
    id: 7,
    username: "businessdev",
    status: "failed",
    lastSynced: "25 May 2025, 18:20",
  },
  {
    id: 8,
    username: "networkguru",
    status: "connected",
    lastSynced: "25 May 2025, 16:45",
  },
];

export default function LinkedInAccountManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState("5");
  const [showSetupModal, setShowSetupModal] = useState(false);
  const linkedInSetup = useLinkedInSetup();

  // Calculate pagination
  const rowsPerPageNum = Number.parseInt(rowsPerPage);
  const totalPages = Math.ceil(mockAccounts.length / rowsPerPageNum);

  const paginatedAccounts = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPageNum;
    const endIndex = startIndex + rowsPerPageNum;
    return mockAccounts.slice(startIndex, endIndex);
  }, [currentPage, rowsPerPageNum]);

  // Reset to page 1 when rows per page changes
  const handleRowsPerPageChange = (newRowsPerPage: string) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const handleDownloadCSV = () => {
    console.log("Download CSV template");
  };

  const handleImportCSV = () => {
    console.log("Import via CSV");
    setShowSetupModal(true);
    linkedInSetup.reset();
  };

  const handleAddAccount = () => {
    console.log("Add new LinkedIn account");
    setShowSetupModal(true);
    linkedInSetup.reset();
  };

  const handleEditAccount = (account: Account) => {
    console.log("Edit account:", account);
  };

  const handleSyncAccount = (account: Account) => {
    console.log("Sync account:", account);
  };

  const handleDeleteAccount = (account: Account) => {
    console.log("Delete account:", account);
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
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          onDownloadCSV={handleDownloadCSV}
          onImportCSV={handleImportCSV}
          onAddAccount={handleAddAccount}
        />

        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          {/* Title and Illustration */}
          <div className="relative p-6 pb-0">
            <h1 className="mb-6 text-2xl font-semibold text-primary">
              LinkedIn Account Management
            </h1>
          </div>

          <AccountsTable
            accounts={paginatedAccounts}
            onEdit={handleEditAccount}
            onSync={handleSyncAccount}
            onDelete={handleDeleteAccount}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>
      </div>

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
    </div>
  );
}
