"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createChart, ColorType, CandlestickSeries, createSeriesMarkers } from "lightweight-charts";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Activity, Target, Award, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLACEHOLDER_CHART_DATA } from "@/lib/chart-data";

type Strategy = "ICT" | "SMC" | "PA";

const STRATEGY_DATA: Record<Strategy, {
  zones: { top: number; bottom: number; opacity: number; label: string }[];
  markers: { time: string; position: "belowBar"; color: string; shape: "arrowUp"; text: string }[];
  stats: { zones: number; confidence: number; grade: string };
}> = {
  ICT: {
    zones: [
      { top: 1.0840, bottom: 1.0830, opacity: 0.5, label: "Order Block" },
      { top: 1.0880, bottom: 1.0870, opacity: 0.35, label: "FVG Zone" },
      { top: 1.0920, bottom: 1.0910, opacity: 0.2, label: "BOS Level" },
    ],
    markers: [
      { time: "2025-01-24", position: "belowBar", color: "#3dd68c", shape: "arrowUp", text: "OB" },
      { time: "2025-02-14", position: "belowBar", color: "#3dd68c", shape: "arrowUp", text: "FVG" },
      { time: "2025-03-14", position: "belowBar", color: "#3dd68c", shape: "arrowUp", text: "BOS" },
    ],
    stats: { zones: 3, confidence: 94, grade: "A+" },
  },
  SMC: {
    zones: [
      { top: 1.0850, bottom: 1.0835, opacity: 0.5, label: "Demand Zone" },
      { top: 1.0900, bottom: 1.0890, opacity: 0.35, label: "Supply Zone" },
    ],
    markers: [
      { time: "2025-01-31", position: "belowBar", color: "#3dd68c", shape: "arrowUp", text: "Demand" },
      { time: "2025-03-07", position: "belowBar", color: "#3dd68c", shape: "arrowUp", text: "CHoCH" },
    ],
    stats: { zones: 2, confidence: 87, grade: "A" },
  },
  PA: {
    zones: [
      { top: 1.0860, bottom: 1.0845, opacity: 0.5, label: "Support" },
      { top: 1.0905, bottom: 1.0895, opacity: 0.35, label: "Resistance" },
      { top: 1.0930, bottom: 1.0920, opacity: 0.2, label: "Trendline" },
      { top: 1.0825, bottom: 1.0815, opacity: 0.15, label: "Pin Bar" },
    ],
    markers: [
      { time: "2025-01-17", position: "belowBar", color: "#3dd68c", shape: "arrowUp", text: "Pin" },
      { time: "2025-02-07", position: "belowBar", color: "#3dd68c", shape: "arrowUp", text: "S/R" },
      { time: "2025-02-28", position: "belowBar", color: "#3dd68c", shape: "arrowUp", text: "Engulf" },
      { time: "2025-03-21", position: "belowBar", color: "#3dd68c", shape: "arrowUp", text: "S/R" },
    ],
    stats: { zones: 4, confidence: 78, grade: "B+" },
  },
};

