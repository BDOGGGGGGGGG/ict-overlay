"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MOCK_MARKET_OVERVIEW } from "@/lib/constants";

export function TopBar() {
  return (
    <header className="flex h-10 items-center border-b border-border bg-card px-3 text-xs">
      {/* Symbol */}
      <span className="font-semibold text-sm text-foreground">EUR/USD</span>

      <Separator orientation="vertical" className="mx-3 h-4" />

      {/* Price */}
      <span className="font-mono font-medium text-foreground">
        {MOCK_MARKET_OVERVIEW.price}
      </span>

      <Separator orientation="vertical" className="mx-3 h-4" />

      {/* Change */}
      <span className="font-mono text-bullish">+0.0012</span>
      <span className="ml-1.5 font-mono text-bullish">(+0.11%)</span>

      <Separator orientation="vertical" className="mx-3 h-4" />

      {/* Timeframe */}
      <div className="flex items-center gap-0.5">
        {["1m", "5m", "15m", "1H", "4H", "1D"].map((tf) => (
          <button
            key={tf}
            className={`rounded px-1.5 py-0.5 transition-colors ${
              tf === "1H"
                ? "bg-primary/15 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      <Separator orientation="vertical" className="mx-3 h-4" />

      {/* Session & Status */}
      <span className="text-muted-foreground">
        {MOCK_MARKET_OVERVIEW.session} Session
      </span>

      <div className="ml-auto flex items-center gap-2" />
    </header>
  );
}
