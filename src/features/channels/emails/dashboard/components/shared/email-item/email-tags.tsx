import { AnimatePresence, motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EmailTagProps {
  tag: string;
  index: number;
}

function EmailTag({ tag, index }: EmailTagProps) {
  return (
    <motion.div
      key={tag}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        delay: 0.3 + index * 0.05,
      }}
      whileHover={{ scale: 1.05 }}
    >
      <Badge
        variant={tag === "important" ? "default" : "secondary"}
        className={cn(
          "h-5 px-2 text-xs transition-all duration-200 hover:shadow-sm",
          tag === "important"
            ? "bg-destructive text-destructive-foreground"
            : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        {tag}
      </Badge>
    </motion.div>
  );
}

// Email Tags Container Component
interface EmailTagsProps {
  tags: string[];
}

export function EmailTags({ tags }: EmailTagsProps) {
  if (tags.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-wrap gap-1"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2, delay: 0.3 }}
      >
        {tags.map((tag, tagIndex) => (
          <EmailTag key={tag} tag={tag} index={tagIndex} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
