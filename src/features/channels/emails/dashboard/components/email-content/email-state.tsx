import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export function EmptyEmailState() {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-b from-card via-card to-muted/10">
      <motion.div
        className="space-y-4 text-center text-muted-foreground"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted/20"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Mail className="h-8 w-8" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Select an email to view its content
        </motion.p>
        <motion.p
          className="text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Use <kbd className="rounded bg-muted px-1 py-0.5 text-xs">j</kbd> /{" "}
          <kbd className="rounded bg-muted px-1 py-0.5 text-xs">k</kbd> to
          navigate
        </motion.p>
      </motion.div>
    </div>
  );
}
