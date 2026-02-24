"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-base font-semibold tracking-tight text-foreground">Trading Overlay</span>
        </Link>
        <Button
          size="sm"
          className="rounded-full px-5 text-sm"
          onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
        >
          Get the Indicator
        </Button>
      </div>
    </nav>
  );
}
