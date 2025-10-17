"use client";

import { motion } from "framer-motion";
import { Twitter, Linkedin, Github } from "lucide-react";

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
];

export function SocialLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mb-12 flex justify-center space-x-6"
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-background/50 text-muted-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-primary/5 hover:text-primary hover:shadow-md dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-gray-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.6 + index * 0.1,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          <social.icon className="h-5 w-5" />
          <span className="sr-only">{social.name}</span>
        </motion.a>
      ))}
    </motion.div>
  );
}
