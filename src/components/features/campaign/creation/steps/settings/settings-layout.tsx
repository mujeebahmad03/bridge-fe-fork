import { ReactNode } from "react";

interface SettingsLayoutProps {
  children: ReactNode;
}

export const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-blue-100/50 bg-white/70 shadow-xl backdrop-blur-sm fade-in dark:border-slate-700/50 dark:bg-slate-900/70">
          {children}
        </div>
      </div>
    </div>
  );
};
