import { Logo } from "@/components/common/icons";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavigationSheet } from "./nav-sheet";
import { UserButton } from "./user-button";
import { BreadcrumbNavigation } from "./breadcrumb";
import { PageActions } from "./page-action";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      {/* Main navigation bar */}
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <NavigationSheet />
          <div className="hidden md:block">
            <Logo width={80} height={40} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>

      {/* Breadcrumb and actions bar */}
      <div className="border-t bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/10 dark:to-purple-950/10">
        <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between px-4">
          <BreadcrumbNavigation />
          <PageActions />
        </div>
      </div>
    </header>
  );
}
