import { motion, AnimatePresence } from "framer-motion";

import { BulkSelectCheckbox } from "@/emails/dashboard/components/bulk-actions";

interface SelectAllCheckboxProps {
  show: boolean;
  checked: boolean;
  indeterminate: boolean;
  onCheckedChange: () => void;
}

export const SelectAllCheckbox = ({
  show,
  checked,
  indeterminate,
  onCheckedChange,
}: SelectAllCheckboxProps) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.8, x: -10 }}
        transition={{ duration: 0.2 }}
      >
        <BulkSelectCheckbox
          checked={checked}
          indeterminate={indeterminate}
          onCheckedChange={onCheckedChange}
          className="mr-2"
        />
      </motion.div>
    )}
  </AnimatePresence>
);
