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
    ],
  },
  {
    label: "Studios",
    items: [
      { title: "Veo 3 Studio", url: "/veo3", icon: Film },
      { title: "Image Studio", url: "/image-studio", icon: ImageIcon },
      { title: "TikTok Shop", url: "/tiktok-shop", icon: ShoppingBag },
    ],
  },
  {
    label: "Organize",
    items: [
      { title: "Characters", url: "/characters", icon: Users },
      { title: "Projects", url: "/projects", icon: FolderKanban },
      { title: "Favorites", url: "/favorites", icon: Star },
    ],
  },
];

export const secondaryNavigation: NavItem[] = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export const APP_NAME = "PromptOS";
export const APP_TAGLINE = "AI Prompt Workspace";