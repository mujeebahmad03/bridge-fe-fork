"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { HeaderLogo } from "./logo";
import { DesktopNav } from "./desktop-nav";
import { HeaderControls } from "./header-controls";
import { MobileMenuButton } from "./mobile-menu-button";
import { MobileNav } from "./mobile-nav";

import { authRoutes } from "@/config/routes";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();
  const { push } = useRouter();

  // Enhanced scroll effects
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);
  const headerBlur = useTransform(scrollYProgress, [0, 0.1], [0, 8]);
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.99]);

  const navItems = [
    { name: "Features", href: "#features", hasDropdown: false },
    { name: "Pricing", href: "#pricing", hasDropdown: false },
    { name: "Resources", href: "#resources", hasDropdown: true },
    { name: "Company", href: "#company", hasDropdown: true },
  ];

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["features", "pricing", "testimonials", "ai-platform"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const onClose = () => {
    push(authRoutes.login);
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        style={{
          opacity: headerOpacity,
          scale: headerScale,
          backdropFilter: `blur(${headerBlur}px)`,
        }}
        className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 shadow-sm backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:h-18 flex h-16 items-center justify-between">
            <HeaderLogo />
            <DesktopNav navItems={navItems} activeSection={activeSection} />

            <div className="flex items-center space-x-2">
              <HeaderControls />
              <MobileMenuButton
                isMenuOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl lg:hidden"
            >
              <MobileNav
                navItems={navItems}
                activeSection={activeSection}
                onClose={onClose}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMenuOpen(false)}
            style={{ top: "var(--header-height, 4rem)" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
