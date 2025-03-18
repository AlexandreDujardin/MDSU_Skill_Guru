"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { AddEditPlaylist } from "@/components/ui/playlists/AddEditPlaylist";
import { deletePlaylist } from "@/app/actions/playlists";

// 🎨 Liste des images disponibles pour le background
const playlistBackgrounds = [
  "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/beige1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvYmVpZ2UxLnBuZyIsImlhdCI6MTc0MjI1NjU1OCwiZXhwIjoxNzczNzkyNTU4fQ.OGwNjqAG2n222IepADvwA-8U3X6s-KBHeiDIhTUzO6w",
  "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/beige2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvYmVpZ2UyLnBuZyIsImlhdCI6MTc0MjI1NjU2OSwiZXhwIjoxNzczNzkyNTY5fQ.K5BFN92-h4vPE2s4-rs87HdPfWIjG72-27swmYRfpHo",
  "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/beige3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvYmVpZ2UzLnBuZyIsImlhdCI6MTc0MjI1NjU3OSwiZXhwIjoxNzczNzkyNTc5fQ.L3bFELRalY0dQgAyRTR4i-U-sd26awNem_kfSyopYiM",
  "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/bleu1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvYmxldTEucG5nIiwiaWF0IjoxNzQyMjU2NTg4LCJleHAiOjE3NzM3OTI1ODh9.cKUWUyQ1fTKJNPpgBQsNvFVExlEISino8U4cFTzbUbY",
  "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/bleu2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvYmxldTIucG5nIiwiaWF0IjoxNzQyMjU2NjA0LCJleHAiOjE3NzM3OTI2MDR9.SEJx6FfHT6CkkaxNSGn8PO68GQc4KpitTHxyQo_IAFg",
  "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/bleu3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvYmxldTMucG5nIiwiaWF0IjoxNzQyMjU2NjE2LCJleHAiOjE3NzM3OTI2MTZ9.OdyyiC0Mu4jR_odkki-zqUt09pCKprOFxEHsx-7GFBc",
  "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/rouge1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvcm91Z2UxLnBuZyIsImlhdCI6MTc0MjI1NjYzMiwiZXhwIjoxNzczNzkyNjMyfQ.aIh6PdnO-Yys-dNp8GgCoirEeAnWBrM-P5dD27rtK6o",
  "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/rouge2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvcm91Z2UyLnBuZyIsImlhdCI6MTc0MjI1NjY0NCwiZXhwIjoxNzczNzkyNjQ0fQ.8jLsHbbE0Trm_NZWAOMr9sh2b1UcgwUFCKhGoWSmSjw",
  "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/rouge3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvcm91Z2UzLnBuZyIsImlhdCI6MTc0MjI1NjY1NSwiZXhwIjoxNzczNzkyNjU1fQ.BzNAoy7pnDB2ObUtohHz22WRmSk4O4kjyDH_5Z907e4",
  "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/violet1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvdmlvbGV0MS5wbmciLCJpYXQiOjE3NDIyNTY2NjgsImV4cCI6MTc3Mzc5MjY2OH0.IwalNELgad97ZWhlZ5Bwrx8rQF3hh8jtI59cN7dbKk0",
  "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/violet2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvdmlvbGV0Mi5wbmciLCJpYXQiOjE3NDIyNTY2NzksImV4cCI6MTc3Mzc5MjY3OX0.73RUpbcGJZIONpJNJG5pMO54Auo5tPqbjc-BdmgthZg",
  "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/gamesthumbnails/violet3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RodW1ibmFpbHMvdmlvbGV0My5wbmciLCJpYXQiOjE3NDIyNTY2ODUsImV4cCI6MTc3Mzc5MjY4NX0.eKiNKy70l8P1ybPxKDD1bjj3YwBJa3BShlN1EmZglb4"
];

export function PlaylistList({ playlists }: { playlists: any[] }) {
  const [openEditPlaylist, setOpenEditPlaylist] = useState<string | null>(null);

  return (
    <div className='bg-background-surface p-6 rounded-lg border border-border-default space-y-6 m-6'>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">Mes Playlists</h1>
        <AddEditPlaylist />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {playlists.length > 0 ? (
          playlists.map((playlist, index) => {
            const bgImage = playlistBackgrounds[index % playlistBackgrounds.length]; // Attribution en boucle
            return (
              <Card 
                key={playlist.id} 
                className="relative flex flex-col cursor-pointer hover:shadow-md transition-shadow bg-cover bg-center bg-no-repeat text-white"
                style={{ backgroundImage: `url(${bgImage})` }} // Appliquer le fond
              >
                {/* ✅ Clique pour voir les jeux de la playlist */}
                <Link href={`/playlists/${playlist.slug}`} passHref>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{playlist.name}</CardTitle>
                  </CardHeader>
                </Link>

                {/* ✅ Menu "Modifier / Supprimer" */}
                {!playlist.is_favorite && (
                  <div className="absolute top-3 right-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded-md bg-button-primary">
                          <MoreVertical size={20} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-background-primary" align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => setOpenEditPlaylist(playlist.id)}>
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-text-error cursor-pointer" onClick={async () => await deletePlaylist(playlist.id)}>
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                {/* ✅ Sheet Modifier Playlist */}
                {openEditPlaylist === playlist.id && <AddEditPlaylist playlist={playlist} />}
              </Card>
            );
          })
        ) : (
          <div className="text-center border rounded-lg p-6 bg-background-surface h-[calc(90vh-10rem)] w-full">
            <p className="text-lg text-text-tertiary">Aucune playlist disponible.</p>
            <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/playlists/add_game.svg" alt="No playlist" className="w-62 mx-auto mt-4" />
          </div>
        )}
      </div>
    </div>
  );
}
