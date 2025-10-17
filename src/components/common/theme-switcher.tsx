"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

export function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by ensuring theme is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine current theme after mounting
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Don't render UI until mounted to avoid SSR/CSR mismatch
  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setTheme(currentTheme === "dark" ? "light" : "dark");
        console.log(currentTheme);
      }}
      aria-label="Toggle theme"
      className="rounded-full"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          currentTheme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
          currentTheme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        }`}
      />
    </Button>
  );
}
