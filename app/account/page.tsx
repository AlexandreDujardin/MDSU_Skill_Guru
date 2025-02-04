import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { stripe } from '@/utils/stripe';
import { AccountTabs } from './account-tabs';
import { PageLayout } from '@/components/PageLayout';

export default async function AccountPage() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    return (
      <PageLayout>
        <p>Please set up your payment information to access subscriptions.</p>
      </PageLayout>
    );
  }

  // Fetch subscriptions for the user
  const subscriptions = await stripe.subscriptions.list({
    customer: profile.stripe_customer_id,
    status: 'all',
    expand: ['data.items'],
  });

  // Fetch product details and serialize the data
  const subscriptionsWithProducts = await Promise.all(
    subscriptions.data.map(async (subscription) => {
      const itemsWithProducts = await Promise.all(
        subscription.items.data.map(async (item) => {
          const price = item.price;
          const product = await stripe.products.retrieve(price.product as string);

          return {
            ...item,
            price: {
              ...price,
              // Ensure `price.product` is a string
              product: price.product,
            },
            product: {
              ...product,
            },
          };
        })
      );

      return {
        ...subscription,
        items: itemsWithProducts.map((item) => ({
          ...item,
          price: {
            id: item.price.id,
            unit_amount: item.price.unit_amount,
            currency: item.price.currency,
            recurring: item.price.recurring,
          },
          product: {
            id: item.product.id,
            name: item.product.name,
            description: item.product.description,
            images: item.product.images,
          },
        })),
      };
    })
  );

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">Paramètre du compte</h1>
        <AccountTabs
          profile={profile}
          subscriptions={subscriptionsWithProducts}
          user={session.user}
        />
    </PageLayout>

  );
}
