import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { PlaylistList } from "@/components/ui/playlists/PlaylistList";
import { AddEditPlaylist } from "@/components/ui/playlists/AddEditPlaylist";

export default async function PlaylistPage() {
  const supabase = createClient();

  // Get user session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    console.error("❌ Error getting session:", sessionError);
    return redirect("/auth/sign-in"); // Redirect to sign-in page if not authenticated
  }

  // **Fetch ALL playlists of the user, even if they have no games**
  const { data: playlists, error: playlistError } = await supabase
    .from("playlists")
    .select("id, name, is_favorite")
    .eq("user_id", session.user.id);

  if (playlistError) {
    console.error("❌ Supabase Fetch Error (Playlists):", playlistError.message, playlistError.details);
    return (
      <div>
        <h1 className="text-2xl font-bold">Mes Playlists</h1>
        <p className="text-red-500 text-center">Erreur de chargement des playlists.</p>
      </div>
    );
  }

  // **Fetch all games linked to those playlists**
  const { data: playlistGames, error: gamesError } = await supabase
    .from("playlist_games")
    .select(`
      playlist_id,
      games (id, title, thumbnail, slug)
    `)
    .in("playlist_id", playlists.map((playlist) => playlist.id)); // Fetch only games for the fetched playlists

  if (gamesError) {
    console.error("❌ Supabase Fetch Error (Games):", gamesError.message, gamesError.details);
  }

  // **Map games to their respective playlists**
  const playlistsWithGames = playlists.map((playlist) => ({
    ...playlist,
    games: playlistGames
      ? playlistGames
          .filter((pg) => pg.playlist_id === playlist.id)
          .map((pg) => pg.games)
      : [], // Ensure empty array if no games are found
  }));

  return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Mes Playlists</h1>
          <AddEditPlaylist />
        </div>
        <PlaylistList playlists={playlistsWithGames} />
      </div>
  );
}
