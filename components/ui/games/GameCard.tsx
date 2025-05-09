"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toggleGameInFavorites } from "@/app/actions/playlists";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  slug: string;
  view: string;
}

export const GameCard = ({ id, title, description, tags, thumbnail, slug, view }: GameCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data: favoritesPlaylist } = await supabase
        .from('playlists')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('is_favorite', true)
        .single();

      if (favoritesPlaylist) {
        const { data: existingGame } = await supabase
          .from('playlist_games')
          .select('id')
          .eq('playlist_id', favoritesPlaylist.id)
          .eq('game_id', id)
          .single();

        setIsFavorite(!!existingGame);
      }
    };

    checkIfFavorite();
  }, [id]);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when clicking the heart
    await toggleGameInFavorites(id);
    setIsFavorite((prev) => !prev);
  };

  return (
    <Link href={`/catalog/${slug}`} passHref>
      <Card className="relative flex items-center w-full h-44 shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer p-0">
        {/* Image à gauche avec icône Favoris */}
        <div className="relative w-1/4 h-full">
          <img 
            src={thumbnail} 
            alt={`Image de ${title}`} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Icône Favoris */}
          <button 
            className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/favorite.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy9mYXZvcml0ZS5zdmciLCJpYXQiOjE3NDIxMDA1OTgsImV4cCI6MTc3MzYzNjU5OH0.Uo0ysB0doypnMaV5-gUnsR1L2VVN7gqlMkP6wAazmFw" alt="favoris" /> : <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/not-favorite.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy9ub3QtZmF2b3JpdGUuc3ZnIiwiaWF0IjoxNzQyMTAwNjg5LCJleHAiOjE3NzM2MzY2ODl9._JM4KvhNEmQEV_8T7XYrI6zdEdn_Xo1z2NwjJbLIsTg" alt="pas favoris" />}
          </button>
        </div>

        {/* Contenu à droite */}
        <div className="flex-1 h-full flex flex-col justify-center px-4">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-lg font-semibold text-text-primary">{title}</CardTitle>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </CardHeader>

          {/* Liste des Tags (Fix: Add a unique `key`) */}
          <CardContent className="p-0">
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <Badge key={tag + index} className="bg-button-primary text-text-alternative text-xs px-3 py-1 rounded-full gap-2">
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/tags.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy90YWdzLnN2ZyIsImlhdCI6MTc0MjEwMDgwNSwiZXhwIjoxNzczNjM2ODA1fQ.iEA7XXntWtay_yg_ZAvZgFHpHSDTGOa12U6h-JRMvaw" alt="tag" className="h-4"/>
                    {tag}
                  </Badge>
                ))
              ) : (
                <p className="text-xs text-gray-400">Aucun tag</p>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};
