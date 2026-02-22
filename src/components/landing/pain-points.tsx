"use client";

import { motion } from "framer-motion";
import { Eye, Layers, Clock, Brain } from "lucide-react";

const points = [
  {
    icon: Eye,
    label: "Order Block Detection",
    pain: "Is this actually an OB or just a random candle?",
    solve:
      "Identifies institutional footprints your eye can miss at speed. On NQ during New York, you can't manually scan 3 timeframes — the AI can.",
  },
  {
    icon: Layers,
    label: "Fair Value Gap Analysis",
    pain: "Manually tracking every unfilled gap across timeframes",
    solve:
      "Tracks every unfilled imbalance and alerts you when price returns to fill. FVG hunts are the most tedious part of ICT prep — automated.",
  },
  {
    icon: Brain,
    label: "Break of Structure",
    pain: "Getting faked out by single-timeframe BOS signals",
    solve:
      "Multi-timeframe BOS confirmation. Stop getting faked out by single-TF signals — the #1 ICT newbie mistake.",
  },
  {
    icon: Clock,
    label: "Market Structure Shift",
    pain: "Missing reversals because you can't watch 5m and 15m at once",
    solve:
      "Early reversal detection before the crowd sees it. MSS requires watching multiple timeframes simultaneously — the AI does it for you.",
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
            You know the strategy. <span className="text-primary">The execution kills you.</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed">
            ICT works. But misidentifying setups under pressure, drowning in confluences, and spending 30–60 minutes on multi-timeframe prep — that's where traders blow up.
          </p>

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
