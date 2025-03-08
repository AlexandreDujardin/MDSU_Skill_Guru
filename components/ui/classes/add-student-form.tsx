'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { addStudents } from '@/app/actions/classes';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface AddStudentFormProps {
  classId: string;
}

export function AddStudentForm({ classId }: AddStudentFormProps) {
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState<{ id: string; firstName: string; lastName: string }[]>([]);
  const [nextStudentId, setNextStudentId] = useState(1);

  // Récupérer le nom de la classe et le dernier ID d'élève existant
  useEffect(() => {
    async function fetchClassData() {
      const { data: classData } = await supabase
        .from('classes')
        .select('name')
        .eq('id', classId)
        .single();

      if (classData) {
        setClassName(classData.name);
      }

      const { data: lastStudent } = await supabase
        .from('students')
        .select('custom_id')
        .eq('class_id', classId)
        .order('custom_id', { ascending: false })
        .limit(1)
        .single();

      if (lastStudent) {
        setNextStudentId(parseInt(lastStudent.custom_id) + 1);
      } else {
        setNextStudentId(1);
      }
    }

    if (open) {
      fetchClassData();
    }
  }, [open, classId]);

  // Ajouter un élève avec ID automatique
  const handleAddStudentField = () => {
    setStudents([...students, { id: nextStudentId.toString().padStart(5, '0'), firstName: '', lastName: '' }]);
    setNextStudentId((prev) => prev + 1);
  };

  const handleRemoveStudentField = (index: number) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, field: 'firstName' | 'lastName', value: string) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Ajouter des élèves</Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto max-h-screen">
        <SheetHeader>
          <SheetTitle className="text-text-primary">Créer des profils élèves</SheetTitle>
        </SheetHeader>
        <hr />

        {/* Tabs pour choisir entre "Ajouter manuellement" et "Charger une liste" */}
        <Tabs defaultValue="manual" className="mt-4">
          <TabsList className="flex border-b">
            <TabsTrigger 
              value="manual" 
              className="w-1/2 text-center gap-2">
                <img src="/images/classes/pen.svg" alt="ajouter" />
                Ajouter manuellement
              </TabsTrigger>
            <TabsTrigger 
              value="upload"  
              className="w-1/2 text-center gap-2">
                <img src="/images/classes/add.svg" alt="charger" />
                Charger une liste
              </TabsTrigger>
          </TabsList>

          {/* Onglet : Ajouter manuellement */}
          <TabsContent value="manual" className="mt-4">
            <form
              action={async (formData) => {
                formData.append('classId', classId);
                formData.append('students', JSON.stringify(students));
                await addStudents(formData);
                setOpen(false);
              }}
              className="space-y-4 mt-6"
            >
              {/* Affichage du nom de la classe */}
              <div>
                <Label>Rattacher à la classe</Label>
                <Input value={className} disabled />
              </div>

              {students.map((student, index) => (
                <div key={index} className="space-y-2 border p-3 rounded-lg">
                  <div>
                    <Label>#ID de l'élève</Label>
                    <Input value={student.id} disabled />
                  </div>
                  <div>
                    <Label htmlFor={`firstName-${index}`}>Prénom</Label>
                    <Input
                      id={`firstName-${index}`}
                      name={`firstName-${index}`}
                      value={student.firstName}
                      onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`lastName-${index}`}>Nom</Label>
                    <Input
                      id={`lastName-${index}`}
                      name={`lastName-${index}`}
                      value={student.lastName}
                      onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                      required
                    />
                  </div>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveStudentField(index)}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
              ))}

              <Button type="button" variant="secondary" onClick={handleAddStudentField}>
                + Ajouter un autre élève
              </Button>
              <Button type="submit" className="w-full">Valider</Button>
            </form>
          </TabsContent>

          {/* Onglet : Charger une liste (Juste du front, sans logique pour l'import) */}
          <TabsContent value="upload" className="mt-4">
            <div className="p-4 border rounded-lg bg-gray-100 text-center">
              <p className="text-lg text-gray-600">🚀 Fonctionnalité à venir !</p>
              <p className="text-sm text-muted-foreground">Bientôt, vous pourrez importer une liste d'élèves.</p>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
