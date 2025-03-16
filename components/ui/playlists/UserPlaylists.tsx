'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ChevronRight } from 'lucide-react';

const supabase = createClient();

export function UserPlaylists() {
  const [playlists, setPlaylists] = useState<{ id: string; name: string; is_favorite: boolean; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaylists() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('playlists')
        .select('id, name, is_favorite, slug')
        .eq('user_id', session.user.id) // 🔹 Filtrer par user_id
        .order('created_at', { ascending: true });

      if (error) console.error('❌ Erreur de chargement des playlists:', error);
      else setPlaylists(data || []);
      setLoading(false);
    }

    fetchPlaylists();
  }, []);

  // Séparer la playlist favoris et les autres playlists
  const favoritePlaylist = playlists.find((playlist) => playlist.is_favorite);
  const otherPlaylists = playlists.filter((playlist) => !playlist.is_favorite);

  return (
    <div className="bg-background-surface p-6 rounded-lg border border-border-default">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-text-primary">Mes playlists</h2>
        <Button variantType="secondary" asChild>
          <Link href="/playlists">
            Mes playlists
            <ChevronRight size={16} />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ✅ Colonne 1 - Playlist Favoris avec image de fond */}
        <div>
          {favoritePlaylist ? (
            <Card 
              key={favoritePlaylist.id} 
              className="p-4 text-white relative bg-cover bg-center bg-no-repeat min-h-full" 
              style={{ 
                backgroundImage: "url('https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/rouge1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvcm91Z2UxLnBuZyIsImlhdCI6MTc0MjE0MDQzNSwiZXhwIjoxNzczNjc2NDM1fQ.LsBNUPnQz9aSn9dNlkPE6CQ3k0aVaT_UF2HziQBF1GE')",
                backgroundSize: 'cover',
              }} // 🔹 Image de fond
            >
              <Link href={`/playlists/${favoritePlaylist.slug}`}>
                <CardContent className="cursor-pointer p-4 rounded-md"> {/* 🔹 Overlay pour lisibilité */}
                  <h3 className="font-semibold text-lg">Mes jeux {favoritePlaylist.name}</h3>
                  <p className="text-sm opacity-90">Ajoutez vos jeux préférés ici.</p>
                </CardContent>
              </Link>
            </Card>
          ) : (
            <p className="text-text-tertiary">Aucune playlist favorite trouvée.</p>
          )}
        </div>

        {/* ✅ Colonne 2 - Autres playlists ou option "Créer une playlist" avec image de fond */}
        <div>
          {loading ? (
            <p>Chargement...</p>
          ) : otherPlaylists.length > 0 ? (
            <div 
              className="grid grid-cols-1 gap-2 bg-center bg-no-repeat bg-cover min-h-full rounded-md p-4"
              style={{ backgroundImage: "url('https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/beige1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvYmVpZ2UxLnBuZyIsImlhdCI6MTc0MjE0MDM5MiwiZXhwIjoxNzczNjc2MzkyfQ.VetseXjFXtbalaBqi_imXAi7IpDKzqt1GqsvMU20XKk')" }} // 🔹 Image de fond
            >
              <h3 className='p-4 font-semibold text-lg text-text-alternative'>Mes Playlists</h3>
              {otherPlaylists.map((playlist) => (
                <Card 
                  key={playlist.id} 
                  className="p-2 relative bg-transparent border-none shadow-none"
                >
                  <Link href={`/playlists/${playlist.slug}`}>
                    <CardContent className="cursor-pointer p-4 border border-border-default rounded-lg hover:shadow-none"> {/* 🔹 Overlay */}
                      <h3 className="font-semibold text-white">{playlist.name}</h3>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <Card 
              className="p-4 text-center bg-cover bg-center bg-no-repeat min-h-full flex items-center justify-center" 
              style={{ backgroundImage: "url('https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/beige1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvYmVpZ2UxLnBuZyIsImlhdCI6MTc0MjE0MDM5MiwiZXhwIjoxNzczNjc2MzkyfQ.VetseXjFXtbalaBqi_imXAi7IpDKzqt1GqsvMU20XKk')" }} // 🔹 Image de fond
            >
              <Button variantType="tertiary" asChild className='bg-transparent gap-2'>
                <Link href="/playlists">
                  <Plus size={24} className="text-white" />
                  <p className="font-semibold text-white">Créer une playlist</p>
                </Link>
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
