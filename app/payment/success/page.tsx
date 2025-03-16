import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { stripe } from '@/utils/stripe';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckIcon } from 'lucide-react';

// ✅ Nouvelle syntaxe Next.js 15 : récupération asynchrone des searchParams
export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const params = await searchParams; // ✅ Attendre la résolution de searchParams
  const sessionId = params.session_id;

  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  try {
    if (sessionId) {
      // Récupération de la session Stripe
      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['subscription', 'subscription.default_payment_method', 'subscription.items'],
      });

      const subscription = checkoutSession.subscription as any;

      // Récupération des informations du produit
      const itemsWithProducts = await Promise.all(
        subscription.items.data.map(async (item: any) => {
          const price = item.price;
          const product = await stripe.products.retrieve(price.product as string);
          return {
            ...item,
            price,
            product,
          };
        })
      );

      // Mise à jour du profil utilisateur
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
            Merci pour votre achat. Vous avez maintenant accès à toutes les fonctionnalités liées à votre abonnement.
            <span className="block mt-2">Order ID: {checkoutSession.id}</span>
          </p>
          <Button asChild>
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      );
    }
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    redirect('/payment/canceled');
  }

  return (
    <div className="text-center mt-10">
      <h1 className="text-xl text-red-500">Erreur de paiement</h1>
      <p className="text-gray-500">Aucune session de paiement trouvée.</p>
      <Button asChild>
        <Link href="/">Retour à l'accueil</Link>
      </Button>
    </div>
  );
}
