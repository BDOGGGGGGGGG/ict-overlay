import { cn } from "@/lib/utils";

type ProgressVariant = "default" | "bullish" | "bearish" | "warning";

const variantClasses: Record<ProgressVariant, string> = {
  default: "bg-primary",
  bullish: "bg-bullish",
  bearish: "bg-bearish",
  warning: "bg-warning",
};

export function ProgressBar({
  value,
  variant = "default",
  className,
  label,
}: {
  value: number;
  variant?: ProgressVariant;
  className?: string;
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all", variantClasses[variant])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
