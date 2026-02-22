import { cn } from "@/lib/utils";
import { MOCK_TRADE_SETUPS } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import type { TradeSetup } from "@/lib/types";

const gradeColor: Record<string, string> = {
  "A+": "text-bullish",
  A: "text-bullish",
  "B+": "text-chart-1",
  B: "text-chart-1",
  C: "text-warning",
};

function SetupRow({ setup }: { setup: TradeSetup }) {
  return (
    <div className="flex items-center px-3 py-2 hover:bg-secondary/50 transition-colors text-xs border-b border-border/50">
      {/* Pair */}
      <span className="w-20 font-mono font-medium text-foreground">
        {setup.pair}
      </span>

      {/* Direction */}
      <span
        className={cn(
          "w-12 font-medium uppercase text-[10px]",
          setup.direction === "long" ? "text-bullish" : "text-bearish"
        )}
      >
        {setup.direction}
      </span>

      {/* TF */}
      <span className="w-10 text-muted-foreground text-center">
        {setup.timeframe}
      </span>

      {/* Grade */}
      <span
        className={cn(
          "w-8 text-center font-bold text-sm",
          gradeColor[setup.grade]
        )}
      >
        {setup.grade}
      </span>

      {/* Confidence */}
      <div className="flex-1 flex items-center gap-2 pl-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className={cn(
              "h-full rounded-full",
              setup.confidence > 80
                ? "bg-bullish"
                : setup.confidence > 60
                ? "bg-chart-1"
                : "bg-warning"
            )}
            style={{ width: `${setup.confidence}%` }}
          />
        </div>
        <span className="w-8 text-right font-mono text-muted-foreground">
          {setup.confidence}%
        </span>
      </div>
    </div>
  );
}

export function ScoringPanel() {
  return (
    <div className="flex h-full flex-col border-l border-border bg-card">
      {/* Header */}
      <div className="flex h-8 items-center border-b border-border px-3">
        <span className="text-xs font-medium text-muted-foreground">
          Trade Rankings
        </span>
      </div>

      {/* Column headers */}
      <div className="flex items-center px-3 py-1.5 text-[10px] font-medium uppercase text-muted-foreground border-b border-border">
        <span className="w-20">Pair</span>
        <span className="w-12">Side</span>
        <span className="w-10 text-center">TF</span>
        <span className="w-8 text-center">Grade</span>
        <span className="flex-1 pl-3">Confidence</span>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto">
        {MOCK_TRADE_SETUPS.map((setup) => (
          <SetupRow key={setup.id} setup={setup} />
        ))}
      </div>

      {/* Score breakdown footer */}
      <div className="border-t border-border px-3 py-2">
        <div className="text-[10px] font-medium uppercase text-muted-foreground mb-1.5">
          Score Breakdown — {MOCK_TRADE_SETUPS[0].pair}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {(["ob", "fvg", "bos", "mss"] as const).map((key) => (
            <div key={key} className="text-center">
              <div className="text-[10px] uppercase text-muted-foreground">
                {key}
              </div>
              <div
                className={cn(
                  "font-mono text-xs font-medium",
                  MOCK_TRADE_SETUPS[0].scores[key] > 80
                    ? "text-bullish"
                    : MOCK_TRADE_SETUPS[0].scores[key] > 60
                    ? "text-chart-1"
                    : "text-warning"
                )}
              >
                {MOCK_TRADE_SETUPS[0].scores[key]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
