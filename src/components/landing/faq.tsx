"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does it work?",
    answer:
      "Pick your strategy (ICT, SMC, or Price Action), choose a stock or pair, and Trading Overlay does the rest. It auto-detects setups, marks zones, and grades every buying opportunity from F to A+ — all in real time on your dashboard.",
  },
  {
    question: "What strategies does it support?",
    answer:
      "ICT (Order Blocks, FVGs, BOS, MSS), SMC (Supply & Demand, Change of Character, Breaker Blocks), and Price Action (S/R levels, Pin Bars, Engulfing patterns). Switch between them with one click.",
  },
  {
    question: "How is this different from other trading tools?",
    answer:
      "Most tools just detect one pattern type. Trading Overlay detects multiple patterns from your chosen strategy, then scores them based on confluence — how many signals align at the same level. That's the grading system. You get a letter grade (F to A+) for every setup.",
  },
  {
    question: "What does the grading system measure?",
    answer:
      "Confluence. An A+ means multiple signals from your chosen strategy all align at the same price level — trend direction, volume, structural context. A C means one signal showed up with no supporting context. The grade tells you whether a setup is worth risking capital on.",
  },
  {
    question: "What markets and pairs does it work on?",
    answer:
      "Forex, indices, crypto, stocks, commodities — any tradeable instrument. It works on all timeframes from 1 minute to monthly.",
  },
  {
    question: "Can I get alerts?",
    answer:
      "Yes. Get real-time notifications when high-confluence B+ or A+ setups form on any stock or pair you're watching.",
  },
  {
    question: "Is this a trading bot?",
    answer:
      "No. It's a live analysis platform. It shows you where the setups are, grades them by confluence, and ranks the best buying opportunities — you decide whether to take the trade. No automated execution.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Both monthly and yearly plans can be cancelled at any time from your dashboard. No contracts, no commitments.",
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
