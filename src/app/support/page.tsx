"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, FileText, Clock } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";

const contactMethods = [
  {
    icon: Mail,
    title: "Email support",
    description: "Get a response within 24 hours. Pro users get priority replies.",
    label: "Send email",
    href: "mailto:support@tradingoverlay.com",
  },
  {
    icon: MessageCircle,
    title: "Discord community",
    description: "Ask questions, share setups, and connect with other Trading Overlay users.",
    label: "Join Discord",
    href: "#",
  },
];

const faqs = [
  {
    question: "How do I connect my chart?",
    answer: "After subscribing, you'll get access to the dashboard where you can link your TradingView chart or enter any supported trading pair.",
  },
  {
    question: "Which brokers are supported?",
    answer: "Trading Overlay works with chart data directly — it's broker-agnostic. We support forex, indices, and major crypto pairs.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "Go to your dashboard, click Settings, then Billing. You can cancel with one click. No emails, no phone calls.",
  },
  {
    question: "The overlay isn't showing any zones — what's wrong?",
    answer: "This usually means the current price action doesn't have enough confluence. The AI only marks zones when your chosen strategy's concepts align — that's the tool working correctly.",
  },
  {
    question: "Can I use this on mobile?",
    answer: "Yes. The dashboard is fully responsive. For the best experience, we recommend a desktop or tablet screen.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes. If you're not satisfied within the first 7 days, email us for a full refund — no questions asked.",
  },
];

export default function SupportPage() {
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
            Support
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Need help? We&apos;re here for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid gap-4 sm:grid-cols-2 mb-12"
        >
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.href}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30 group"
            >
              <method.icon className="h-5 w-5 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
              <div className="text-base font-medium text-foreground mb-1">{method.title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {method.description}
              </p>
              <span className="text-sm font-medium text-primary">{method.label}</span>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center gap-3 rounded-2xl bg-card px-6 py-4 mb-12"
        >
          <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-sm text-muted-foreground">
            Average response time: <span className="font-medium text-foreground">under 4 hours</span> for Pro, <span className="font-medium text-foreground">under 24 hours</span> for Monthly.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Common questions
          </h2>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border-b border-border py-5 last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="text-base font-medium text-foreground mb-1">{faq.question}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
