"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { AddEditPlaylist } from "@/components/ui/playlists/AddEditPlaylist";
import { deletePlaylist } from "@/app/actions/playlists";

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
          playlists.map((playlist) => (
            <Card key={playlist.id} className="relative flex flex-col cursor-pointer hover:shadow-md transition-shadow">
              {/* ✅ Clique pour voir les jeux de la playlist */}
              <Link key={playlist.id} href={`/playlists/${playlist.slug}`} passHref>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-text-primary">{playlist.name}</CardTitle>
                </CardHeader>
              </Link>

              {/* ✅ Menu "Modifier / Supprimer" */}
              {!playlist.is_favorite && (
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-md bg-background-primary">
                        <MoreVertical size={20} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background-primary" align="end">
                      {/* Modifier Playlist */}
                      <DropdownMenuItem onClick={() => setOpenEditPlaylist(playlist.id)}>Modifier</DropdownMenuItem>

                      {/* Supprimer Playlist */}
                      <DropdownMenuItem className="text-text-error" onClick={async () => await deletePlaylist(playlist.id)}>
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {/* ✅ Sheet Modifier Playlist */}
              {openEditPlaylist === playlist.id && <AddEditPlaylist playlist={playlist} />}
            </Card>
          ))
        ) : (
          <div className="text-center border rounded-lg p-6 bg-background-surface h-[calc(90vh-10rem)] w-full">
            <p className="text-lg text-text-tertiary">Aucune playlist disponible.</p>
            <img src="/images/playlists/add_game.svg" alt="No playlist" className="w-62 mx-auto mt-4" />
          </div>
        )}
      </div>
    </div>
  );
}
