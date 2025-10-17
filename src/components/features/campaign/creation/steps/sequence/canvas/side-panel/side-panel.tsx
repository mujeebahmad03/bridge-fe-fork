"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EmailComposer, MessageComposer } from "./content/composers";

import { StepType } from "@/types/flow";
import { CallTaskCreator, ManualTaskCreator } from "./content/tasks";

interface SidePanelProps {
  panelOpen: boolean;
  type: StepType | null;
}

export const SidePanel = ({ panelOpen, type }: SidePanelProps) => {
  function renderComposer() {
    if (type === "email") return <EmailComposer />;
    if (type === "call") return <CallTaskCreator />;
    if (type === "manualTask") return <ManualTaskCreator />;
    else return <MessageComposer />;
  }

  return (
    <AnimatePresence>
      {panelOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="absolute right-0 top-0 z-40 h-full w-[540px] overflow-y-auto bg-background shadow-lg"
        >
          <div className="p-6">{renderComposer()}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
