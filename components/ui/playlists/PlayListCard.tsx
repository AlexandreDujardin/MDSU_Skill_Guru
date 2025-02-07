import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { removeGameFromPlaylist } from "@/app/actions/playlists";
import { AddGamesToPlaylist } from "@/components/ui/playlists/AddGamesToPlaylist";

interface PlaylistProps {
  playlist: {
    id: string;
    name: string;
    is_favorite: boolean;
    games: { id: string; title: string; thumbnail: string; slug: string }[];
  };
}

export const PlaylistCard = ({ playlist }: PlaylistProps) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex justify-between items-center">
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {playlist.games.length > 0 ? (
            playlist.games.map((game) => (
              <div key={game.id} className="relative group">
                <Link href={`/catalog/${game.slug}`} className="block">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <p className="text-sm text-center mt-1">{game.title}</p>
                </Link>
                {/* Remove Button (only if it's not the "Favorites" playlist) */}
                {!playlist.is_favorite && (
                  <Button
                    variant="destructive"
                    size="xs"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={async () => {
                      await removeGameFromPlaylist(playlist.id, game.id);
                    }}
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-2">Aucun jeu ajouté.</p>
          )}
        </div>

        {/* Add new games to the playlist */}
        {!playlist.is_favorite && <AddGamesToPlaylist playlistId={playlist.id} />}
      </CardContent>
    </Card>
  );
};
