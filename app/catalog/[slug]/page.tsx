import { GameDetail } from "@/components/ui/games/GameDetail";
import { PageLayout } from "@/components/PageLayout";
import { createClient } from "@/utils/supabase/server";
import { PageProps } from "next"; // ✅ Ajout de l'import

export default async function GameDetailPage({ params }: PageProps<{ slug: string }>) {
  const supabase = createClient();

  // Fetch the game by slug
  const { data: game, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !game) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-red-500">Jeu introuvable !</p>
      </div>
    );
  }

  return (
    <div>
      <GameDetail
        title={game.title}
        description={game.description}
        tags={game.tags || []}
        video={game.video}
        concept={game.concept}
        objectif={game.objectif}
      />
    </div>
  );
}
