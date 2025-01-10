'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SubscriptionsListProps {
  subscriptions: any[];
}

export function SubscriptionsList({ subscriptions }: SubscriptionsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vos Abonnements</CardTitle>
        <CardDescription>Manage your subscription plans.</CardDescription>
      </CardHeader>
      <CardContent>
        {subscriptions.length === 0 ? (
          <p className="text-muted-foreground">Aucun abonnement actif trouvé.</p>
        ) : (
          subscriptions.map((subscription) => {
            const product = subscription.items[0].product;
            const price = subscription.items[0].price;

            return (
              <div key={subscription.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: price.currency,
                    }).format(price.unit_amount / 100)}
                    /{price.recurring?.interval}
                  </p>
                  <p className="text-sm text-muted-foreground">Status: {subscription.status}</p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
