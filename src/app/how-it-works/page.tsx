"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/navbar";

const steps = [
  {
    number: "01",
    title: "Connect your chart",
    description:
      "Link your TradingView or broker chart to Trading Overlay. Choose your strategy — ICT, SMC, or Price Action — and the AI starts scanning.",
  },
  {
    number: "02",
    title: "AI detects key patterns",
    description:
      "The engine identifies strategy-specific patterns — Order Blocks, Fair Value Gaps, supply/demand zones, support/resistance levels — in real-time.",
  },
  {
    number: "03",
    title: "Confluence is scored",
    description:
      "When multiple concepts from your chosen strategy align at the same price level, the confluence score increases. This is what separates noise from signal.",
  },
  {
    number: "04",
    title: "Zones get graded F to A+",
    description:
      "Each buy-in zone receives a letter grade based on its confluence score. A+ means perfect alignment. You only take B+ or above.",
  },
  {
    number: "05",
    title: "You decide, AI assists",
    description:
      "Trading Overlay doesn't execute trades. It shows you where smart money enters and how strong the setup is. You make the final call.",
  },
];

const concepts = [
  {
    abbr: "OB",
    name: "Order Blocks",
    description: "The last candle before a strong move. Institutions use these levels to accumulate or distribute positions.",
  },
  {
    abbr: "FVG",
    name: "Fair Value Gaps",
    description: "Three-candle patterns where the middle candle doesn't overlap with the outer candles. Price tends to return to fill these.",
  },
  {
    abbr: "BOS",
    name: "Break of Structure",
    description: "When price breaks a significant swing high or low, confirming a shift in short-term direction.",
  },
  {
    abbr: "MSS",
    name: "Market Structure Shift",
    description: "A higher-timeframe directional change signaling a potential trend reversal.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            How it works.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl">
            From raw candlestick data to graded buy-in zones — in seconds, not minutes.
          </p>
        </motion.div>

        <div className="space-y-0 mb-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
              className="flex gap-5 border-l-2 border-primary/20 pl-8 pb-10 last:pb-0 relative"
            >
              <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-primary" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-muted-foreground">{step.number}</span>
                  <span className="text-base font-medium text-foreground">{step.title}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Concepts we detect
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {concepts.map((concept) => (
              <div key={concept.abbr} className="rounded-2xl bg-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-medium text-primary bg-primary/15 px-2 py-0.5 rounded-full">
                    {concept.abbr}
                  </span>
                  <span className="text-sm font-medium text-foreground">{concept.name}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {concept.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="rounded-2xl bg-card p-8 text-center"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Ready to see it in action?
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Plans starting at $30/mo. Cancel anytime.
          </p>
          <Link href="/pricing">
            <Button size="lg" className="rounded-full px-8 glow-green transition-shadow duration-300">
              View Pricing
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
