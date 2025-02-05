'use server';

import { createClient } from '@/utils/supabase/server';
import { stripe } from '@/utils/stripe';
import { redirect } from 'next/navigation';

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/');
}

export async function createCheckoutSession(priceId: string) {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      throw new Error('Not authenticated');
    }

    // Fetch the user's profile from Supabase
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', session.user.id)
      .single();

    if (profileError) {
      throw new Error('Error fetching user profile');
    }

    let customerId = profile?.stripe_customer_id;

    // 🔥 Check if Stripe customer exists (handle deleted customers)
    if (customerId) {
      try {
        await stripe.customers.retrieve(customerId);
      } catch (error: any) {
        if (error.code === "resource_missing") {
          console.warn(`Stripe customer ${customerId} does not exist. Creating a new one.`);
          customerId = null;
        } else {
          throw error;
        }
      }
    }

    // 🆕 If the customer doesn't exist, create it
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: { userId: session.user.id },
      });

      // Update Supabase with new Stripe customer ID
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ stripe_customer_id: customer.id })
        .eq('id', session.user.id);

      if (updateError) {
        throw new Error('Error updating user profile with new Stripe customer ID');
      }

      customerId = customer.id;
    }

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/canceled`,
      customer: customerId,
      client_reference_id: session.user.id,
    });

    if (!checkoutSession.url) {
      throw new Error('Something went wrong');
    }

    return { url: checkoutSession.url };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
