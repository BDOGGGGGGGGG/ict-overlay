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
  "Live setup ranking & buy zones",
  "Real-time alerts",
  "Any stock, pair, or timeframe",
  "All future features included",
];

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}) {
  const isYearly = plan === "yearly";
  const price = isYearly ? 19 : 29;
  const billedLabel = isYearly ? "Billed $228/year" : "Billed monthly";

  return (
    <button
      onClick={onSelect}
      className={cn(
        "rounded-2xl p-6 text-left transition-all w-full",
        selected
          ? "bg-background border-2 border-primary/40 glow-border"
          : "bg-background border border-border hover:border-primary/20"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap
            className={cn(
              "h-4 w-4",
              selected ? "text-primary" : "text-muted-foreground"
            )}
          />
          <span
            className={cn(
              "text-sm font-medium",
              selected ? "text-primary" : "text-muted-foreground"
            )}
          >
            {isYearly ? "Yearly" : "Monthly"}
          </span>
        </div>
        {isYearly && (
          <span className="text-[10px] font-bold rounded-full bg-primary/15 text-primary px-2.5 py-1">
            SAVE 34%
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-4xl font-bold text-foreground font-mono">
          ${price}
        </span>
        <span className="text-base text-muted-foreground">/mo</span>
      </div>
      <p className="text-xs text-muted-foreground/60">{billedLabel}</p>

      <ul className="mt-6 space-y-2.5">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-sm text-muted-foreground"
          >
            <Check
              className={cn(
                "h-4 w-4 mt-0.5 shrink-0",
                selected ? "text-primary" : "text-muted-foreground/50"
              )}
            />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center">
        <div
          className={cn(
            "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all",
            selected ? "border-primary bg-primary" : "border-muted-foreground/30"
          )}
        >
          {selected && (
            <svg
              className="h-3 w-3 text-primary-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

export function PricingForm() {
  const [plan, setPlan] = useState<Plan>("yearly");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const price = plan === "yearly" ? 19 : 29;

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
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Get started.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Pick a plan, enter your email, and get access instantly. Cancel
          anytime.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="grid gap-4 sm:grid-cols-2 mb-8"
      >
        <PlanCard
          plan="monthly"
          selected={plan === "monthly"}
          onSelect={() => setPlan("monthly")}
        />
        <PlanCard
          plan="yearly"
          selected={plan === "yearly"}
          onSelect={() => setPlan("yearly")}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-md mx-auto space-y-3"
      >
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
          className="w-full rounded-xl bg-card border border-border px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
        />

        {error && <p className="text-xs text-bearish">{error}</p>}

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
      </motion.div>
    </>
  );
}
