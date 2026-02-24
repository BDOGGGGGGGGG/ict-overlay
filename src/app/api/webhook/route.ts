import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });
}

function getNextPeriodEnd(stripeSub: Stripe.Subscription): string | null {
  // In newer Stripe API versions, current_period_end is on items, not the subscription
  const item = stripeSub.items.data[0];
  if (item?.current_period_end) {
    return new Date(item.current_period_end * 1000).toISOString();
  }
  return null;
}

async function upsertUserAndSubscription(
  email: string,
  stripeCustomerId: string,
  stripeSub: Stripe.Subscription,
  plan: string
) {
  // Upsert user
  const { data: user, error: userError } = await supabase
    .from("users")
    .upsert({ email: email.toLowerCase().trim() }, { onConflict: "email" })
    .select()
    .single();

  if (userError || !user) {
    console.error("Failed to upsert user:", userError);
    return;
  }

  // Upsert subscription
  const { error: subError } = await supabase.from("subscriptions").upsert(
    {
      user_id: user.id,
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: stripeSub.id,
      plan: plan === "yearly" ? "yearly" : "monthly",
      status: stripeSub.status as
        | "active"
        | "canceled"
        | "past_due"
        | "trialing"
        | "incomplete",
      current_period_end: getNextPeriodEnd(stripeSub),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" }
  );

  if (subError) {
    console.error("Failed to upsert subscription:", subError);
  }
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email || session.metadata?.email;
      const plan = session.metadata?.plan || "monthly";
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      if (email && subscriptionId) {
        const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);
        await upsertUserAndSubscription(email, customerId, stripeSub, plan);
      }
    }

    if (event.type === "customer.subscription.updated") {
      const stripeSub = event.data.object as Stripe.Subscription;
      const customer = await stripe.customers.retrieve(
        stripeSub.customer as string
      );

      if (!customer.deleted && "email" in customer && customer.email) {
        // Derive plan from price ID
        const priceId = stripeSub.items.data[0]?.price?.id;
        let plan = "monthly";
        if (priceId === process.env.STRIPE_PRICE_YEARLY) plan = "yearly";

        await upsertUserAndSubscription(
          customer.email,
          stripeSub.customer as string,
          stripeSub,
          plan
        );
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const stripeSub = event.data.object as Stripe.Subscription;
      await supabase
        .from("subscriptions")
        .update({
          status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", stripeSub.id);
    }
  } catch (err) {
    console.error("Webhook processing error:", err);
  }

  return NextResponse.json({ received: true });
}
