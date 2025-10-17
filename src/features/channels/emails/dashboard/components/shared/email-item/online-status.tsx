import { motion, AnimatePresence } from "framer-motion";

interface OnlineStatusProps {
  isOnline: boolean;
}

export function OnlineStatus({ isOnline }: OnlineStatusProps) {
  return (
    <AnimatePresence>
      {isOnline && (
        <motion.div
          className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.2 }}
        />
      )}
    </AnimatePresence>
  );
}
