import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { TEXT_SIZES } from "@/emails/dashboard/constants";

interface EmailSubjectProps {
  subject: string;
  isRead: boolean;
  textSizes: typeof TEXT_SIZES.comfortable;
}

export function EmailSubject({
  subject,
  isRead,
  textSizes,
}: EmailSubjectProps) {
  return (
    <motion.h3
      className={cn(
        textSizes.subject,
        "mb-1 line-clamp-1",
        !isRead
          ? "font-semibold text-foreground"
          : "font-normal text-foreground/90",
      )}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
    >
      {subject}
    </motion.h3>
  );
}
