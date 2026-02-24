"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function VerifyForm() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const from = searchParams.get("from") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Enter the 6-digit code");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        router.push(from);
        router.refresh();
      } else {
        setError(data.error || "Invalid code");
      }
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-xs text-muted-foreground text-center">
        Sent to{" "}
        <span className="text-foreground font-medium">{email}</span>
      </p>
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        placeholder="000000"
        value={code}
        onChange={(e) => {
          setCode(e.target.value.replace(/\D/g, ""));
          setError("");
        }}
        className="w-full rounded-xl bg-card border border-border px-4 py-3.5 text-center text-2xl tracking-[0.5em] font-mono text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
      />
      {error && (
        <p className="text-xs text-bearish text-center">{error}</p>
      )}
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-xl h-12 text-base glow-green"
        disabled={loading || code.length !== 6}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify code"
        )}
      </Button>
      <button
        type="button"
        className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
        onClick={() => router.push("/login")}
      >
        Use a different email
      </button>
    </form>
  );
}
