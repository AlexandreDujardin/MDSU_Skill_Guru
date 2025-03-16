import { GameDetail } from "@/components/ui/games/GameDetail";
import { PageLayout } from "@/components/PageLayout";
import { createClient } from "@/utils/supabase/server";

export default async function GameDetailPage({ params }: { params?: { slug?: string } }) {
  if (!params?.slug) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-red-500">Paramètre invalide !</p>
      </div>
    );
  }

  const supabase = createClient();

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
        tag={game.tags[0]}
        video={game.video}
      />
    </PageLayout>
  );
}
