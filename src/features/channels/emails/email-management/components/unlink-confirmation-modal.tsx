"use client";

import { Button } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { AlertTriangle, Unlink, X } from "lucide-react";
import type { EmailAccount } from "@/types/email-account";
import { ModalHeader } from "../../email-setup/components/modal-header";

interface UnlinkConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  emailAccount: EmailAccount | null;
  onConfirm: () => void;
}

export function UnlinkConfirmationModal({
  isOpen,
  onClose,
  emailAccount,
  onConfirm,
}: UnlinkConfirmationModalProps) {
  if (!emailAccount) return null;

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="max-w-md"
    >
      <ModalHeader showBackButton={false} onClose={onClose} />

      <div className="p-6 md:p-8">
        <div className="space-y-6 text-center">
          {/* Warning Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">
              Unlink Email Account?
            </h2>
            <p className="text-muted-foreground">
              Are you sure you want to unlink{" "}
              <span className="font-semibold text-foreground">
                {emailAccount.email}
              </span>
              ?
            </p>
          </div>

          {/* Warning Message */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
              <div className="text-left text-sm text-red-800 dark:text-red-200">
                <p className="mb-2 font-semibold">
                  This action cannot be undone and will:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Remove the email account from your dashboard</li>
                  <li>Stop all ongoing email campaigns using this account</li>
                  <li>Delete all configuration settings</li>
                  <li>Clear warm-up progress and deliverability data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700"
            >
              <Unlink className="h-4 w-4" />
              Yes, Unlink Account
            </Button>
          </div>
        </div>
      </div>
    </ResponsiveModal>
  );
}
