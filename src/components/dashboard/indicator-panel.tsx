import { cn } from "@/lib/utils";
import { MOCK_INDICATORS } from "@/lib/constants";
import type { ICTConceptType } from "@/lib/types";

const typeColors: Record<ICTConceptType, string> = {
  OB: "text-chart-1",
  FVG: "text-chart-2",
  BOS: "text-bullish",
  MSS: "text-warning",
};

const typeBg: Record<ICTConceptType, string> = {
  OB: "bg-chart-1/10",
  FVG: "bg-chart-2/10",
  BOS: "bg-bullish/10",
  MSS: "bg-warning/10",
};

export function IndicatorPanel() {
  return (
    <div className="flex h-full flex-col border-t border-border bg-card">
      {/* Header */}
      <div className="flex h-8 items-center border-b border-border px-3">
        <span className="text-xs font-medium text-muted-foreground">ICT Indicators</span>
      </div>

      {/* Indicator rows */}
      <div className="flex-1 overflow-y-auto">
        {MOCK_INDICATORS.map((ind) => (
          <div
            key={ind.type}
            className="flex items-center gap-3 border-b border-border/50 px-3 py-2 hover:bg-secondary/50 transition-colors"
          >
            {/* Type badge */}
            <span
              className={cn(
                "flex h-5 w-10 items-center justify-center rounded text-[10px] font-bold",
                typeColors[ind.type],
                typeBg[ind.type]
              )}
            >
              {ind.type}
            </span>

            {/* Label */}
            <span className="text-xs text-foreground flex-1">{ind.label}</span>

            {/* Count */}
            <span className="font-mono text-xs font-medium text-foreground">
              {ind.count}
            </span>

            {/* Direction */}
            <span
              className={cn(
                "text-[10px] font-medium uppercase",
                ind.direction === "bullish" ? "text-bullish" : ind.direction === "bearish" ? "text-bearish" : "text-muted-foreground"
              )}
            >
              {ind.direction}
            </span>
          </div>
        ))}

        {/* Detail rows */}
        {MOCK_INDICATORS.map((ind) =>
          ind.details.map((detail, i) => (
            <div
              key={`${ind.type}-${i}`}
              className="flex items-center gap-3 border-b border-border/30 px-3 py-1.5 pl-6"
            >
              <span className={cn("h-1 w-1 rounded-full", typeColors[ind.type].replace("text-", "bg-"))} />
              <span className="font-mono text-[11px] text-muted-foreground">
                {detail}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
