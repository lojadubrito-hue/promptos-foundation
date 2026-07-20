import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FRAMEWORKS, type Framework } from "@/types/prompt";

export function FrameworkSelector({
  value,
  onChange,
  className,
}: {
  value: Framework;
  onChange: (v: Framework) => void;
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as Framework)}>
      <SelectTrigger className={cn("h-9 border-border/60 bg-muted/30", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {FRAMEWORKS.map((f) => (
          <SelectItem key={f} value={f}>
            {f}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}