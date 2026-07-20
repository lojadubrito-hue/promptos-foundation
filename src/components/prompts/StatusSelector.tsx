import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PROMPT_STATUSES, type PromptStatus } from "@/types/prompt";

const styles: Record<PromptStatus, string> = {
  Draft: "text-muted-foreground",
  Testing: "text-amber-400",
  Approved: "text-emerald-400",
  Archived: "text-muted-foreground/60",
};

export function StatusSelector({
  value,
  onChange,
  className,
}: {
  value: PromptStatus;
  onChange: (v: PromptStatus) => void;
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as PromptStatus)}>
      <SelectTrigger className={cn("h-9 border-border/60 bg-muted/30", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {PROMPT_STATUSES.map((s) => (
          <SelectItem key={s} value={s}>
            <span className={cn("font-medium", styles[s])}>{s}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function StatusPill({ status }: { status: PromptStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[10px] font-medium",
        styles[status],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}