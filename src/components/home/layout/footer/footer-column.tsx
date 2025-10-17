"use client";

import { motion } from "framer-motion";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
  delay?: number;
}

export function FooterColumn({ title, links, delay = 0 }: FooterColumnProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-foreground dark:text-white">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <motion.li
            key={link.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: delay + index * 0.05,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            <motion.a
              href={link.href}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary dark:text-gray-300 dark:hover:text-blue-400"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              {link.name}
            </motion.a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