export function HeroChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<ReturnType<ReturnType<typeof createChart>["addSeries"]> | null>(null);
  const [strategy, setStrategy] = useState<Strategy>("ICT");

  // Create chart once
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#1a1a1c" },
        textColor: "#636366",
        fontSize: 10,
      },
      grid: {
        vertLines: { color: "#2a2a2c" },
        horzLines: { color: "#2a2a2c" },
      },
      crosshair: {
        vertLine: { color: "#48484a", width: 1, style: 3, labelBackgroundColor: "#1c1c1e" },
        horzLine: { color: "#48484a", width: 1, style: 3, labelBackgroundColor: "#1c1c1e" },
      },
      rightPriceScale: { borderColor: "#2a2a2c", textColor: "#636366" },
      timeScale: { borderColor: "#2a2a2c", timeVisible: false },
      autoSize: true,
      handleScroll: false,
      handleScale: false,
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#3dd68c",
      downColor: "#ff453a",
      borderDownColor: "#ff453a",
      borderUpColor: "#3dd68c",
      wickDownColor: "#ff453a",
      wickUpColor: "#3dd68c",
    });

    const data = PLACEHOLDER_CHART_DATA.slice(5, 65);
    series.setData(data);
    chart.timeScale().fitContent();

    chartRef.current = chart;
    seriesRef.current = series;

    return () => chart.remove();
  }, []);

  // Apply strategy overlays
  const applyStrategy = useCallback((s: Strategy) => {
    const series = seriesRef.current;
    if (!series) return;

    // Clear existing price lines
    const data = STRATEGY_DATA[s];

    // Remove all price lines by re-creating series data
    // Price lines can't be individually removed easily, so we recreate the series
    const chart = chartRef.current;
    if (!chart) return;

    chart.removeSeries(series);

    const newSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#3dd68c",
      downColor: "#ff453a",
      borderDownColor: "#ff453a",
      borderUpColor: "#3dd68c",
      wickDownColor: "#ff453a",
      wickUpColor: "#3dd68c",
    });

    const chartData = PLACEHOLDER_CHART_DATA.slice(5, 65);
    newSeries.setData(chartData);

    // Add zones
    data.zones.forEach((zone) => {
      newSeries.createPriceLine({
        price: zone.top,
        color: `rgba(61, 214, 140, ${zone.opacity})`,
        lineWidth: 2,
        lineStyle: 0,
        axisLabelVisible: false,
        title: zone.label,
      });
      newSeries.createPriceLine({
        price: zone.bottom,
        color: `rgba(61, 214, 140, ${zone.opacity})`,
        lineWidth: 2,
        lineStyle: 0,
        axisLabelVisible: false,
        title: "",
      });
    });

    // Add markers
    createSeriesMarkers(newSeries, data.markers);

    seriesRef.current = newSeries;
    chart.timeScale().fitContent();
  }, []);

  // Apply initial strategy
  useEffect(() => {
    // Small delay to ensure chart is ready
    const t = setTimeout(() => applyStrategy("ICT"), 50);
    return () => clearTimeout(t);
  }, [applyStrategy]);

  const handleStrategyChange = (s: Strategy) => {
    setStrategy(s);
    applyStrategy(s);
  };

  const stats = STRATEGY_DATA[strategy].stats;
  const zoneFills = Array.from({ length: 5 }, (_, i) => i < stats.zones);

  return (
  <>
    <section className="mx-auto max-w-5xl px-6 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-14 max-w-2xl"
      >
        <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl leading-[1.08]">
          Every trade, backed by <span className="text-primary">data</span>.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Choose your strategy — ICT, SMC, or Price Action — and let AI detect buy-in zones on your chart, graded from F to A+.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link href="/pricing">
            <Button size="lg" className="rounded-full px-8 text-base h-12 glow-green transition-shadow duration-300">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <span className="text-sm text-muted-foreground">From $30/mo</span>
        </div>
      </motion.div>

      {/* Chart + Overlay Panel — same box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_260px] overflow-hidden rounded-2xl border border-border glow-border"
      >
        {/* Chart side */}
        <div className="min-w-0">
          {/* Chart header */}
          <div className="flex items-center gap-3 border-b border-[#2a2a2c] bg-[#1a1a1c] px-5 py-2.5 text-sm">
            <span className="font-mono text-xs font-medium text-foreground">EUR/USD</span>
            <span className="font-mono text-[10px] text-muted-foreground">1H</span>
            <div className="h-3 w-px bg-[#2a2a2c]" />
            <span className="font-mono text-xs text-bullish font-semibold">1.0847</span>
            <span className="font-mono text-[10px] text-bullish">+0.11%</span>
            <div className="ml-auto flex items-center gap-3">
              <motion.span
                key={stats.zones}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded bg-primary/15 px-2.5 py-0.5 font-mono text-[10px] font-medium text-primary"
              >
                {stats.zones} Zone{stats.zones !== 1 ? "s" : ""}
              </motion.span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-bullish">
                <span className="h-1.5 w-1.5 rounded-full bg-bullish animate-pulse" />
                LIVE
              </span>
            </div>
          </div>
          <div ref={chartContainerRef} className="h-[500px] w-full" />
        </div>

        {/* Overlay Panel — right side, same box */}
        <div className="border-t lg:border-t-0 lg:border-l border-[#2a2a2c] bg-[#141416] flex flex-col">
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-[#2a2a2c] bg-[#1a1a1c] px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-[#a78bfa]" />
              <span className="font-mono text-[11px] font-bold text-[#a78bfa] uppercase tracking-widest">Overlay</span>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-bullish">
              <span className="h-1.5 w-1.5 rounded-full bg-bullish animate-pulse" />
              ACTIVE
            </span>
          </div>

          {/* Stats */}
          <div className="flex-1 px-4 py-5 space-y-0">
            {/* Strategy selector */}
            <div className="pb-5 mb-5 border-b border-[#2a2a2c]">
              <div className="flex items-center gap-1.5 mb-3">
                <Bot className="h-3 w-3 text-[#636366]" />
                <span className="font-mono text-[10px] text-[#636366] uppercase tracking-wider">Strategy</span>
              </div>
              <div className="flex gap-1.5">
                {(["ICT", "SMC", "PA"] as Strategy[]).map((s) => {
                  const colors: Record<Strategy, { active: string; border: string }> = {
                    ICT: { active: "bg-[#3dd68c]/20 text-[#3dd68c] border-[#3dd68c]/30", border: "border" },
                    SMC: { active: "bg-[#60a5fa]/20 text-[#60a5fa] border-[#60a5fa]/30", border: "border" },
                    PA: { active: "bg-[#fbbf24]/20 text-[#fbbf24] border-[#fbbf24]/30", border: "border" },
                  };
                  return (
                    <button
                      key={s}
                      onClick={() => handleStrategyChange(s)}
                      className={cn(
                        "rounded px-2.5 py-1 font-mono text-[10px] transition-all cursor-pointer",
                        strategy === s
                          ? `${colors[s].active} font-medium ${colors[s].border}`
                          : "bg-[#2a2a2c] text-[#636366] hover:text-foreground hover:bg-[#333]"
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Buy Zones — cyan */}
            <div className="pb-5 mb-5 border-b border-[#2a2a2c]">
              <div className="flex items-center gap-1.5 mb-2">
                <Target className="h-3 w-3 text-[#22d3ee]" />
                <span className="font-mono text-[10px] text-[#22d3ee] uppercase tracking-wider">Buy Zones</span>
              </div>
              <motion.div
                key={stats.zones}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-5xl font-bold text-[#22d3ee] leading-none mb-2"
              >
                {stats.zones}
              </motion.div>
              <div className="flex gap-1">
                {zoneFills.map((filled, i) => (
                  <motion.div
                    key={`${strategy}-${i}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={cn(
                      "h-1.5 flex-1 rounded-full origin-left",
                      filled ? "bg-[#22d3ee]" : "bg-[#2a2a2c]"
                    )}
                    style={filled ? { opacity: 1 - i * 0.15 } : undefined}
                  />
                ))}
              </div>
            </div>

            {/* Confidence — amber */}
            <div className="pb-5 mb-5 border-b border-[#2a2a2c]">
              <div className="flex items-center gap-1.5 mb-2">
                <Activity className="h-3 w-3 text-[#fbbf24]" />
                <span className="font-mono text-[10px] text-[#fbbf24] uppercase tracking-wider">Confidence</span>
              </div>
              <motion.div
                key={stats.confidence}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-5xl font-bold text-[#fbbf24] leading-none mb-2"
              >
                {stats.confidence}<span className="text-xl text-[#636366]">%</span>
              </motion.div>
              <div className="h-2 rounded-full bg-[#2a2a2c] overflow-hidden">
                <motion.div
                  key={`conf-${strategy}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.confidence}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#fbbf24]/70 to-[#fbbf24]"
                />
              </div>
            </div>

            {/* Best Grade — green */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Award className="h-3 w-3 text-[#3dd68c]" />
                <span className="font-mono text-[10px] text-[#3dd68c] uppercase tracking-wider">Best Grade</span>
              </div>
              <motion.div
                key={stats.grade}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-5xl font-bold text-[#3dd68c] leading-none"
              >
                {stats.grade}
              </motion.div>
              <span className="font-mono text-[10px] text-[#636366]">confluence rating</span>
            </div>
          </div>

          {/* Panel footer */}
          <div className="border-t border-[#2a2a2c] px-4 py-3 mt-auto">
            <div className="flex items-center gap-1.5">
              <Bot className="h-3 w-3 text-[#a78bfa]" />
              <span className="font-mono text-[10px] text-[#636366]">Powered by AI</span>
            </div>
          </div>
        </div>
      </motion.div>

    </section>

    {/* Social proof — full width */}
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="border-y border-border bg-card py-14"
    >
      <div className="mx-auto max-w-5xl px-6 grid grid-cols-3 gap-8">
        <div className="text-center">
          <div className="font-mono text-4xl font-semibold text-foreground sm:text-5xl">$2M+</div>
          <div className="mt-2 text-sm text-muted-foreground">Connected in accounts</div>
        </div>
        <div className="text-center border-x border-border">
          <div className="font-mono text-4xl font-semibold text-foreground sm:text-5xl">400+</div>
          <div className="mt-2 text-sm text-muted-foreground">Active traders</div>
        </div>
        <div className="text-center">
          <div className="font-mono text-4xl font-semibold text-foreground sm:text-5xl">12K+</div>
          <div className="mt-2 text-sm text-muted-foreground">Zones graded</div>
        </div>
      </div>
    </motion.section>
  </>
  );
}
