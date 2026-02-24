"use client";

import { motion } from "framer-motion";
import { Eye, Layers, Clock, Brain } from "lucide-react";

const points = [
  {
    icon: Eye,
    label: "Auto-Detect Setups",
    pain: "Staring at the chart and still not sure what's a valid setup",
    solve:
      "The indicator detects Order Blocks, FVGs, Supply & Demand zones, Pin Bars, and more — automatically, on every candle. No more second-guessing.",
  },
  {
    icon: Layers,
    label: "3 Strategies, 1 Indicator",
    pain: "Needing separate indicators for ICT, SMC, and Price Action",
    solve:
      "Switch between ICT, SMC, and Price Action with one dropdown. Each strategy runs its own detection engine with the right patterns for that methodology.",
  },
  {
    icon: Brain,
    label: "Confluence Grading",
    pain: "Taking trades with one signal and hoping for the best",
    solve:
      "Every setup is scored by how many signals align at the same level. More confluence = higher grade = higher probability. The indicator does the math for you.",
  },
  {
    icon: Clock,
    label: "Built-In Alerts",
    pain: "Missing entries because you weren't watching at the right time",
    solve:
      "Set TradingView alerts for B+ or A+ grade setups. Get notified the moment a high-confluence setup forms on any pair you're watching.",
  },
];

export function PainPoints() {
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
            One indicator. <span className="text-primary">Every strategy.</span>
          </h2>


          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {points.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl bg-card p-6 border border-border hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <p.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{p.label}</span>
                </div>
                <p className="text-sm text-bearish/80 mb-3 italic">
                  &ldquo;{p.pain}&rdquo;
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.solve}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
