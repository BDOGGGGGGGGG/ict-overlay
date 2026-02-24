"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  LayoutDashboard,
  User,
  TrendingUp,
  Bell,
  FlaskConical,
  Lightbulb,
  Menu,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Subscription } from "@/lib/supabase";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
};

const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Grading",
    href: "/dashboard/grading",
    icon: TrendingUp,
    disabled: true,
  },
  { label: "Alerts", href: "/dashboard/alerts", icon: Bell, disabled: true },
  {
    label: "Backtesting",
    href: "/dashboard/backtesting",
    icon: FlaskConical,
    disabled: true,
  },
  {
    label: "Trade Ideas",
    href: "/dashboard/trade-ideas",
    icon: Lightbulb,
    disabled: true,
  },
  { label: "Account", href: "/dashboard/account", icon: User },
];

function NavContent({
  email,
  pathname,
  onNavigate,
}: {
  email: string;
  pathname: string;
  onNavigate?: () => void;
}) {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-4 py-5">
        <Logo className="h-6" />
        <span className="text-sm font-semibold text-foreground">
          Trading Overlay
        </span>
      </div>
      <Separator />

      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          if (item.disabled) {
            return (
              <div
                key={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground/40 cursor-not-allowed"
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
                <span className="ml-auto text-[10px] font-medium text-muted-foreground/30 bg-muted/20 px-1.5 py-0.5 rounded">
                  Soon
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Separator />

      <div className="p-4">
        <p className="text-xs text-muted-foreground truncate mb-3">{email}</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </div>
  );
}

export function DashboardShell({
  email,
  children,
}: {
  email: string;
  subscription: Subscription | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {isDesktop && (
        <aside className="w-60 shrink-0 border-r border-border bg-card flex flex-col">
          <NavContent email={email} pathname={pathname} />
        </aside>
      )}

      {!isDesktop && (
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            className="w-60 p-0 bg-card border-r border-border"
            showCloseButton={false}
          >
            <NavContent
              email={email}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {!isDesktop && (
          <header className="h-14 flex items-center gap-3 border-b border-border px-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Logo className="h-5" />
            <span className="text-sm font-semibold">Trading Overlay</span>
          </header>
        )}

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
