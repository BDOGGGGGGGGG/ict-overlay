"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        router.push(
          `/verify?email=${encodeURIComponent(email)}&from=${encodeURIComponent(from)}`
        );
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        className="w-full rounded-xl bg-card border border-border px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
      />
      {error && <p className="text-xs text-bearish">{error}</p>}
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-xl h-12 text-base glow-green"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending code...
          </>
        ) : (
          <>
            Continue
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
