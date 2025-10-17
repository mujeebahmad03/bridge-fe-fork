import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NavUser } from "./nav-user";

import type { NavItem } from "@/types/components";
import { LogoIcon } from "../common/logo";
import { Logo } from "../common/icons";
import { cn } from "@/lib/utils";
import { dashboardRoutes } from "@/config/routes";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navItems: NavItem[];
  setOpen?: (open: boolean) => void;
  open?: boolean;
  route: string;
}

export function AppSidebar({ navItems, route, ...rest }: AppSidebarProps) {
  const { isMobile, state } = useSidebar();
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <Sidebar {...rest}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <a href={route}>
                <div className="flex items-center justify-center">
                  {isMobile || state === "expanded" ? (
                    <Logo className="size-24 text-sidebar-foreground" />
                  ) : (
                    <LogoIcon className="h-8 w-auto text-sidebar-foreground" />
                  )}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 0}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={cn(
                        "mt-4 hover:bg-[#EAF4FB] hover:text-[#0077AB] dark:hover:bg-[#0077AB29]",
                        (pathname === item.href ||
                          (pathname.startsWith(item.href) &&
                            item.href !== dashboardRoutes.home)) &&
                          "bg-[#EAF4FB] text-[#0077AB] dark:bg-[#0077AB29]",
                      )}
                      onClick={() => push(item.href)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                      {item.submenu && (
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.submenu && (
                    <CollapsibleContent className="overflow-hidden transition-all duration-200 ease-in-out">
                      <SidebarMenuSub>
                        {item.submenu.map((subItem) => (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            className="mt-6"
                          >
                            <SidebarMenuSubButton
                              asChild
                              className={cn(
                                "hover:bg-[#EAF4FB] hover:text-[#0077AB] dark:hover:bg-[#0077AB29]",
                                (pathname === subItem.href ||
                                  (pathname.startsWith(subItem.href) &&
                                    subItem.href !== dashboardRoutes.home)) &&
                                  "bg-[#EAF4FB] text-[#0077AB] dark:bg-[#0077AB29]",
                              )}
                            >
                              <a href={subItem.href}>
                                <subItem.icon className="mr-2 h-4 w-4" />
                                {subItem.title}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={null} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
