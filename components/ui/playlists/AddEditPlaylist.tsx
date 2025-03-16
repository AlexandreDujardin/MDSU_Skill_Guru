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
        <Button variantType="secondary">
          <img src="/images/classes/add.svg" alt="Ajouter" className="h-6" />
          Créer une playlist
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className='text-text-primary'>{playlist ? 'Modifier une playlist' : 'Créer une playlist'}</SheetTitle>
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
          <div className='flex justify-end gap-2'>
            <Button variantType="secondary" onClick={() => setOpen(false)}>Annuler</Button>
            <Button variantType="primary">
              {playlist ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
