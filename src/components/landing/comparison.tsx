"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createChart, ColorType, CandlestickSeries, createSeriesMarkers } from "lightweight-charts";
import { PLACEHOLDER_CHART_DATA } from "@/lib/chart-data";

function useChart(
  ref: React.RefObject<HTMLDivElement | null>,
  withOverlay: boolean
) {
  useEffect(() => {
    if (!ref.current) return;

    const chart = createChart(ref.current, {
      layout: {
        background: { type: ColorType.Solid, color: withOverlay ? "#2c2c2e" : "#1c1c1e" },
        textColor: "#8e8e93",
        fontSize: 9,
      },
      grid: {
        vertLines: { color: withOverlay ? "#38383a" : "#2c2c2e" },
        horzLines: { color: withOverlay ? "#38383a" : "#2c2c2e" },
      },
      rightPriceScale: { borderColor: "#38383a", textColor: "#8e8e93", visible: true },
      timeScale: { borderColor: "#38383a", timeVisible: false, visible: false },
      crosshair: {
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
      autoSize: true,
      handleScroll: false,
      handleScale: false,
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: withOverlay ? "#3dd68c" : "#48484a",
      downColor: withOverlay ? "#ff453a" : "#38383a",
      borderDownColor: withOverlay ? "#ff453a" : "#38383a",
      borderUpColor: withOverlay ? "#3dd68c" : "#48484a",
      wickDownColor: withOverlay ? "#ff453a" : "#38383a",
      wickUpColor: withOverlay ? "#3dd68c" : "#48484a",
    });

    const data = PLACEHOLDER_CHART_DATA.slice(20, 50);
    series.setData(data);

    if (withOverlay) {
      series.createPriceLine({
        price: 1.0870,
        color: "rgba(61, 214, 140, 0.4)",
        lineWidth: 2,
        lineStyle: 0,
        axisLabelVisible: false,
        title: "Buy Zone",
      });
      series.createPriceLine({
        price: 1.0880,
        color: "rgba(61, 214, 140, 0.4)",
        lineWidth: 2,
        lineStyle: 0,
        axisLabelVisible: false,
        title: "",
      });

      series.createPriceLine({
        price: 1.0910,
        color: "rgba(61, 214, 140, 0.25)",
        lineWidth: 1,
        lineStyle: 0,
        axisLabelVisible: false,
        title: "Buy Zone",
      });
      series.createPriceLine({
        price: 1.0920,
        color: "rgba(61, 214, 140, 0.25)",
        lineWidth: 1,
        lineStyle: 0,
        axisLabelVisible: false,
        title: "",
      });

      const markers = createSeriesMarkers(series, [
        { time: "2025-02-14", position: "belowBar", color: "#3dd68c", shape: "arrowUp", text: "Buy" },
        { time: "2025-03-07", position: "belowBar", color: "#3dd68c", shape: "arrowUp", text: "Buy" },
      ]);
      void markers;
    }

    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [ref, withOverlay]);
}

export function Comparison() {
  const plainRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useChart(plainRef, false);
  useChart(overlayRef, true);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Same chart. <span className="text-primary">Completely different read.</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed">
            On the left: a plain chart. On the right: the same chart analyzed by Trading Overlay — zones detected, setups marked, confluence graded.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="flex items-center border-b border-border bg-card px-5 py-3 text-sm">
                <span className="text-muted-foreground">Without Trading Overlay</span>
              </div>
              <div ref={plainRef} className="h-[240px] w-full bg-card opacity-60" />
            </div>

            <div className="overflow-hidden rounded-2xl border-2 border-primary/30 glow-border">
              <div className="flex items-center justify-between border-b border-border bg-card px-5 py-3 text-sm">
                <span className="font-medium text-primary">With Trading Overlay</span>
                <span className="rounded-full bg-primary/15 px-3 py-0.5 text-xs font-medium text-primary">
                  2 Buy Zones
                </span>
              </div>
              <div ref={overlayRef} className="h-[240px] w-full bg-card" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
