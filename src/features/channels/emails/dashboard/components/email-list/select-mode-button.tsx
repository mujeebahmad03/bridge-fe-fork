import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SelectModeButtonProps {
  show: boolean;
  onEnterSelectionMode?: () => void;
}

export const SelectModeButton = ({
  show,
  onEnterSelectionMode,
}: SelectModeButtonProps) => (
  <AnimatePresence>
    {show && onEnterSelectionMode && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onEnterSelectionMode}
          className="gap-2"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="text-sm">Select</span>
        </Button>
      </motion.div>
    )}
  </AnimatePresence>
);
