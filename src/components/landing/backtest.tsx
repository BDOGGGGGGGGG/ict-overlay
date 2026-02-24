"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Filter } from "lucide-react";

// Simulated 30-trade log — realistic trader results
const allTrades = [
  { id: 1, pair: "NQ", grade: "A+", result: "win", pnl: 320 },
  { id: 2, pair: "EUR/USD", grade: "C", result: "loss", pnl: -150 },
  { id: 3, pair: "GBP/USD", grade: "B+", result: "win", pnl: 210 },
  { id: 4, pair: "NQ", grade: "D", result: "loss", pnl: -280 },
  { id: 5, pair: "ES", grade: "A", result: "win", pnl: 180 },
  { id: 6, pair: "EUR/USD", grade: "C", result: "loss", pnl: -120 },
  { id: 7, pair: "NQ", grade: "B", result: "win", pnl: 95 },
  { id: 8, pair: "GBP/USD", grade: "F", result: "loss", pnl: -340 },
  { id: 9, pair: "EUR/USD", grade: "A+", result: "win", pnl: 410 },
  { id: 10, pair: "NQ", grade: "C", result: "win", pnl: 40 },
  { id: 11, pair: "ES", grade: "B+", result: "win", pnl: 275 },
  { id: 12, pair: "EUR/USD", grade: "D", result: "loss", pnl: -190 },
  { id: 13, pair: "NQ", grade: "A", result: "win", pnl: 350 },
  { id: 14, pair: "GBP/USD", grade: "C", result: "loss", pnl: -85 },
  { id: 15, pair: "NQ", grade: "B+", result: "win", pnl: 160 },
  { id: 16, pair: "EUR/USD", grade: "F", result: "loss", pnl: -220 },
  { id: 17, pair: "ES", grade: "A+", result: "win", pnl: 390 },
  { id: 18, pair: "NQ", grade: "C", result: "loss", pnl: -170 },
  { id: 19, pair: "GBP/USD", grade: "B", result: "win", pnl: 130 },
  { id: 20, pair: "EUR/USD", grade: "D", result: "loss", pnl: -260 },
  { id: 21, pair: "NQ", grade: "A", result: "win", pnl: 290 },
  { id: 22, pair: "ES", grade: "C", result: "loss", pnl: -110 },
  { id: 23, pair: "EUR/USD", grade: "B+", result: "win", pnl: 240 },
  { id: 24, pair: "NQ", grade: "F", result: "loss", pnl: -310 },
  { id: 25, pair: "GBP/USD", grade: "A+", result: "win", pnl: 370 },
  { id: 26, pair: "EUR/USD", grade: "C", result: "loss", pnl: -95 },
  { id: 27, pair: "NQ", grade: "B", result: "win", pnl: 115 },
  { id: 28, pair: "ES", grade: "D", result: "loss", pnl: -200 },
  { id: 29, pair: "EUR/USD", grade: "A", result: "win", pnl: 310 },
  { id: 30, pair: "NQ", grade: "C", result: "win", pnl: 25 },
];

const abGrades = ["A+", "A", "B+", "B"];
const filteredTrades = allTrades.filter((t) => abGrades.includes(t.grade));

function calcStats(trades: typeof allTrades) {
  const wins = trades.filter((t) => t.result === "win").length;
  const total = trades.length;
  const winRate = Math.round((wins / total) * 100);
  const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0);
  const avgPnl = Math.round(totalPnl / total);
  return { wins, losses: total - wins, total, winRate, totalPnl, avgPnl };
}

const allStats = calcStats(allTrades);
const filteredStats = calcStats(filteredTrades);

function gradeColor(grade: string) {
  if (grade === "A+" || grade === "A") return "text-bullish";
  if (grade === "B+" || grade === "B") return "text-foreground";
  if (grade === "C") return "text-warning";
  return "text-bearish";
}

function gradeBg(grade: string) {
  if (grade === "A+" || grade === "A") return "bg-bullish/15";
  if (grade === "B+" || grade === "B") return "bg-foreground/10";
  if (grade === "C") return "bg-warning/15";
  return "bg-bearish/15";
}

function StatCard({ label, before, after, suffix = "", positive }: { label: string; before: string; after: string; suffix?: string; positive?: boolean }) {
  return (
    <div className="rounded-xl bg-[#1a1a1c] p-4 border border-[#2a2a2c]">
      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-3">{label}</div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] text-muted-foreground/60 mb-0.5">All trades</div>
          <div className="font-mono text-lg text-muted-foreground">{before}{suffix}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-primary mb-0.5">A & B only</div>
          <div className={cn("font-mono text-2xl font-bold", positive ? "text-bullish" : "text-foreground")}>{after}{suffix}</div>
        </div>
      </div>
    </div>
  );
}

