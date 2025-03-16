import { GameDetail } from "@/components/ui/games/GameDetail";
import { createClient } from "@/utils/supabase/server";

interface GameDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();

  // Fetch the game by slug
  const { data: game, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", resolvedParams.slug)
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
