'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AddEditPlaylist } from '@/components/ui/playlists/AddEditPlaylist';
import { AddGamesToPlaylist } from '@/components/ui/playlists/AddGamesToPlaylist';
import { deletePlaylist } from '@/app/actions/playlists';

interface Playlist {
  id: string;
  name: string;
  is_favorite: boolean;
}

interface PlaylistListProps {
  playlists: Playlist[];
}

export function PlaylistList({ playlists }: PlaylistListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {playlists.map((playlist) => (
        <Card key={playlist.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-bold">{playlist.name}</CardTitle>
              {!playlist.is_favorite && (
                <AddEditPlaylist playlist={playlist} />
              )}
            </div>
            {!playlist.is_favorite && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() => deletePlaylist(playlist.id)}
              >
                Supprimer
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <AddGamesToPlaylist playlistId={playlist.id} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
