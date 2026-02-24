"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Plan = "monthly" | "yearly";

const features = [
  "3 strategies — ICT, SMC, Price Action",
  "10+ pattern detections",
  "F to A+ confluence grading",
  "Zone boxes & grade labels on chart",
  "Built-in alert conditions",
  "Works on any pair & timeframe",
  "All future updates included",
];

export function Pricing() {
  const [plan, setPlan] = useState<Plan>("yearly");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const price = plan === "yearly" ? 19 : 29;
  const period = plan === "yearly" ? "/mo" : "/mo";
  const billedLabel = plan === "yearly" ? "Billed $228/year" : "Billed monthly";

  const handleCheckout = async () => {
    if (!email || !email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-card">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Get the indicator.
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed">
            Enter your email, pick a plan, and you&apos;ll get access to the Pine Script instantly after checkout. Cancel anytime.
          </p>

          <div className="mt-10 max-w-md">
            {/* Plan toggle */}
            <div className="flex items-center gap-1 rounded-full bg-[#1a1a1c] border border-[#2a2a2c] p-1 mb-6 w-fit">
              <button
                onClick={() => setPlan("monthly")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all",
                  plan === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setPlan("yearly")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all flex items-center gap-2",
                  plan === "yearly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Yearly
                <span className={cn(
                  "text-[10px] font-bold rounded-full px-2 py-0.5",
                  plan === "yearly"
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-primary/15 text-primary"
                )}>
                  SAVE 34%
                </span>
              </button>
            </div>

            <div className="rounded-2xl bg-background border-2 border-primary/30 glow-border p-6">
              {/* Header */}
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Trading Overlay</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <motion.span
                  key={price}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-bold text-foreground font-mono"
                >
                  ${price}
                </motion.span>
                <span className="text-lg text-muted-foreground">{period}</span>
              </div>
              <p className="text-xs text-muted-foreground/60 mb-6">{billedLabel}</p>

              {/* Features */}
              <ul className="space-y-2.5 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Email + Buy */}
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCheckout();
                  }}
                  className="w-full rounded-xl bg-[#1a1a1c] border border-[#2a2a2c] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
                />

                {error && (
                  <p className="text-xs text-bearish">{error}</p>
                )}

                <Button
                  size="lg"
                  className="w-full rounded-xl h-12 text-base glow-green transition-shadow duration-300"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Redirecting to checkout...
                    </>
                  ) : (
                    <>
                      Subscribe — ${price}/mo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-muted-foreground/60 text-center">
                  Secure payment via Stripe. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
