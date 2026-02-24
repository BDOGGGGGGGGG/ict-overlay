import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSession } from "@/lib/session";
import { supabase } from "@/lib/supabase";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", session.sub)
    .not("stripe_customer_id", "is", null)
    .limit(1)
    .single();

  if (!subscription?.stripe_customer_id) {
    return NextResponse.redirect(new URL("/dashboard/account", req.url));
  }

  const stripe = getStripe();
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/account`,
  });

  return NextResponse.redirect(portalSession.url);
}
