import { motion } from "framer-motion";

interface EmailBodyProps {
  content: string;
}

export function EmailBody({ content }: EmailBodyProps) {
  return (
    <motion.div
      className="prose prose-sm max-w-none dark:prose-invert"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
    >
      {content.split("\n\n").map((paragraph, index) => (
        <motion.p
          key={index}
          className="mb-4 text-sm leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.7 + index * 0.1,
          }}
        >
          {paragraph}
        </motion.p>
      ))}
    </motion.div>
  );
}
