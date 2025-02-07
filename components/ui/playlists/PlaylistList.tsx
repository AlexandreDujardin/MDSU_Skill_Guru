'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { AddEditPlaylist } from '@/components/ui/playlists/AddEditPlaylist';
import { deletePlaylist } from '@/app/actions/playlists';
import { PlaylistCard } from '@/components/ui/playlists/PlayListCard';

interface Playlist {
  id: string;
  name: string;
  is_favorite: boolean;
  games: { id: string; title: string; thumbnail: string; slug: string }[];
}

interface PlaylistListProps {
  playlists: Playlist[];
}

export function PlaylistList({ playlists }: PlaylistListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {playlists.length > 0 ? (
        playlists.map((playlist) => (
          <Card key={playlist.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl font-bold">{playlist.name}</CardTitle>
                {!playlist.is_favorite && <AddEditPlaylist playlist={playlist} />}
              </div>
              {!playlist.is_favorite && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={async () => {
                    await deletePlaylist(playlist.id);
                  }}
                >
                  Supprimer
                </Button>
              )}
            </CardHeader>

            {/* Use the PlaylistCard for displaying the playlist's games */}
            <PlaylistCard playlist={playlist} />
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500">Aucune playlist disponible.</p>
      )}
    </div>
  );
}
