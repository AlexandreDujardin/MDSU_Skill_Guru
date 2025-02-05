import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { stripe } from "@/utils/stripe"; // Import Stripe instance

export async function middleware(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
      },
    }
  );

  // Get user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let hasSubscription = false;
  let subscriptionStatus = "inactive";

  if (session?.user) {
    // Fetch the user's profile from Supabase
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("stripe_customer_id, subscription_status")
      .eq("id", session.user.id)
      .single();

    if (!profileError && profile?.stripe_customer_id) {
      try {
        // 🔥 Check if the Stripe customer still exists
        await stripe.customers.retrieve(profile.stripe_customer_id);

        // 🔍 Fetch active subscriptions for this customer
        const subscriptions = await stripe.subscriptions.list({
          customer: profile.stripe_customer_id,
          status: "active",
        });

        hasSubscription = subscriptions.data.length > 0;
        subscriptionStatus = hasSubscription ? "active" : "inactive";
      } catch (error: any) {
        if (error.code === "resource_missing") {
          console.warn(`Customer ${profile.stripe_customer_id} does not exist in Stripe. Resetting subscription.`);
          
          // 🔄 Reset subscription status in Supabase if Stripe customer was deleted
          await supabase
            .from("profiles")
            .update({ subscription_status: "inactive", stripe_customer_id: null })
            .eq("id", session.user.id);

          hasSubscription = false;
          subscriptionStatus = "inactive";
        } else {
          console.error("Error fetching Stripe customer:", error);
        }
      }
    }
  }

  const url = request.nextUrl.clone();

  // If user has no active subscription, force them to stay on the offers page
  if (!hasSubscription && url.pathname !== "/offers") {
    url.pathname = "/offers";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to all pages except API routes, static assets, and auth
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"],
};
