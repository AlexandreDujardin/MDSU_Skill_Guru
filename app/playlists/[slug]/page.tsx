import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { PlaylistDetails } from "@/components/ui/playlists/PlayListDetails";
import { PageProps } from "next"; // ✅ Ajout de l'import

export default async function PlaylistPage({ params }: PageProps<{ slug: string }>) {
  const supabase = createClient();

  // ✅ Fetch the playlist using the slug instead of ID
  const { data: playlist, error } = await supabase
    .from("playlists")
    .select("id, name, is_favorite, slug, playlist_games(game_id, games(id, title, thumbnail, slug))")
    .eq("slug", params.slug)
    .single();

  if (error || !playlist) {
    console.error("❌ Playlist not found:", error);
    return notFound();
  }

  return <PlaylistDetails playlist={playlist} />;
}
