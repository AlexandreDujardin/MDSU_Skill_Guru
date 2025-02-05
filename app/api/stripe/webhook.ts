import { NextResponse } from "next/server";
import { stripe } from "@/utils/stripe";
import { createServerClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error("Stripe webhook error:", error.message);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  // Extract Stripe event type
  const eventType = event.type;
  const data = event.data.object;
  console.log(`🔔 Stripe Webhook Received: ${eventType}`);

  try {
    if (eventType === "checkout.session.completed") {
      // When a user completes a checkout, update Supabase
      const customerId = data.customer;
      const userId = data.client_reference_id;
      const subscriptionId = data.subscription;
      const priceId = data?.metadata?.price_id;

      if (userId) {
        await supabase
          .from("profiles")
          .update({
            stripe_customer_id: customerId,
            subscription_status: "active",
            subscription_price_id: priceId || null,
          })
          .eq("id", userId);
      }
    }

    if (eventType === "invoice.payment_succeeded") {
      // When an invoice is paid, update subscription info
      const subscriptionId = data.subscription;
      const customerId = data.customer;

      const { data: userProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single();

      if (userProfile) {
        await supabase
          .from("profiles")
          .update({ subscription_status: "active" })
          .eq("id", userProfile.id);
      }
    }

    if (
      eventType === "customer.subscription.deleted" ||
      eventType === "invoice.payment_failed"
    ) {
      // When a subscription is canceled or payment fails
      const customerId = data.customer;

      const { data: userProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single();

      if (userProfile) {
        await supabase
          .from("profiles")
          .update({
            subscription_status: "inactive",
            subscription_price_id: null,
            subscription_end_date: new Date().toISOString(),
          })
          .eq("id", userProfile.id);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
