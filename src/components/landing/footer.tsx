import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-2">
          <Logo className="h-5" />
          <span className="text-sm font-semibold text-foreground">Trading Overlay</span>
        </div>

        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
