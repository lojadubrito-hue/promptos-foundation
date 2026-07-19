import {
  LayoutDashboard,
  Sparkles,
  Library,
  FolderKanban,
  BarChart3,
  Settings,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

/**
 * Central navigation registry.
 * Add new pages here — Sidebar consumes this to render links.
 */
export const primaryNavigation: NavSection[] = [
  {
    label: "Workspace",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Prompts", url: "/prompts", icon: Sparkles },
      { title: "Library", url: "/library", icon: Library },
      { title: "Projects", url: "/projects", icon: FolderKanban },
    ],
  },
  {
    label: "Insights",
    items: [{ title: "Analytics", url: "/analytics", icon: BarChart3 }],
  },
];

export const secondaryNavigation: NavItem[] = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help & Support", url: "/help", icon: LifeBuoy },
];

export const APP_NAME = "PromptOS";
export const APP_TAGLINE = "AI Prompt Workspace";