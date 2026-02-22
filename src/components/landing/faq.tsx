"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is this a trading bot?",
    answer:
      "No. Trading Overlay is an analysis tool, not a bot. It detects buy-in zones on your chart using your chosen strategy and grades them from F to A+ — but you decide whether to take the trade. No automated execution, no black-box signals.",
  },
  {
    question: "What markets does it work on?",
    answer:
      "Forex pairs (EUR/USD, GBP/USD, etc.), US indices (NQ, ES, YM), and major crypto pairs. All strategies work across liquid markets.",
  },
  {
    question: "Do I need to know these strategies already?",
    answer:
      "No. The AI handles the analysis automatically. Understanding the basics helps you interpret the grades better, but it's not required. We include a quick-start guide with every plan.",
  },
  {
    question: "How is this different from drawing zones manually?",
    answer:
      "Speed and objectivity. A manual trader spends 20+ minutes checking confluences across timeframes. The AI does it in seconds — no bias, no missed setups.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Both plans can be cancelled at any time. No contracts, no cancellation fees. You keep access until the end of your billing period.",
  },
  {
    question: "What's the difference between Monthly and Pro?",
    answer:
      "Monthly gives you full access for $30/mo. Pro is $200/yr (saves $160 annually) and includes priority support, early access to new features, and multi-chart analysis.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We don't store your trades or personal data. The overlay runs analysis on chart data in real-time — nothing is saved or shared.",
  },
  {
    question: "How accurate is the grading system?",
    answer:
      "The AI scores confluence — it doesn't predict direction. An A+ grade means multiple concepts from your chosen strategy align, which historically produces higher-probability setups. No tool can guarantee profits.",
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
