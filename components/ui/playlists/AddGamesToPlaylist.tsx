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

  useEffect(() => {
    async function fetchGames() {
      const supabase = createClient();
      const { data } = await supabase.from('games').select('*');
      setGames(data || []);
    }
    fetchGames();
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Ajouter des jeux</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Ajouter des jeux</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-6">
          {games.map((game) => (
            <div key={game.id} className="flex items-center justify-between border p-3 rounded-lg">
              <div className="flex items-center gap-4">
                <img src={game.thumbnail} alt={game.title} className="w-12 h-12 rounded-md" />
                <span>{game.title}</span>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => addGameToPlaylist(playlistId, game.id)}
              >
                Ajouter
              </Button>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
