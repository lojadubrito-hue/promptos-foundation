import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function VersionBadge({
  version,
  className,
}: {
  version: string;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-border/60 bg-muted/40 font-mono text-[10px] text-muted-foreground",
        className,
      )}
    >
      {version}
    </Badge>
  );
}