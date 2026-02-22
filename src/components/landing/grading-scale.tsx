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
            Every buy-in, <span className="text-primary">graded</span>.
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed">
            The AI scores confluence across your chosen strategy's key patterns — then assigns a letter grade so you know exactly which setups are worth taking.
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
                { title: "Confluence Scoring", text: "Multiple concepts at the same price level = higher grade. The more signals that align, the stronger the setup." },
                { title: "Automated Analysis", text: "What takes a trader 20+ minutes happens in seconds. No more manually drawing zones across timeframes." },
                { title: "Only Take A-Rated Setups", text: "Filter out noise. Focus on B+ and above. Stop overtrading bad setups." },
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
