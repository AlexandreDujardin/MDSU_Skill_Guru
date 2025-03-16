import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { stripe } from '@/utils/stripe';
import { AccountTabs } from './account-tabs';
import { PageLayout } from '@/components/PageLayout';
import { Stripe } from 'stripe';



// ✅ Définition du type des abonnements et produits
interface SubscriptionProduct {
  id: string;
  name: string;
  description?: string;
  images: string[];
}

interface SubscriptionPrice {
  id: string;
  unit_amount: number | null;
  currency: string;
  recurring: {
    interval: string;
    interval_count: number;
  } | null;
}

interface SubscriptionItem {
  id: string;
  price: SubscriptionPrice;
  product: SubscriptionProduct;
}

interface SubscriptionData {
  id: string;
  status: string;
  items: SubscriptionItem[];
}

export default async function AccountPage() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    redirect('/');
  }
  let subscriptionsWithProducts: SubscriptionData[] = [];

  if (profile?.stripe_customer_id) {
    const subscriptions = await stripe.subscriptions.list({
      customer: profile.stripe_customer_id,
      status: 'all',
      expand: ['data.items'],
    });

    subscriptionsWithProducts = await Promise.all(
      subscriptions.data.map(async (subscription) => {
        const itemsWithProducts = await Promise.all(
          subscription.items.data.map(async (item) => {
            const price = item.price;
            const product = await stripe.products.retrieve(price.product as string);

            return {
              id: item.id,
              price: {
                id: price.id,
                unit_amount: price.unit_amount,
                currency: price.currency,
                recurring: price.recurring
                  ? {
                      interval: price.recurring.interval,
                      interval_count: price.recurring.interval_count,
                    }
                  : null,
              },
              product: {
                id: product.id,
                name: product.name,
                description: product.description || "",
                images: product.images || [],
              },
            };
          })
        );

        return {
          id: subscription.id,
          status: subscription.status,
          items: itemsWithProducts,
        };
      })
    );
  }

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">Paramètre du compte</h1>
      <AccountTabs
        profile={profile}
        // subscriptions={subscriptionsWithProducts}
        user={session.user}
      />
    </PageLayout>
  );
}
