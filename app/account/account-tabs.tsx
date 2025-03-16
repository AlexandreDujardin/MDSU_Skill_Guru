"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "./profile-form";
import { SubscriptionsList } from "./subscriptions-list";
import type Stripe from 'stripe'; // ✅ Correct import
import type { User } from '@supabase/supabase-js';

interface AccountTabsProps {
  profile: any;
  subscriptions: Stripe.Subscription[]; // ✅ Use `Stripe.Subscription`
  user: User;
}

export function AccountTabs({ profile, subscriptions, user }: AccountTabsProps) {
  return (
    <Tabs defaultValue="profile" className="max-w-4xl">
      <TabsList>
        <TabsTrigger value="profile">Profil</TabsTrigger>
        <TabsTrigger value="subscriptions">Abonnement</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileForm initialProfile={profile} user={user} />
      </TabsContent>
      <TabsContent value="subscriptions">
        <SubscriptionsList subscriptions={subscriptions} />
      </TabsContent>
    </Tabs>
  );
}
