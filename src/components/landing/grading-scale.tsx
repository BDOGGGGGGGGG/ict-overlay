"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const grades = [
  { grade: "A+", color: "text-bullish", bg: "bg-bullish", label: "Perfect setup", width: "100%" },
  { grade: "A", color: "text-bullish", bg: "bg-bullish", label: "Excellent", width: "90%" },
  { grade: "B+", color: "text-foreground", bg: "bg-foreground", label: "Strong", width: "78%" },
  { grade: "B", color: "text-foreground", bg: "bg-foreground", label: "Good", width: "65%" },
  { grade: "C", color: "text-warning", bg: "bg-warning", label: "Average", width: "50%" },
  { grade: "D", color: "text-bearish", bg: "bg-bearish", label: "Weak", width: "35%" },
  { grade: "F", color: "text-bearish", bg: "bg-bearish", label: "No setup", width: "15%" },
];

export function GradingScale() {
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
            Trade Quality Grader.
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed">
            Every setup gets a letter grade based on real confluence — how many ICT concepts align at the same price level, across multiple timeframes. No more second-guessing.
            <span className="text-foreground font-medium"> Only trade A and B setups. Let the AI filter out the noise.</span>
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="rounded-2xl bg-background p-6">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-5">
                Buy-In Quality Rating
              </div>
              <div className="space-y-3">
                {grades.map((g, i) => (
                  <motion.div
                    key={g.grade}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-center gap-4"
                  >
                    <span className={cn("w-8 text-right font-mono text-sm font-bold", g.color)}>
                      {g.grade}
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", g.bg)}
                        style={{ width: g.width, opacity: 0.7 }}
                      />
                    </div>
                    <span className="w-28 text-sm text-muted-foreground">{g.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { title: "Not a generic scanner", text: "TradingView has ICT indicator scripts — but they just detect shapes geometrically. This AI grades whether a setup is actually tradeable based on confluence, context, and structural alignment." },
                { title: "30 minutes of prep → 3 seconds", text: "Multi-timeframe analysis, OB validation, FVG tracking, BOS confirmation — all happening simultaneously. What used to be your entire pre-session routine is now instant." },
                { title: "Your new rule: no B, no trade", text: "The grading system isn't just information — it's discipline. Undisciplined traders take C-grade setups out of FOMO. This gives you a rule to follow." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-background p-5">
                  <div className="text-sm font-medium text-foreground mb-1">{item.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
