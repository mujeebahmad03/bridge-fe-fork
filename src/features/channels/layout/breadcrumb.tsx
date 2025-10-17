"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useBreadcrumb } from "@/channels/hooks";
import { cn } from "@/lib/utils";

export function BreadcrumbNavigation() {
  const crumbs = useBreadcrumb();
  const currentPage = crumbs[crumbs.length - 1];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Mobile: Show only current page */}
        <div className="sm:hidden">
          {currentPage && (
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2 text-sm font-medium">
                {currentPage.icon && (
                  <currentPage.icon className="h-3.5 w-3.5" />
                )}
                <span>{currentPage.title}</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </div>

        {/* Desktop: Show full breadcrumb trail */}
        <div className="hidden gap-2 sm:flex">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            const Icon = crumb.icon || (index === 0 ? Home : undefined);

            return (
              <div key={crumb.href} className="flex items-center">
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="flex items-center gap-2 text-sm font-medium">
                      {Icon && <Icon className="h-3.5 w-3.5" />}
                      <span>{crumb.title}</span>
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={crumb.href}
                        className={cn(
                          "flex items-center gap-2 text-sm transition-colors duration-200",
                          "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {Icon && <Icon className="h-3.5 w-3.5" />}
                        <span>{crumb.title}</span>
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </BreadcrumbSeparator>
                )}
              </div>
            );
          })}
        </div>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
