'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createOrUpdatePlaylist } from '@/app/actions/playlists';

interface AddEditPlaylistProps {
  playlist?: { id: string; name: string };
}

export function AddEditPlaylist({ playlist }: AddEditPlaylistProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(playlist?.name || '');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={playlist ? 'outline' : 'default'}>
          {playlist ? 'Modifier' : 'Ajouter une playlist'}
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{playlist ? 'Modifier Playlist' : 'Nouvelle Playlist'}</SheetTitle>
        </SheetHeader>
        <form
          action={async (formData) => {
            if (playlist) formData.append('playlistId', playlist.id);
            formData.append('name', name);
            await createOrUpdatePlaylist(formData);
            setOpen(false);
          }}
          className="space-y-4 mt-6"
        >
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full">
            {playlist ? 'Mettre à jour' : 'Créer'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
