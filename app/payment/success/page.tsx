import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { stripe } from '@/utils/stripe';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckIcon } from 'lucide-react';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  const sessionId = searchParams.session_id;

  try {
    if (sessionId) {
      // Retrieve the checkout session and subscription
      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['subscription', 'subscription.default_payment_method', 'subscription.items'],
      });

      const subscription = checkoutSession.subscription;

      // Fetch product information separately for each item
      const itemsWithProducts = await Promise.all(
        subscription.items.data.map(async (item) => {
          const price = item.price;
          const product = await stripe.products.retrieve(price.product as string);
          return {
            ...item,
            price,
            product,
          };
        })
      );

      // Update user profile with subscription details
      await supabase
        .from('profiles')
        .update({
          subscription_status: subscription.status,
          subscription_price_id: subscription.items.data[0].price.id,
          subscription_end_date: subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : null,
        })
        .eq('id', session.user.id);

      return (
        <div className="max-w-md mx-auto text-center">
          <div className="rounded-full h-12 w-12 bg-green-100 text-green-600 mx-auto mb-4 flex items-center justify-center">
            <CheckIcon className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Paiement réussi !</h1>
          <p className="text-muted-foreground mb-8">
            Merci pour votre achat. Vous avez maintenant accès à toutes les fonctionnalités liés à votre abonnemment.
            <span className="block mt-2">Order ID: {checkoutSession.id}</span>
          </p>
          <Button asChild>
            <Link href="/dashboard">Retour à l'acceuil</Link>
          </Button>
        </div>
      );
    }
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    redirect('/payment/canceled');
  }
}
