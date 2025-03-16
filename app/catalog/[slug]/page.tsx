import { GameDetail } from "@/components/ui/games/GameDetail";
import { PageLayout } from "@/components/PageLayout";
import { createClient } from "@/utils/supabase/server";

type Props = {
  params: { slug: string }; // ✅ Typage strict et correct
};

export default async function GameDetailPage({ params }: Props) {
  const supabase = createClient();

  // Vérifie que params.slug est bien défini
  if (!params?.slug) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-red-500">Paramètre invalide !</p>
      </div>
    );
  }

  // Fetch du jeu via Supabase
  const { data: game, error } = await supabase
    .from("games")
    .select("*")
    .eq("game_url", params.slug)
    .single();

  if (error || !game) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-red-500">Jeu introuvable !</p>
      </div>
    );
  }

  return (
    <PageLayout>
      <GameDetail
        title={game.title}
        description={game.description}
        tag={game.tags[0]} // Premier tag utilisé
        video={game.video}
      />
    </PageLayout>
  );
}
