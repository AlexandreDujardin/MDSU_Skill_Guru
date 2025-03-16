"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { AddGamesToPlaylist } from "@/components/ui/playlists/AddGamesToPlaylist";
import { removeGameFromPlaylist } from "@/app/actions/playlists";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { GameCard } from "../games/GameCard";

const supabase = createClient();

// ✅ Définition du type Game
interface Game {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  slug: string;
}

export function PlaylistDetails({ playlist }: { playlist: any }) {
  // ✅ Définition du type correct pour playlistData
  const [playlistData, setPlaylistData] = useState<{ 
    id: string; 
    name: string; 
    is_favorite: boolean; 
    slug: string; 
    games: Game[]; 
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchPlaylist = async () => {
      const { data, error } = await supabase
        .from("playlists")
        .select(`
          id, name, is_favorite, slug,
          playlist_games(game_id, games(id, title, description, tags, thumbnail, slug))
        `)
        .eq("id", playlist.id)
        .single();

      if (error) {
        console.error("❌ Error fetching playlist:", error);
      } else {
        // ✅ Extraction et formatage des jeux
        const games = data?.playlist_games?.flatMap((pg) => pg.games) || [];
        setPlaylistData({ ...data, games });
      }
    };

    fetchPlaylist();
  }, [playlist.id]);

  if (!playlistData) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  return (
    <div className="space-y-6">
      {/* 🏷️ Titre de la Playlist */}
      <div className="p-6">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push("/playlists")} 
              className="flex items-center gap-2 text-text-tertiary text-body1 hover:underline"
            >
              <ArrowLeft size={18} />
              Mes playlists
            </button>
            <h1 className="text-2xl font-bold text-text-primary">{playlistData.name}</h1>
          </div>
        </div>
      </div>

      {/* 🎮 Liste des jeux */}
      <div className="border rounded-lg p-6 bg-background-surface w-full">
        <div className="flex justify-end items-center mb-4">
          <AddGamesToPlaylist playlistId={playlistData.id} />
        </div>

        {playlistData.games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlistData.games.map((game: Game) => (
              <div key={game.id} className="relative">
                {/* ✅ Use GameCard Component */}
                <GameCard 
                  id={game.id}
                  title={game.title}
                  description={game.description}
                  tags={game.tags || []}
                  thumbnail={game.thumbnail}
                  slug={game.slug}
                  view="grid"
                />
                
                {/* ❌ Remove Button */}
                {!playlistData.is_favorite && (
                  <Button
                    className="absolute top-1 right-1"
                    onClick={async () => {
                      await removeGameFromPlaylist(playlistData.id, game.id);
                      setPlaylistData((prev) => prev 
                        ? { ...prev, games: prev.games.filter((g) => g.id !== game.id) }
                        : prev
                      );
                    }}
                  >
                    <Trash2 size={25} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center w-full">
            <div className="flex flex-row justify-end items-center space-x-4">
              <Button variantType="secondary" asChild>
                <AddGamesToPlaylist playlistId={playlistData.id} />
              </Button>
            </div>
            <img src="/images/playlists/add_game.svg" alt="No games" className="w-62 mx-auto mt-4" />
            <p className="text-lg text-gray-600">Vous n’avez pas encore ajouté de jeu dans cette playlist.</p>
          </div>
        )}
      </div>
    </div>
  );
}
