import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { PlaylistDetails } from "@/components/ui/playlists/PlayListDetails";

interface PlaylistPage {
  params: Promise<{ slug: string }>;
}

export default async function PlaylistPage({ params }: PlaylistPage) {
  const resolvedParams = await params;
  const supabase = await createClient();

  // ✅ Fetch the playlist using the slug instead of ID
  const { data: playlist, error } = await supabase
    .from("playlists")
    .select("id, name, is_favorite, slug, playlist_games(game_id, games(id, title, thumbnail, slug))")
    .eq("slug", resolvedParams.slug)
    .single();

  if (error || !playlist) {
    console.error("❌ Playlist not found:", error);
    return notFound();
  }

  return <PlaylistDetails playlist={playlist} />;
}
