'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addClass } from '@/app/actions/classes';

// 🔹 Définition des valeurs en dur
const LEVELS = [
  '1ère année',
  '2e année',
  '3e année',
  'Master 1',
  'Master 2',
];

const YEARS = Array.from({ length: 20 }, (_, i) => (2015 + i).toString());

export function AddClassForm() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variantType="secondary" className="flex justify-evenly items-center gap-2">
          <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/add.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL2FkZC5zdmciLCJpYXQiOjE3NDIxMDAxNDgsImV4cCI6MTc3MzYzNjE0OH0.YMS7REaBUvx2dUI-7j2NgN3BoEA_By8bmW_12dS1Dco" alt="ajouter classe" className="h-6" />
          Créer une classe
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className='text-text-primary'>Nouvelle classe</SheetTitle>
        </SheetHeader>
        <form
          action={async (formData) => {
            await addClass(formData);
            setOpen(false);
          }}
          className="space-y-4 mt-6"
        >
          {/* Nom de l'école */}
          <div>
            <Label htmlFor="school_name">Nom de l'école</Label>
            <Input id="nom_ecole" name="nom_ecole" required />
          </div>

          {/* Nom de la classe */}
          <div>
            <Label htmlFor="name">Nom de la classe</Label>
            <Input id="name" name="name" required />
          </div>

          {/* Niveau de la classe */}
          <div>
            <Label htmlFor="niveau_classe">Niveau de la classe</Label>
            <Select name="niveau_classe" required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un niveau" />
              </SelectTrigger>
              <SelectContent>
                {LEVELS.map((level, index) => (
                  <SelectItem key={index} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Année de promotion */}
          <div>
            <Label htmlFor="annee_promotion">Année de promotion</Label>
            <Select name="annee_promotion" required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une année" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((year, index) => (
                  <SelectItem key={index} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <hr />

          <div className='flex justify-end gap-2'>
            <Button variantType="secondary" onClick={() => setOpen(false)}>Annuler</Button>
            <Button variantType="primary">Confirmer</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
