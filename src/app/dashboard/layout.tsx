import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { supabase } from "@/lib/supabase";
import { DashboardShell } from "@/components/dashboard/shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", session.sub)
    .in("status", ["active", "trialing"])
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return (
    <DashboardShell email={session.email} subscription={subscription ?? null}>
      {children}
    </DashboardShell>
  );
}
