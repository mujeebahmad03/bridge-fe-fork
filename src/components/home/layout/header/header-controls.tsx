"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/common";

import { authRoutes } from "@/config/routes";

export function HeaderControls() {
  const { push } = useRouter();

  return (
    <div className="flex items-center space-x-2">
      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center"
      >
        <ThemeSwitcher />
      </motion.div>

      {/* Login Button - Desktop */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="hidden sm:block"
        onClick={() => push(authRoutes.login)}
      >
        <Button
          variant="ghost"
          size="sm"
          className="font-medium text-muted-foreground hover:text-foreground"
        >
          Login
        </Button>
      </motion.div>

      {/* CTA Button - Desktop */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="hidden sm:block"
        onClick={() => push(authRoutes.signUp)}
      >
        <Button className="group rounded-full bg-gradient-to-r from-primary to-blue-600 px-6 py-2 font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:from-primary/90 hover:to-blue-600/90 hover:shadow-xl">
          <Sparkles className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          Try For Free
        </Button>
      </motion.div>
    </div>
  );
}
