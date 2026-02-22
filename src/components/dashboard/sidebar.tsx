"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LineChart,
  Clock,
  Settings,
  Home,
  Search,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Analysis", icon: LineChart, href: "#", disabled: true },
  { label: "Screener", icon: Search, href: "#", disabled: true },
  { label: "History", icon: Clock, href: "#", disabled: true },
  { label: "Settings", icon: Settings, href: "#", disabled: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-12 flex-col items-center border-r border-border bg-sidebar py-2">
      <Link
        href="/"
        className="mb-3 flex h-8 w-8 items-center justify-center rounded text-primary font-bold text-xs"
      >
        ICT
      </Link>

      <div className="mb-2 h-px w-6 bg-border" />

      <nav className="flex flex-1 flex-col items-center gap-0.5">
        {navItems.map((item) => {
          const isActive = item.href === pathname;
          return (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded transition-colors",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                    item.disabled && "pointer-events-none opacity-30"
                  )}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Home className="h-[18px] w-[18px]" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="text-xs">
          Home
        </TooltipContent>
      </Tooltip>
    </aside>
  );
}
