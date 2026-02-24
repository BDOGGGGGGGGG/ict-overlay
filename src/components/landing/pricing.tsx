"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Loader2, Zap } from "lucide-react";

const features = [
  "3 strategies — ICT, SMC, Price Action",
  "10+ pattern detections",
  "F to A+ confluence grading",
  "Zone boxes & grade labels on chart",
  "Built-in alert conditions",
  "Works on any pair & timeframe",
  "Lifetime access — one payment",
];

export function Pricing() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        body: JSON.stringify({ email }),
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
            One payment. Lifetime access. No subscriptions, no recurring fees. Enter your email and you&apos;ll get the Pine Script instantly after checkout.
          </p>

          <div className="mt-10 max-w-md">
            <div className="rounded-2xl bg-background border-2 border-primary/30 glow-border p-6">
              {/* Header */}
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Trading Overlay</span>
              </div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-foreground font-mono">$49</span>
                <span className="text-sm text-muted-foreground">one-time</span>
              </div>

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
                      Buy Now — $49
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-muted-foreground/60 text-center">
                  Secure payment via Stripe. You&apos;ll receive the indicator immediately after purchase.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
