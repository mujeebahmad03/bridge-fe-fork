"use client";

import { motion } from "framer-motion";
import { FooterColumn } from "./footer-column";
import { SocialLinks } from "./social-links";
import { FooterBottom } from "./footer-bottom";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { name: "Overview", href: "#overview" },
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Integrations", href: "#integrations" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Blog", href: "#blog" },
      { name: "Contact", href: "#contact" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#docs" },
      { name: "API Reference", href: "#api" },
      { name: "Community Forum", href: "#community" },
      { name: "Support", href: "#support" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Terms of Service", href: "#terms" },
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "Security", href: "#security" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background with subtle gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-slate-50/60 to-blue-100/40 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-slate-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/20 dark:from-blue-950/30 dark:via-transparent dark:to-purple-950/20" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-100/60 to-transparent dark:from-slate-900/80 dark:to-transparent" />
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:24px_24px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.2)_1px,transparent_0)]" />
        </div>
      </div>

      <div className="relative">
        <div className="container mx-auto px-4 pb-8 pt-16 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="h-8 w-1 rounded-full bg-primary" />
                <div className="mt-1 h-6 w-1 rounded-full bg-primary/70" />
                <div className="mt-2 h-4 w-1 rounded-full bg-primary/40" />
              </div>
              <span className="text-2xl font-bold text-foreground dark:text-white">
                Bridge
              </span>
            </div>
          </motion.div>

          {/* Footer Links Grid */}
          <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-12">
            <FooterColumn
              title={footerLinks.product.title}
              links={footerLinks.product.links}
              delay={0.1}
            />
            <FooterColumn
              title={footerLinks.company.title}
              links={footerLinks.company.links}
              delay={0.2}
            />
            <FooterColumn
              title={footerLinks.resources.title}
              links={footerLinks.resources.links}
              delay={0.3}
            />
            <FooterColumn
              title={footerLinks.legal.title}
              links={footerLinks.legal.links}
              delay={0.4}
            />
          </div>

          <SocialLinks />
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
}
