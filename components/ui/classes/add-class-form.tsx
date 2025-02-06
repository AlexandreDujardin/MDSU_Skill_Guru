'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addClass } from '@/app/actions/classes';

export function AddClassForm() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Ajouter une classe</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Nouvelle classe</SheetTitle>
        </SheetHeader>
        <form
          action={async (formData) => {
            await addClass(formData);
            setOpen(false);
          }}
          className="space-y-4 mt-6"
        >
          <div>
            <Label htmlFor="name">Nom de la classe</Label>
            <Input id="name" name="name" required />
          </div>
          <Button type="submit" className="w-full">Ajouter</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
