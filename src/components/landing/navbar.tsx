import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";

export async function Navbar() {
  const session = await getSession();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-base font-semibold tracking-tight text-foreground">
            Trading Overlay
          </span>
        </Link>
        {session ? (
          <Button size="sm" className="rounded-full px-5 text-sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Button size="sm" className="rounded-full px-5 text-sm" asChild>
              <Link href="/pricing">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
