import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  TrendingUp,
  Bell,
  FlaskConical,
  Lightbulb,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const comingSoonFeatures = [
  {
    icon: TrendingUp,
    label: "Grading",
    description: "Setup quality scoring across all your trades",
  },
  {
    icon: Bell,
    label: "Alerts",
    description: "Real-time notifications for high-confidence setups",
  },
  {
    icon: FlaskConical,
    label: "Backtesting",
    description: "Historical performance analysis by grade",
  },
  {
    icon: Lightbulb,
    label: "Trade Ideas",
    description: "Curated setups based on your strategy",
  },
];

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", session.sub)
    .in("status", ["active", "trialing"])
    .limit(1)
    .single();

  const hasActiveSubscription = !!subscription;
  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back, {session.email}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          {hasActiveSubscription ? (
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground capitalize">
                    {subscription.plan} plan
                    <Badge className="ml-2 text-[10px]">Active</Badge>
                  </p>
                  {periodEnd && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Renews {periodEnd}
                    </p>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/account">Manage</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  No active subscription
                </p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">
                  Subscribe to unlock the Trading Overlay indicator
                </p>
              </div>
              <Button size="sm" className="glow-green shrink-0" asChild>
                <Link href="/pricing">
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
          Coming soon
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {comingSoonFeatures.map(({ icon: Icon, label, description }) => (
            <Card key={label} className="opacity-60">
              <CardContent className="pt-6 flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
