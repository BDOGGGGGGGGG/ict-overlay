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
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", session.sub)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const hasStripeCustomer = !!subscription?.stripe_customer_id;

  const statusColor: Record<string, "default" | "destructive" | "secondary"> =
    {
      active: "default",
      trialing: "default",
      canceled: "destructive",
      past_due: "destructive",
      incomplete: "secondary",
    };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account and subscription
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Email address</p>
            <p className="text-sm font-medium text-foreground">
              {session.email}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Subscription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {subscription ? (
            <>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Current plan
                </p>
                <p className="text-sm font-medium capitalize">
                  {subscription.plan} — $
                  {subscription.plan === "yearly" ? "19" : "29"}/mo
                  <Badge
                    variant={statusColor[subscription.status] ?? "secondary"}
                    className="ml-2 text-[10px]"
                  >
                    {subscription.status}
                  </Badge>
                </p>
              </div>

              {subscription.current_period_end && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {subscription.status === "canceled"
                      ? "Access until"
                      : "Renews"}
                  </p>
                  <p className="text-sm font-medium">
                    {new Date(
                      subscription.current_period_end
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}

              <Separator />

              {hasStripeCustomer && (
                <Button variant="outline" size="sm" asChild>
                  <a href="/api/portal">
                    Manage billing
                    <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                  </a>
                </Button>
              )}
            </>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                No active subscription
              </p>
              <Button size="sm" className="glow-green" asChild>
                <Link href="/pricing">Subscribe now</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
