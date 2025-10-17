import { motion } from "framer-motion";

import { OnlineStatus } from "./online-status";

import { TEXT_SIZES } from "@/emails/dashboard/constants";
import { cn } from "@/lib/utils";

interface EmailHeaderProps {
  sender: string;
  time: string;
  isRead: boolean;
  isOnline: boolean;
  textSizes: typeof TEXT_SIZES.comfortable;
}

export function EmailHeader({
  sender,
  time,
  isRead,
  isOnline,
  textSizes,
}: EmailHeaderProps) {
  return (
    <div className="mb-2 flex items-start justify-between">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <motion.span
          className={cn(
            textSizes.sender,
            "truncate",
            !isRead
              ? "font-semibold text-foreground"
              : "font-normal text-muted-foreground",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          {sender}
        </motion.span>
        <OnlineStatus isOnline={isOnline} />
      </div>
      <motion.span
        className={`${textSizes.time} ml-2 flex-shrink-0 text-muted-foreground`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.15 }}
      >
        {time}
      </motion.span>
    </div>
  );
}
