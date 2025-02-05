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

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    redirect('/');
  }

  // Fetch subscriptions for the user
  let subscriptionsWithProducts = [];
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
              ...item,
              price: {
                id: price.id,
                unit_amount: price.unit_amount,
                currency: price.currency,
                recurring: price.recurring,
              },
              product: {
                id: product.id,
                name: product.name,
                description: product.description,
                images: product.images,
              },
            };
          })
        );

        return {
          ...subscription,
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
          subscriptions={subscriptionsWithProducts}
          user={session.user}
        />
    </PageLayout>
  );
}
