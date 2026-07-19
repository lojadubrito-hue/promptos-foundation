import { Link, useRouterState } from "@tanstack/react-router";
import { Command } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  APP_NAME,
  APP_TAGLINE,
  primaryNavigation,
  secondaryNavigation,
  type NavItem,
} from "@/config/navigation";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });

  const isActive = (url: string) =>
    url === "/" ? currentPath === "/" : currentPath.startsWith(url);

  const renderItem = (item: NavItem) => (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton
        asChild
        isActive={isActive(item.url)}
        tooltip={item.title}
      >
        <Link to={item.url} className="flex items-center gap-3">
          <item.icon className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="truncate">{item.title}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent/60 shadow-sm">
            <Command className="h-4 w-4 text-accent-foreground" />
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold tracking-tight text-sidebar-foreground">
                {APP_NAME}
              </span>
              <span className="truncate text-[11px] text-sidebar-foreground/60">
                {APP_TAGLINE}
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {primaryNavigation.map((section) => (
          <SidebarGroup key={section.label}>
            {!collapsed && (
              <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-sidebar-foreground/50">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>{section.items.map(renderItem)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>{secondaryNavigation.map(renderItem)}</SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}