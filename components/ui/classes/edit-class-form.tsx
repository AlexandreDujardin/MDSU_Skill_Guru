'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { updateClass } from '@/app/actions/classes';
import { toast } from 'sonner';

interface EditClassFormProps {
  classId: string;
  initialName: string;
  open: boolean;
  setOpen: (id: string | null) => void;
}

export function EditClassForm({ classId, initialName, open, setOpen }: EditClassFormProps) {
  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) setOpen(null);
      }}
    >
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Modifier la classe</SheetTitle>
        </SheetHeader>
        <form
          action={async (formData) => {
            formData.append('classId', classId);
            await updateClass(formData);
            setOpen(null); // Ensure state resets
            toast.success("Classe mise à jour !");
          }}
          className="space-y-4 mt-6"
        >
          <div>
            <Label htmlFor="name">Nom de la classe</Label>
            <Input id="name" name="name" defaultValue={initialName} required />
          </div>
          <div className='flex justify-end gap-2'>
            <Button variantType="secondary" onClick={() => setOpen(null)}>Annuler</Button>
            <Button variantType="primary">Mettre à jour</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
