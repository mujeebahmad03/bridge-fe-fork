"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MobileSearch } from "./mobile-search";
import { ResponsiveSidebar } from "@/emails/dashboard/components/sidebar";
import { AnimatedEmailContent } from "@/emails/dashboard/components/email-content";
import { ResponsiveHeader } from "@/emails/dashboard/components/layout/header";
import { ResponsiveEmailList } from "@/emails/dashboard/components/email-list";

import { useEmailListLogic } from "@/emails/dashboard/hooks/ui";
import { useEmailClientStore } from "@/emails/dashboard/stores";

export function MobileContent() {
  const {
    mobileView,
    showSidebar,
    showMobileSearch,
    setMobileView,
    setShowSidebar,
    setShowMobileSearch,
  } = useEmailClientStore();

  const { selectedEmail, activeFolder } = useEmailListLogic();

  const handleMobileBack = () => {
    setMobileView("list");
  };

  return (
    <div className="flex h-full flex-1 overflow-hidden">
      <AnimatePresence mode="wait">
        {mobileView === "list" ? (
          <motion.div
            key="mobile-list"
            className="flex h-full w-full flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ResponsiveHeader
              activeFolder={activeFolder}
              onMenuToggle={() => setShowSidebar(true)}
              onSearchToggle={() => setShowMobileSearch(true)}
            />
            <div className="flex-1 overflow-hidden">
              <ResponsiveEmailList
                isLoading={false}
                showHeader={false}
                showSearch={false}
              />
            </div>
          </motion.div>
        ) : selectedEmail ? (
          <motion.div
            key="mobile-content"
            className="flex h-full w-full flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ResponsiveHeader
              activeFolder={activeFolder}
              onMenuToggle={() => setShowSidebar(true)}
              onSearchToggle={() => setShowMobileSearch(true)}
              showBackButton
              onBack={handleMobileBack}
              title={selectedEmail.subject}
            />
            <div className="flex-1 overflow-hidden">
              <AnimatedEmailContent email={selectedEmail} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ResponsiveSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        activeFolder={activeFolder}
        isLoading={false}
      />

      <MobileSearch
        isOpen={showMobileSearch}
        onClose={() => setShowMobileSearch(false)}
      />
    </div>
  );
}
