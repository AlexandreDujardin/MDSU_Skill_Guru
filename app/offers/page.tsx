import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { PageLayout } from "@/components/PageLayout";
import { ProductList } from '@/components/ui/products/product-list';
import { Navbar } from '@/components/navbar';

export default async function OffersPage() {
  const supabase = createClient();

  if (!supabase) {
    console.error("❌ Supabase client not initialized");
    return <p className="text-center text-red-500">Erreur de chargement des offres.</p>;
  }

  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    console.error("❌ Error getting session:", sessionError);
    return redirect("/auth/sign-in"); // Redirect to sign-in page if not authenticated
  }

  // Fetch user's subscription status
  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", session.user.id)
    .single();

  if (fetchError) {
    console.error("❌ Error fetching subscription status:", fetchError.message);
    return (
      <PageLayout>
        <h1 className="text-2xl font-bold">Offres</h1>
        <p className="text-red-500 text-center">Erreur de chargement des abonnements.</p>
      </PageLayout>
    );
  }

  if (profile?.subscription_status === "active") {
    return redirect("/dashboard"); // Redirect subscribed users
  }

  return (
    <div>
      <Navbar pageTitle="Nos Offres" />
      <PageLayout>
        <h1 className="text-2xl font-bold mb-6">Nos Offres</h1>
        <ProductList />
      </PageLayout>
    </div>
  );
}
