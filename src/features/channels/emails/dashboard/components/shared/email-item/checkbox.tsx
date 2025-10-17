import { AnimatedCheckboxProps } from "@/emails/dashboard/types";
import { motion, AnimatePresence } from "framer-motion";
import { BulkSelectCheckbox } from "@/emails/dashboard/components/bulk-actions";

export function AnimatedCheckbox({
  isSelectionMode,
  isBulkSelected,
  onBulkSelect,
  emailId,
}: AnimatedCheckboxProps) {
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBulkSelect?.(emailId);
  };

  return (
    <AnimatePresence>
      {(isSelectionMode || isBulkSelected) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-1 flex-shrink-0"
          onClick={handleCheckboxClick}
        >
          <BulkSelectCheckbox
            checked={isBulkSelected}
            onCheckedChange={() => onBulkSelect?.(emailId)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
