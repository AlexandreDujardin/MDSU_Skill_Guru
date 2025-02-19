import { GameCard } from "@/components/ui/games/GameCard";
import { PageLayout } from "@/components/PageLayout";
import { createClient } from "@/utils/supabase/server";

export default async function CatalogPage() {
  const supabase = createClient();

  // Fetch games from Supabase
  const { data: games, error } = await supabase.from("games").select("*");

  if (error) {
    console.error("Error fetching games:", error);
    return <p className="text-red-500 text-center">Erreur de chargement des jeux.</p>;
  }

  return (
    <PageLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {games?.map((game) => (
          <GameCard
            key={game.game_url}
            title={game.title}
            description={game.description}
            tag={game.tags[0]} // First tag as primary
            thumbnail={game.thumbnail}
            slug={game.game_url}
          />
        ))}
      </div>
    </PageLayout>
  );
}