export function Backtest() {
  return (
    <section className="py-20 bg-card">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What if you <span className="text-primary">only took A & B grades</span>?
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed">
            Here's a simulated 30-trade sample. Same setups, same pairs — just filtered by grade. The C, D, and F trades are the ones killing your P&L.
          </p>

          {/* Stats comparison */}
          <div className="mt-10 grid gap-3 sm:grid-cols-4">
            <StatCard label="Win Rate" before={`${allStats.winRate}`} after={`${filteredStats.winRate}`} suffix="%" positive />
            <StatCard label="Total P&L" before={allStats.totalPnl > 0 ? `+$${allStats.totalPnl}` : `-$${Math.abs(allStats.totalPnl)}`} after={`+$${filteredStats.totalPnl}`} positive />
            <StatCard label="Avg per Trade" before={allStats.avgPnl > 0 ? `+$${allStats.avgPnl}` : `-$${Math.abs(allStats.avgPnl)}`} after={`+$${filteredStats.avgPnl}`} positive />
            <StatCard label="Trades Taken" before={`${allStats.total}`} after={`${filteredStats.total}`} />
          </div>

          {/* Trade log */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* All trades */}
            <div className="rounded-2xl bg-background border border-border overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <span className="text-sm text-muted-foreground">All 30 trades</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {allStats.winRate}% WR
                </span>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                <div className="divide-y divide-border/50">
                  {allTrades.map((t, i) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.15, delay: i * 0.02 }}
                      className="flex items-center gap-3 px-5 py-2 text-xs"
                    >
                      <span className="font-mono text-muted-foreground/50 w-5">{t.id}</span>
                      <span className="font-mono text-muted-foreground w-16">{t.pair}</span>
                      <span className={cn("font-mono font-medium w-8", gradeColor(t.grade), gradeBg(t.grade), "rounded px-1.5 py-0.5 text-center text-[10px]")}>
                        {t.grade}
                      </span>
                      <span className="flex-1" />
                      <span className={cn("font-mono font-medium", t.pnl > 0 ? "text-bullish" : "text-bearish")}>
                        {t.pnl > 0 ? "+" : ""}{t.pnl}
                      </span>
                      {t.pnl > 0 ? (
                        <TrendingUp className="h-3 w-3 text-bullish" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-bearish" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filtered trades */}
            <div className="rounded-2xl bg-background border-2 border-primary/30 glow-border overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5 text-primary" />
                  <span className="text-sm font-medium text-primary">A & B grades only</span>
                </div>
                <span className="font-mono text-xs text-bullish font-medium">
                  {filteredStats.winRate}% WR
                </span>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                <div className="divide-y divide-border/50">
                  {filteredTrades.map((t, i) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.15, delay: i * 0.02 }}
                      className="flex items-center gap-3 px-5 py-2 text-xs"
                    >
                      <span className="font-mono text-muted-foreground/50 w-5">{t.id}</span>
                      <span className="font-mono text-muted-foreground w-16">{t.pair}</span>
                      <span className={cn("font-mono font-medium w-8", gradeColor(t.grade), gradeBg(t.grade), "rounded px-1.5 py-0.5 text-center text-[10px]")}>
                        {t.grade}
                      </span>
                      <span className="flex-1" />
                      <span className={cn("font-mono font-medium", t.pnl > 0 ? "text-bullish" : "text-bearish")}>
                        {t.pnl > 0 ? "+" : ""}{t.pnl}
                      </span>
                      {t.pnl > 0 ? (
                        <TrendingUp className="h-3 w-3 text-bullish" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-bearish" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Bottom CTA */}
              <div className="border-t border-border px-5 py-3 bg-primary/5">
                <p className="text-xs text-muted-foreground text-center">
                  <span className="text-primary font-medium">{allStats.total - filteredStats.total} bad trades filtered out</span>
                  {" "}— fewer trades, bigger edge
                </p>
              </div>
            </div>
          </div>

          {/* Bottom callout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 rounded-2xl bg-[#1a1a1c] border border-[#2a2a2c] p-6 text-center"
          >
            <p className="text-base text-foreground font-medium">
              The strategy wasn't wrong. You were taking the wrong setups.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Trading Overlay doesn't make you a better analyst — it makes you a more disciplined one.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
