import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface DashboardCardProps {
  label: string;
  value: string;
  description?: string;
  icon: LucideIcon;
}

export function DashboardCard({
  label,
  value,
  description,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <Card className="group relative overflow-hidden border-border/60 bg-card/60 transition-all hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-lg hover:shadow-black/20">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardDescription className="text-xs font-medium text-muted-foreground">
          {label}
        </CardDescription>
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-muted/60 text-muted-foreground transition-colors group-hover:bg-accent/15 group-hover:text-accent">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="pb-5">
        <div className="text-2xl font-semibold tracking-tight text-foreground">
          {value}
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground/80">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}