'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { AddEditPlaylist } from '@/components/ui/playlists/AddEditPlaylist';
import { deletePlaylist } from '@/app/actions/playlists';
import { PlaylistCard } from '@/components/ui/playlists/PlayListCard';
import { AddGamesToPlaylist } from "@/components/ui/playlists/AddGamesToPlaylist";

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

            {/* ✅ Allow adding games to ALL playlists, including Favorites */}
            <AddGamesToPlaylist playlistId={playlist.id} />

            {/* Display playlist games */}
            <PlaylistCard playlist={playlist} />
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500">Aucune playlist disponible.</p>
      )}
    </div>
  );
}
