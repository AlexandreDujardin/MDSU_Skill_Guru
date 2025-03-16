'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { createClient } from '@/utils/supabase/client';
import { addGameToPlaylist } from '@/app/actions/playlists';

interface Game {
  id: string;
  title: string;
  thumbnail: string;
}

interface AddGamesToPlaylistProps {
  playlistId: string;
}

export function AddGamesToPlaylist({ playlistId }: AddGamesToPlaylistProps) {
  const [open, setOpen] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [playlistGames, setPlaylistGames] = useState<string[]>([]); // Store game IDs in the playlist

  useEffect(() => {
    async function fetchGames() {
      const supabase = createClient();

      // ✅ Fetch all games
      const { data: allGames, error: gamesError } = await supabase.from('games').select('*');
      if (gamesError) console.error("❌ Error fetching games:", gamesError);

      // ✅ Fetch games already in the playlist
      const { data: playlistData, error: playlistError } = await supabase
        .from('playlist_games')
        .select('game_id')
        .eq('playlist_id', playlistId);

      if (playlistError) console.error("❌ Error fetching playlist games:", playlistError);

      // ✅ Store existing game IDs
      const existingGameIds = playlistData ? playlistData.map((pg) => pg.game_id) : [];

      // ✅ Filter out games that are already in the playlist
      const filteredGames = allGames?.filter((game) => !existingGameIds.includes(game.id)) || [];

      setGames(filteredGames);
      setPlaylistGames(existingGameIds);
    }

    fetchGames();
  }, [playlistId]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variantType="secondary" size="sm" className="min-w-fit">Ajouter des jeux</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-text-primary">Ajouter des jeux</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          {games.length > 0 ? (
            games.map((game) => (
              <div key={game.id} className="flex items-center justify-between border p-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={game.thumbnail} alt={game.title} className="w-12 h-12 rounded-md" />
                  <span>{game.title}</span>
                </div>
                <Button
                  onClick={async () => {
                    await addGameToPlaylist(playlistId, game.id);
                    setGames((prev) => prev.filter((g) => g.id !== game.id)); // ✅ Remove from list after adding
                  }}
                >
                  Ajouter
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Tous les jeux sont déjà ajoutés à la playlist.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
