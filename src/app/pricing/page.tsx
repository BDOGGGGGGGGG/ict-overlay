"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/landing/navbar";

const plans = [
  {
    name: "Monthly",
    icon: Zap,
    price: "$30",
    interval: "/mo",
    description: "Full access, billed monthly",
    features: [
      "Real-time strategy overlay detection",
      "ICT, SMC & Price Action patterns",
      "AI-powered trade scoring",
      "Up to 5 pairs monitored",
      "1H, 4H, 1D timeframes",
      "Email alerts",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    icon: Crown,
    price: "$200",
    interval: "/yr",
    description: "Everything included — save $160/yr",
    badge: "Best Value",
    features: [
      "Everything in Monthly",
      "Unlimited pairs",
      "All timeframes (1m–1M)",
      "Priority AI analysis",
      "Advanced confluence scoring",
      "Webhook & API access",
      "Discord community access",
      "Early access to new features",
    ],
    cta: "Get Pro",
    highlighted: true,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">

            Simple, <span className="text-primary">transparent</span> pricing.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Cancel anytime. No questions asked.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8",
                plan.highlighted
                  ? "border-primary/30 bg-card glow-border"
                  : "border-border bg-card"
              )}
            >
              {plan.badge && (
                <span className="absolute -top-3 right-6 rounded-full bg-bullish px-3 py-1 text-xs font-medium text-white">
                  {plan.badge}
                </span>
              )}

              <div className="flex items-center gap-2 mb-6">
                <plan.icon
                  className={cn(
                    "h-5 w-5",
                    plan.highlighted ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span className={cn("text-lg font-semibold", plan.highlighted ? "text-foreground" : "text-foreground")}>
                  {plan.name}
                </span>
              </div>

              <div className="mb-2">
                <span className={cn("text-4xl font-semibold font-mono", plan.highlighted ? "text-foreground" : "text-foreground")}>
                  {plan.price}
                </span>
                <span className={cn("text-base", plan.highlighted ? "text-muted-foreground" : "text-muted-foreground")}>
                  {plan.interval}
                </span>
              </div>
              <p className={cn("text-sm mb-8", plan.highlighted ? "text-muted-foreground" : "text-muted-foreground")}>
                {plan.description}
              </p>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cn(
                        "h-4 w-4 mt-0.5 shrink-0",
                        plan.highlighted ? "text-bullish" : "text-bullish"
                      )}
                    />
                    <span className="text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "w-full rounded-full h-11 text-sm",
                  plan.highlighted && "glow-green transition-shadow duration-300"
                )}
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Secure payment via Stripe. Cancel anytime from your dashboard.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
