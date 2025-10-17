import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/common";
import { CrumbItem } from "@/types/components";

interface DashboardLayoutContentProps {
  children: React.ReactNode;
  breadcrumbs: CrumbItem[];
  currentPage: string;
}

export const DashboardLayoutContent = ({
  children,
  breadcrumbs,
  currentPage,
}: DashboardLayoutContentProps) => {
  return (
    <SidebarInset className="flex h-screen flex-col overflow-hidden">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <Fragment key={crumb.href}>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </Fragment>
              ))}
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentPage}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ThemeSwitcher />
      </header>
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-4 bg-gradient-to-br from-background via-background to-muted/20 p-4">
          {children}
        </div>
      </div>
    </SidebarInset>
  );
};
