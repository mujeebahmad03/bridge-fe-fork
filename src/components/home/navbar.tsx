"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary">Bridge</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <a
              href="#features"
              className="text-gray-600 transition-colors hover:text-primary"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-gray-600 transition-colors hover:text-primary"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-600 transition-colors hover:text-primary"
            >
              Contact
            </a>
            <Button>Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-1 bg-white/90 px-2 pb-3 pt-2 backdrop-blur-md">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-600 transition-colors hover:text-primary"
              >
                Features
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-gray-600 transition-colors hover:text-primary"
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-600 transition-colors hover:text-primary"
              >
                Contact
              </a>
              <Button className="mt-4 w-full">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
