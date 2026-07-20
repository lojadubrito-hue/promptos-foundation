import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AI_MODELS, type AIModel } from "@/types/prompt";

export function AIModelSelector({
  value,
  onChange,
  className,
}: {
  value: AIModel;
  onChange: (v: AIModel) => void;
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as AIModel)}>
      <SelectTrigger className={cn("h-9 border-border/60 bg-muted/30", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {AI_MODELS.map((m) => (
          <SelectItem key={m} value={m}>
            {m}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}