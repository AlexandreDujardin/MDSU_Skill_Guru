"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "./profile-form";
import { SubscriptionsList } from "./subscriptions-list";
import type Stripe from 'stripe';
import type { User } from '@supabase/supabase-js';

interface AccountTabsProps {
  profile: any;
  user: User;
}

export function AccountTabs({ profile, user }: AccountTabsProps) {
  return (
    <Tabs defaultValue="profile" className="max-w-4xl">
      <TabsList>
        <TabsTrigger value="profile">Profil</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileForm initialProfile={profile} user={user} />
      </TabsContent>
    </Tabs>
  );
}
