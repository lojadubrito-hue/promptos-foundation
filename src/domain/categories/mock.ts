import { daysAgo } from "../_shared";
import type { Category } from "./types";

export const mockCategories: Category[] = [
  { id: "cat_marketing", name: "Marketing", icon: "Megaphone", color: "#f59e0b", createdAt: daysAgo(90), updatedAt: daysAgo(20) },
  { id: "cat_copy", name: "Copywriting", icon: "PenLine", color: "#ec4899", createdAt: daysAgo(90), updatedAt: daysAgo(15) },
  { id: "cat_dev", name: "Desenvolvimento", icon: "Code", color: "#3b82f6", createdAt: daysAgo(90), updatedAt: daysAgo(10) },
  { id: "cat_design", name: "Design", icon: "Palette", color: "#a855f7", createdAt: daysAgo(90), updatedAt: daysAgo(9) },
  { id: "cat_video", name: "Vídeo", icon: "Film", color: "#ef4444", createdAt: daysAgo(80), updatedAt: daysAgo(8) },
  { id: "cat_image", name: "Imagem", icon: "Image", color: "#22c55e", createdAt: daysAgo(80), updatedAt: daysAgo(7) },
  { id: "cat_edu", name: "Educação", icon: "GraduationCap", color: "#0ea5e9", createdAt: daysAgo(80), updatedAt: daysAgo(6) },
  { id: "cat_research", name: "Pesquisa", icon: "Search", color: "#14b8a6", createdAt: daysAgo(80), updatedAt: daysAgo(5) },
  { id: "cat_sales", name: "Vendas", icon: "ShoppingCart", color: "#f97316", createdAt: daysAgo(70), updatedAt: daysAgo(4) },
  { id: "cat_product", name: "Produto", icon: "Package", color: "#6366f1", createdAt: daysAgo(70), updatedAt: daysAgo(4) },
  { id: "cat_social", name: "Social Media", icon: "Share2", color: "#e11d48", createdAt: daysAgo(70), updatedAt: daysAgo(3) },
  { id: "cat_data", name: "Dados", icon: "Database", color: "#84cc16", createdAt: daysAgo(70), updatedAt: daysAgo(2) },
];
