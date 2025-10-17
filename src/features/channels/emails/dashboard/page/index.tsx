"use client";

import {
  DesktopEmailClient,
  EmailClientProvider,
  MobileEmailClient,
  TabletEmailClient,
} from "@/emails/dashboard/components/email-client";

import { useScreenSize } from "@/emails/dashboard/hooks/ui";

export default function EmailClient() {
  const screenSize = useScreenSize();

  return (
    <EmailClientProvider>
      {screenSize === "mobile" && <MobileEmailClient />}
      {screenSize === "tablet" && <TabletEmailClient />}
      {screenSize === "desktop" && <DesktopEmailClient />}
    </EmailClientProvider>
  );
}
