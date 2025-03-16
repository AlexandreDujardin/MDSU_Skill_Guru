import { NextResponse } from "next/server";
import { stripe } from "@/utils/stripe";
import { createClient } from "@/utils/supabase/server";
import { Stripe } from "stripe"; // ✅ Import des types Stripe

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  const supabase = await createClient();

  let event: Stripe.Event;
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

  // ✅ Extraction et typage du Stripe Event
  const eventType = event.type;
  const data = event.data.object as any; // ⚠️ Ajout d'un cast temporaire

  console.log(`🔔 Stripe Webhook Received: ${eventType}`);

  try {
    if (eventType === "checkout.session.completed") {
      const session = data as Stripe.Checkout.Session; // ✅ Cast vers Stripe.Checkout.Session
      const customerId = session.customer as string;
      const userId = session.client_reference_id;
      const subscriptionId = session.subscription as string;
      const priceId = session.metadata?.price_id;

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
      const invoice = data as Stripe.Invoice; // ✅ Cast vers Stripe.Invoice
      const customerId = invoice.customer as string;

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
      const subscription = data as Stripe.Subscription; // ✅ Cast vers Stripe.Subscription
      const customerId = subscription.customer as string;

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
