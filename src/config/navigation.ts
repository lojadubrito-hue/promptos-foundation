import {
  LayoutDashboard,
  Sparkles,
  Library,
  FolderKanban,
  Settings,
  Film,
  Image as ImageIcon,
  ShoppingBag,
  Users,
  Star,
  BarChart3,
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
      { title: "Prompt Generator", url: "/prompts", icon: Sparkles },
      { title: "Library", url: "/library", icon: Library },
      { title: "Projects", url: "/projects", icon: FolderKanban },
    ],
  },
  {
    label: "Studios",
    items: [
      { title: "Veo Studio", url: "/veo3", icon: Film },
      { title: "Image Studio", url: "/image-studio", icon: ImageIcon },
      { title: "TikTok Studio", url: "/tiktok-shop", icon: ShoppingBag },
      { title: "Character Studio", url: "/characters", icon: Users },
    ],
  },
  {
    label: "Insights",
    items: [
      { title: "Favorites", url: "/favorites", icon: Star },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
    ],
  },
];

export const secondaryNavigation: NavItem[] = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export const APP_NAME = "PromptOS";
export const APP_TAGLINE = "AI Prompt Workspace";