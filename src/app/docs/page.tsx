"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, BarChart3, Layers, Gauge, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/navbar";

const sections = [
  {
    icon: Terminal,
    title: "Getting Started",
    items: [
      { label: "Create an account", desc: "Sign up and choose your plan. You'll get instant access to the dashboard." },
      { label: "Connect your chart", desc: "Link your TradingView chart or enter a trading pair manually. The AI starts scanning immediately." },
      { label: "Choose a strategy", desc: "Select ICT, SMC, or Price Action from the strategy picker. You can switch anytime." },
    ],
  },
  {
    icon: Layers,
    title: "Strategies",
    items: [
      { label: "ICT (Inner Circle Trader)", desc: "Detects Order Blocks, Fair Value Gaps, Break of Structure, Market Structure Shifts, and Liquidity Pools." },
      { label: "SMC (Smart Money Concepts)", desc: "Identifies Supply & Demand zones, Change of Character, Inducement, Breaker Blocks, and Imbalance Zones." },
      { label: "Price Action", desc: "Spots Support & Resistance, candlestick patterns (Pin Bars, Engulfing), Trendlines, and chart patterns." },
    ],
  },
  {
    icon: Gauge,
    title: "Grading System",
    items: [
      { label: "How grades work", desc: "Each buy-in zone is scored based on confluence — how many concepts from your chosen strategy align at the same price level." },
      { label: "Grade scale", desc: "Grades range from F (no setup) to A+ (perfect alignment). We recommend only taking B+ and above." },
      { label: "Confluence scoring", desc: "More signals at the same level = higher score. The AI checks multiple timeframes and cross-references patterns automatically." },
    ],
  },
  {
    icon: BarChart3,
    title: "Charts & Analysis",
    items: [
      { label: "Supported markets", desc: "Forex pairs (EUR/USD, GBP/USD, etc.), US indices (NQ, ES, YM), and major crypto pairs." },
      { label: "Timeframes", desc: "Monthly plan: 1H, 4H, 1D. Pro plan: all timeframes from 1m to 1M." },
      { label: "Multi-chart analysis", desc: "Pro users can run the overlay on multiple charts simultaneously for cross-pair correlation." },
    ],
  },
  {
    icon: Bell,
    title: "Alerts & Notifications",
    items: [
      { label: "Email alerts", desc: "Get notified when a B+ or higher zone is detected on your monitored pairs." },
      { label: "Webhook & API", desc: "Pro plan includes webhook support for custom integrations and automated workflows." },
      { label: "Alert customization", desc: "Set minimum grade thresholds, choose which pairs trigger alerts, and configure quiet hours." },
    ],
  },
  {
    icon: Settings,
    title: "Account & Billing",
    items: [
      { label: "Plans", desc: "Monthly ($30/mo) or Pro ($200/yr). All strategies included in every plan." },
      { label: "Cancellation", desc: "Cancel anytime from Settings → Billing. No contracts, no fees. Access continues until end of billing period." },
      { label: "Refunds", desc: "Full refund within the first 7 days, no questions asked. Email support@tradingoverlay.com." },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-14"
        >
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Documentation
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Everything you need to get started with Trading Overlay.
          </p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, si) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + si * 0.06 }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <section.icon className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-card p-5 border border-border"
                  >
                    <div className="text-sm font-medium text-foreground mb-1">{item.label}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-16 rounded-2xl bg-card p-8 text-center border border-border"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Check our support page or reach out directly.
          </p>
          <Link href="/support">
            <Button size="lg" className="rounded-full px-8 glow-green transition-shadow duration-300">
              Contact Support
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
