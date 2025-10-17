"use client";

import { motion } from "framer-motion";
import { ResponsiveSidebar } from "@/emails/dashboard/components/sidebar";
import { AnimatedEmailContent } from "@/emails/dashboard/components/email-content";
import { ResponsiveHeader } from "@/emails/dashboard/components/layout/header";
import { ResponsiveEmailList } from "@/emails/dashboard/components/email-list";

import { useEmailListLogic } from "@/emails/dashboard/hooks/ui";
import { useEmailClientStore } from "@/emails/dashboard/stores";

export function TabletContent() {
  const { showSidebar, showTabletSearch, setShowSidebar, setShowTabletSearch } =
    useEmailClientStore();

  const { selectedEmail, activeFolder, searchQuery, setSearchQuery } =
    useEmailListLogic();

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <ResponsiveHeader
        activeFolder={activeFolder}
        onMenuToggle={() => setShowSidebar(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={showTabletSearch}
        onSearchToggle={() => setShowTabletSearch(!showTabletSearch)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Email List - 40% width */}
        <motion.div
          className="w-2/5 overflow-hidden border-r border-border/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <ResponsiveEmailList
            isLoading={false}
            showHeader={false}
            showSearch={false}
          />
        </motion.div>

        {/* Email Content - 60% width */}
        <motion.div
          className="flex-1 overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <AnimatedEmailContent email={selectedEmail} />
        </motion.div>
      </div>

      <ResponsiveSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        activeFolder={activeFolder}
        isLoading={false}
      />
    </div>
  );
}
