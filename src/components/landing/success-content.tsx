"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15"
      >
        <CheckCircle className="h-10 w-10 text-primary" />
      </motion.div>

      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        You&apos;re in.
      </h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Payment confirmed. Here&apos;s your Trading Overlay indicator. Paste it
        into TradingView&apos;s Pine Editor and click &quot;Add to Chart.&quot;
      </p>

      {sessionId && (
        <p className="mt-2 text-xs text-muted-foreground/60 font-mono">
          Order: {sessionId.slice(0, 20)}...
        </p>
      )}

      <div className="mt-8 space-y-3">
        <Button
          size="lg"
          className="w-full rounded-full h-12 text-base glow-green"
          asChild
        >
          <a href="/trading-overlay.pine" download>
            <Download className="h-4 w-4 mr-2" />
            Download Pine Script
          </a>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-full h-12 text-base"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </Button>
      </div>

      <div className="mt-10 rounded-2xl bg-card border border-border p-5 text-left">
        <h3 className="text-sm font-medium text-foreground mb-3">
          Quick Start
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span className="font-mono text-primary font-bold">1.</span>
            Open TradingView and go to any chart
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-primary font-bold">2.</span>
            Open Pine Editor (bottom panel)
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-primary font-bold">3.</span>
            Paste the downloaded script
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-primary font-bold">4.</span>
            Click &quot;Add to Chart&quot; — done
          </li>
        </ol>
      </div>
    </motion.div>
  );
}
