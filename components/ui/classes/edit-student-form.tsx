'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateStudent } from '@/app/actions/classes';

interface EditStudentFormProps {
  studentId: string;
  initialFirstName: string;
  initialLastName: string;
}

export function EditStudentForm({ studentId, initialFirstName, initialLastName }: EditStudentFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button  size="sm">Modifier</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Modifier l'élève</SheetTitle>
        </SheetHeader>
        <form
          action={async (formData) => {
            formData.append('studentId', studentId);
            await updateStudent(formData);
            setOpen(false);
          }}
          className="space-y-4 mt-6"
        >
          <div>
            <Label htmlFor="firstName">Prénom</Label>
            <Input id="firstName" name="firstName" defaultValue={initialFirstName} required />
          </div>
          <div>
            <Label htmlFor="lastName">Nom</Label>
            <Input id="lastName" name="lastName" defaultValue={initialLastName} required />
          </div>
          <Button type="submit" className="w-full">Mettre à jour</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
