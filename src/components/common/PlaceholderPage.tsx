import type { LucideIcon } from "lucide-react";

import { PageHeader } from "./PageHeader";
import { EmptyState } from "./EmptyState";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  emptyTitle?: string;
  emptyDescription?: string;
}

/**
 * Temporary scaffold page used while a feature area is being designed.
 */
export function PlaceholderPage({
  title,
  description,
  icon,
  emptyTitle = "Nothing here yet",
  emptyDescription = "This module is part of the PromptOS foundation and will be implemented in a next step.",
}: PlaceholderPageProps) {
  return (
    <div>
      <PageHeader title={title} description={description} />
      <EmptyState
        icon={icon}
        title={emptyTitle}
        description={emptyDescription}
      />
    </div>
  );
}