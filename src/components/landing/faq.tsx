"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How is this different from TradingView ICT indicators?",
    answer:
      "TradingView scripts detect shapes geometrically — they'll mark any random candle as an \"order block.\" This AI doesn't just find patterns, it grades whether they're actually tradeable based on confluence, market context, and structural alignment across multiple timeframes. That's the difference between a shape detector and an actual trading tool.",
  },
  {
    question: "Is this a trading bot?",
    answer:
      "No. It's an analysis overlay. It shows you where the setups are and grades them — you decide whether to take the trade. No automated execution, no black-box signals. You stay in control.",
  },
  {
    question: "I already know ICT. Why do I need this?",
    answer:
      "You know the concepts. But under pressure during New York session, can you simultaneously scan 3 timeframes for OBs, track every unfilled FVG, confirm BOS, and catch MSS before the crowd? That 30-60 minutes of prep happens in seconds. The AI doesn't replace your knowledge — it removes the manual grind so you can focus on execution.",
  },
  {
    question: "What does the grading system actually measure?",
    answer:
      "Confluence. An A+ means multiple ICT concepts — order block, FVG, BOS, liquidity sweep — all align at the same price level across multiple timeframes. A C means one concept showed up with no supporting context. The grade tells you whether a setup is worth risking capital on.",
  },
  {
    question: "Will this work for NQ during kill zones?",
    answer:
      "Yes. It works on Forex pairs (EUR/USD, GBP/USD, etc.), US indices (NQ, ES, YM), and major crypto. It's especially useful during fast sessions like New York open where you can't manually scan everything in time.",
  },
  {
    question: "I keep taking C-grade setups out of FOMO. How does this help?",
    answer:
      "That's exactly what the grading system is for. It gives you a simple rule: no grade below B, no trade. When you can see the letter grade in real-time, it's much easier to pass on weak setups. The discipline is built into the tool.",
  },
  {
    question: "What's the difference between Monthly and Pro?",
    answer:
      "Monthly gives you full access for $30/mo. Pro is $200/yr (saves $160 annually) and includes priority support, all timeframes from 1m to 1M, multi-chart analysis for cross-pair correlation, and webhook/API access.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. No contracts, no cancellation fees. Full refund within the first 7 days, no questions asked. You keep access until the end of your billing period.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            Questions? Answers.
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl">
            Everything you need to know before getting started.
          </p>

          <div className="mt-10 max-w-2xl">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="border-b border-border"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between py-5 text-left"
                  >
                    <span className="text-base font-medium text-foreground pr-8">
                      {faq.question}
                    </span>
                    <svg
                      className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-45"
                      )}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-200 ease-in-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-sm text-muted-foreground leading-relaxed max-w-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
