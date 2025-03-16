import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { PlaylistList } from "@/components/ui/playlists/PlaylistList";
import { AddEditPlaylist } from "@/components/ui/playlists/AddEditPlaylist";

export default async function PlaylistPage() {
  const supabase = createClient();

  // ✅ Get user session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.user) {
    console.error("❌ Error getting session:", sessionError);
    return redirect("/auth/sign-in"); // Redirect to sign-in page if not authenticated
  }

  // ✅ Fetch ALL playlists of the user, even if they have no games
  const { data: playlists, error: playlistError } = await supabase
    .from("playlists")
    .select("id, name, is_favorite, slug")
    .eq("user_id", session.user.id);

  if (playlistError) {
    console.error("❌ Supabase Fetch Error (Playlists):", playlistError.message);
    return (
      <div>
        <h1 className="text-2xl font-bold">Mes Playlists</h1>
        <p className="text-red-500 text-center">Erreur de chargement des playlists.</p>
      </div>
    );
  }

  // ✅ If no playlists exist, return early (prevents unnecessary query)
  if (!playlists || playlists.length === 0) {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Mes Playlists</h1>
          <AddEditPlaylist />
        </div>
        <p className="text-center text-gray-500">Aucune playlist disponible.</p>
      </div>
    );
  }

  // ✅ Fetch only if playlists exist
  const { data: playlistGames, error: gamesError } = await supabase
    .from("playlist_games")
    .select(`
      playlist_id,
      games (id, title, thumbnail, slug)
    `)
    .in("playlist_id", playlists.map((p) => p.id));

  if (gamesError) {
    console.error("❌ Supabase Fetch Error (Games):", gamesError.message);
  }

  // ✅ Ensure `playlistGames` is an array (handle empty case)
  const playlistsWithGames = playlists.map((playlist) => ({
    ...playlist,
    games: (playlistGames ?? [])
      .filter((pg) => pg.playlist_id === playlist.id)
      .map((pg) => pg.games) || [], // Ensure empty array if no games are found
  }));

  return (
    <div>
      <PlaylistList playlists={playlistsWithGames} />
    </div>
  );
}
