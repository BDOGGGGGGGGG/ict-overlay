"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/navbar";

const strategies = [
  {
    tag: "ICT",
    name: "Inner Circle Trader",
    description:
      "Trade where banks and hedge funds enter. Detect Order Blocks, Fair Value Gaps, Break of Structure, and liquidity sweeps.",
    concepts: ["Order Blocks", "Fair Value Gaps", "BOS / MSS", "Liquidity Pools", "Premium & Discount"],
    color: "text-primary",
    bg: "bg-primary/15",
  },
  {
    tag: "SMC",
    name: "Smart Money Concepts",
    description:
      "Follow institutional order flow. Identify supply & demand zones, change of character, and smart money traps.",
    concepts: ["Supply & Demand", "Change of Character", "Inducement", "Breaker Blocks", "Imbalance Zones"],
    color: "text-bullish",
    bg: "bg-bullish/15",
  },
  {
    tag: "PA",
    name: "Price Action",
    description:
      "Pure chart reading. Spot support & resistance, candlestick patterns, trendlines, and key reversal signals.",
    concepts: ["Support & Resistance", "Pin Bars & Engulfing", "Trendlines", "Double Tops/Bottoms", "Flag Patterns"],
    color: "text-warning",
    bg: "bg-warning/15",
  },
];

export default function StrategiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Available <span className="text-primary">Strategies</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Choose your methodology. The AI handles the rest.
          </p>
        </motion.div>

        <div className="space-y-4">
          {strategies.map((s, i) => (
            <motion.div
              key={s.tag}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="rounded-2xl bg-card p-6 border border-border hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`font-mono text-xs font-medium ${s.color} ${s.bg} px-2.5 py-0.5 rounded-full`}>
                  {s.tag}
                </span>
                <span className="text-lg font-medium text-foreground">{s.name}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {s.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.concepts.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 rounded-2xl bg-card p-8 text-center border border-border"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">
            All strategies included in every plan.
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Switch between ICT, SMC, and Price Action anytime.
          </p>
          <Link href="/pricing">
            <Button size="lg" className="rounded-full px-8 glow-green transition-shadow duration-300">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
