import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { PageLayout } from "@/components/PageLayout";
import { ProductList } from '@/components/ui/products/product-list';
import { Navbar } from '@/components/navbar';

export default async function OffersPage() {
  const supabase = await createClient();

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
    <div className="p-8 min-h-screen">
      {/* Barre de navigation */}
      <Navbar />

      {/* Contenu principal */}
      <div className="container justify-start mx-auto px-6 py-12">
        <h1 className="text-h1-d font-bold text-text-primary mb-4">
          Bienvenue chez Skill Guru !
        </h1>
        <h2 className="text-text-primary font-bold text-h2-d">
          Pour bénéficier de l’ensemble de nos fonctionnalités, veuillez sélectionner l’offre de votre choix et souscrire à un abonnement.
        </h2>
      </div>

      {/* Affichage des offres */}
      <div className="container mx-auto px-6">
        <ProductList />
        <h2 className="text-text-primary font-bold mt-8 text-h2-d">Avec Skill Guru, l’expertise devient un jeu !</h2>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-text-secondary text-sm py-2 border-t border-border-default">
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="hover:underline">Mentions légales</a>
          <a href="#" className="hover:underline">CGV</a>
          <a href="#" className="hover:underline">CGU</a>
        </div>
      </footer>
    </div>
  );
}
