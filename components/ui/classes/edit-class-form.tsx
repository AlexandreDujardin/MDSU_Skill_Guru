'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateClass } from '@/app/actions/classes';

interface EditClassFormProps {
  classId: string;
  initialName: string;
}

export function EditClassForm({ classId, initialName }: EditClassFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Modifier</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Modifier la classe</SheetTitle>
        </SheetHeader>
        <form
          action={async (formData) => {
            formData.append('classId', classId);
            await updateClass(formData);
            setOpen(false);
          }}
          className="space-y-4 mt-6"
        >
          <div>
            <Label htmlFor="name">Nom de la classe</Label>
            <Input id="name" name="name" defaultValue={initialName} required />
          </div>
          <Button type="submit" className="w-full">Mettre à jour</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
