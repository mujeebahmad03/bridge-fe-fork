import { create } from "zustand";
import type { MobileView } from "@/emails/dashboard/types";

interface EmailClientState {
  // UI State
  sidebarSize: number;
  mobileView: MobileView;
  showSidebar: boolean;
  showMobileSearch: boolean;
  showTabletSearch: boolean;
  showMobileNav: boolean;

  // Actions
  setSidebarSize: (size: number) => void;
  setMobileView: (view: MobileView) => void;
  setShowSidebar: (show: boolean) => void;
  setShowMobileSearch: (show: boolean) => void;
  setShowTabletSearch: (show: boolean) => void;
  setShowMobileNav: (show: boolean) => void;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
}

export const useEmailClientStore = create<EmailClientState>((set) => ({
  // Initial state
  sidebarSize: 20,
  mobileView: "list",
  showSidebar: false,
  showMobileSearch: false,
  showTabletSearch: false,
  showMobileNav: false,

  // Actions
  setSidebarSize: (size) => set({ sidebarSize: size }),
  setMobileView: (view) => set({ mobileView: view }),
  setShowSidebar: (show) => set({ showSidebar: show }),
  setShowMobileSearch: (show) => set({ showMobileSearch: show }),
  setShowTabletSearch: (show) => set({ showTabletSearch: show }),
  setShowMobileNav: (show) => set({ showMobileNav: show }),
  toggleMobileNav: () =>
    set((state) => ({ showMobileNav: !state.showMobileNav })),
  closeMobileNav: () => set({ showMobileNav: false }),
}));
