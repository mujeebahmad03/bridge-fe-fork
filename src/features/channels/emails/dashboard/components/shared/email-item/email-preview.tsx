import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { TEXT_SIZES } from "@/emails/dashboard/constants";

interface EmailPreviewProps {
  preview: string;
  textSizes: typeof TEXT_SIZES.comfortable;
}

export function EmailPreview({ preview, textSizes }: EmailPreviewProps) {
  return (
    <motion.p
      className={cn(
        textSizes.preview,
        "mb-2 line-clamp-2 leading-relaxed text-muted-foreground",
      )}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.25 }}
    >
      {preview}
    </motion.p>
  );
}
