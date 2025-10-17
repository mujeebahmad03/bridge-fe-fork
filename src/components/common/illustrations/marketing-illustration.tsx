"use client";

import { Cog, Play, Mail, User, X, RefreshCw, Leaf } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui";

export default function MarketingAutomation() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // This prevents hydration errors by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme which gives the actual theme (accounting for system preference)
  // Only check theme after component has mounted to avoid hydration mismatch
  const isDarkMode = mounted && resolvedTheme === "dark";

  return (
    <>
      <div className="relative w-full max-w-4xl">
        {/* Background blob */}
        <div className="absolute inset-0 z-0">
          <svg viewBox="0 0 600 600" className="h-full w-full">
            <path
              d="M480.8,178.8c30.7,33.1,46.5,78.4,44.1,126.9c-2.4,48.5-23.2,100.3-67.6,129.5c-44.3,29.2-112.2,35.8-175.1,21.1
              c-62.9-14.7-120.8-50.7-140.5-101.5C121.9,303.9,140.2,238,186,185.3C231.8,132.6,305,93.2,373.6,98.4
              C442.2,103.6,450.1,145.7,480.8,178.8z"
              fill={
                isDarkMode
                  ? "rgba(30, 58, 138, 0.3)"
                  : "rgba(59, 130, 246, 0.15)"
              }
              className="transition-colors duration-300"
            />
          </svg>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Computer frame */}
          <div className="relative mb-8 h-96 w-full max-w-2xl">
            <div
              className={`absolute inset-0 rounded-xl border-2 ${isDarkMode ? "border-blue-700 bg-slate-900/50" : "border-blue-300 bg-white/80"} shadow-lg transition-colors duration-300`}
            ></div>

            {/* Top bar of computer */}
            <div
              className={`absolute left-0 right-0 top-0 h-6 rounded-t-xl ${isDarkMode ? "bg-blue-800" : "bg-blue-500"} transition-colors duration-300`}
            >
              <div className="absolute right-3 top-1.5 flex space-x-1.5">
                <div className="h-2 w-2 rounded-full bg-white/70"></div>
                <div className="h-2 w-2 rounded-full bg-white/70"></div>
                <X className="h-3 w-3 text-white/70" />
              </div>
            </div>

            {/* Email in center */}
            <div className="absolute left-1/2 top-1/2 h-40 w-48 -translate-x-1/2 -translate-y-1/2 transform">
              <div
                className={`h-full w-full rounded-lg ${isDarkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"} flex flex-col items-center justify-center border-2 shadow-md transition-colors duration-300`}
              >
                <div className="relative h-24 w-32">
                  <div
                    className={`absolute inset-0 rounded-lg ${isDarkMode ? "border-blue-700" : "border-blue-300"} border-2 transition-colors duration-300`}
                  ></div>
                  <div className="absolute left-0 right-0 top-0 h-8 overflow-hidden">
                    <div className="h-16 w-full origin-top-left translate-y-4 rotate-45 transform rounded-t-lg bg-blue-500"></div>
                  </div>
                  <Mail
                    className={`absolute bottom-2 left-1/2 h-8 w-8 -translate-x-1/2 transform ${isDarkMode ? "text-blue-400" : "text-blue-600"} transition-colors duration-300`}
                  />

                  {/* Email content lines */}
                  <div
                    className={`absolute left-1/2 top-10 h-2 w-20 -translate-x-1/2 transform rounded-full ${isDarkMode ? "bg-slate-600" : "bg-slate-200"} transition-colors duration-300`}
                  ></div>
                  <div
                    className={`absolute left-1/2 top-14 h-2 w-16 -translate-x-1/2 transform rounded-full ${isDarkMode ? "bg-slate-600" : "bg-slate-200"} transition-colors duration-300`}
                  ></div>
                </div>
              </div>
            </div>

            {/* Gears */}
            <div className="animate-spin-slow absolute left-1/4 top-20 -translate-x-1/2 transform">
              <Cog
                className={`h-16 w-16 ${isDarkMode ? "text-blue-500" : "text-blue-600"} transition-colors duration-300`}
              />
            </div>
            <div className="left-1/5 animate-spin-slow-reverse absolute top-32 -translate-x-1/2 transform">
              <Cog
                className={`h-12 w-12 ${isDarkMode ? "text-blue-400" : "text-blue-500"} transition-colors duration-300`}
              />
            </div>
            <div className="animate-spin-slow absolute right-1/4 top-24 translate-x-1/2 transform">
              <Cog
                className={`h-14 w-14 ${isDarkMode ? "text-blue-400" : "text-blue-500"} transition-colors duration-300`}
              />
            </div>

            {/* Play button */}
            <div className="absolute right-1/3 top-1/4 translate-x-1/2 transform">
              <div
                className={`h-12 w-12 rounded-full ${isDarkMode ? "bg-blue-600" : "bg-blue-500"} flex items-center justify-center shadow-md transition-colors duration-300`}
              >
                <Play className="ml-0.5 h-6 w-6 fill-current text-white" />
              </div>
            </div>

            {/* User cards */}
            <Card
              className={`absolute left-16 top-16 h-32 w-24 ${isDarkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"} transition-colors duration-300`}
            >
              <div className="flex flex-col items-center p-2">
                <div
                  className={`h-12 w-12 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-100"} mb-2 flex items-center justify-center transition-colors duration-300`}
                >
                  <User
                    className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"} transition-colors duration-300`}
                  />
                </div>
                <div
                  className={`h-2 w-16 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"} mb-1 transition-colors duration-300`}
                ></div>
                <div
                  className={`h-2 w-12 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"} mb-1 transition-colors duration-300`}
                ></div>
                <div
                  className={`h-2 w-14 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"} transition-colors duration-300`}
                ></div>
              </div>
            </Card>

            <Card
              className={`absolute bottom-16 left-24 h-32 w-24 ${isDarkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"} transition-colors duration-300`}
            >
              <div className="flex flex-col items-center p-2">
                <div
                  className={`h-12 w-12 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-100"} mb-2 flex items-center justify-center transition-colors duration-300`}
                >
                  <User
                    className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"} transition-colors duration-300`}
                  />
                </div>
                <div
                  className={`h-2 w-16 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"} mb-1 transition-colors duration-300`}
                ></div>
                <div
                  className={`h-2 w-12 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"} mb-1 transition-colors duration-300`}
                ></div>
                <div
                  className={`h-2 w-14 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"} transition-colors duration-300`}
                ></div>
              </div>
            </Card>

            <Card
              className={`absolute right-16 top-24 h-32 w-24 ${isDarkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"} transition-colors duration-300`}
            >
              <div className="flex flex-col items-center p-2">
                <div
                  className={`h-12 w-12 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-100"} mb-2 flex items-center justify-center transition-colors duration-300`}
                >
                  <User
                    className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"} transition-colors duration-300`}
                  />
                </div>
                <div
                  className={`h-2 w-16 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"} mb-1 transition-colors duration-300`}
                ></div>
                <div
                  className={`h-2 w-12 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"} mb-1 transition-colors duration-300`}
                ></div>
                <div
                  className={`h-2 w-14 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"} transition-colors duration-300`}
                ></div>
              </div>
            </Card>

            <Card
              className={`absolute bottom-20 right-24 h-32 w-24 ${isDarkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"} transition-colors duration-300`}
            >
              <div className="flex flex-col items-center p-2">
                <div
                  className={`h-12 w-12 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-100"} mb-2 flex items-center justify-center transition-colors duration-300`}
                >
                  <User
                    className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"} transition-colors duration-300`}
                  />
                </div>
                <div
                  className={`h-2 w-16 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"} mb-1 transition-colors duration-300`}
                ></div>
                <div
                  className={`h-2 w-12 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"} mb-1 transition-colors duration-300`}
                ></div>
                <div
                  className={`h-2 w-14 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"} transition-colors duration-300`}
                ></div>
              </div>
            </Card>

            {/* Decorative elements */}
            <div className="absolute bottom-12 right-12">
              <Leaf
                className={`h-10 w-10 ${isDarkMode ? "text-blue-700/50" : "text-blue-300"} transition-colors duration-300`}
              />
            </div>
            <div className="absolute right-12 top-12">
              <div
                className={`h-6 w-6 ${isDarkMode ? "text-blue-700/50" : "text-blue-300"} transition-colors duration-300`}
              >
                ×
              </div>
            </div>
            <div className="absolute bottom-16 left-12">
              <RefreshCw
                className={`h-8 w-8 ${isDarkMode ? "text-blue-700/50" : "text-blue-300"} transition-colors duration-300`}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-slow-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 15s linear infinite;
        }
      `}</style>
    </>
  );
}
