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

  // Fetch class details & latest student ID when modal is opened
  useEffect(() => {
    async function fetchClassData() {
      if (!classId) return;

      try {
        // Fetch class details
        const { data: classData } = await supabase
          .from('classes')
          .select('name')
          .eq('id', classId)
          .maybeSingle();

        setClassName(classData?.name || "Classe inconnue");

        // Fetch last student ID
        const { data: lastStudent } = await supabase
          .from('students')
          .select('custom_id')
          .eq('class_id', classId)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        setNextStudentId(lastStudent?.custom_id ? parseInt(lastStudent.custom_id) + 1 : 1);
      } catch {
        setNextStudentId(1);
      }
    }

    if (open) {
      fetchClassData();
    }
  }, [open, classId]);

  // Add a new student with auto-generated ID
  const handleAddStudentField = () => {
    setStudents([...students, { id: nextStudentId.toString().padStart(5, '0'), firstName: '', lastName: '' }]);
    setNextStudentId(prev => prev + 1);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variantType="secondary" size="lg">
          <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/add.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL2FkZC5zdmciLCJpYXQiOjE3NDIxMDAxNDgsImV4cCI6MTc3MzYzNjE0OH0.YMS7REaBUvx2dUI-7j2NgN3BoEA_By8bmW_12dS1Dco" alt="ajouter" />
          Créer des profils élèves
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto max-h-screen">
        <SheetHeader>
          <SheetTitle className="text-text-primary">Créer des profils élèves</SheetTitle>
        </SheetHeader>
        <hr />

        <Tabs defaultValue="manual" className="mt-4">
          <TabsList className="flex border-b">
            <TabsTrigger value="manual" className="w-1/2 text-center gap-2">
              <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/pen.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL3Blbi5zdmciLCJpYXQiOjE3NDIxMDA1MTAsImV4cCI6MTc3MzYzNjUxMH0.9L1EnF2upxTu-HQggEZ9VgP3Dqf_bzaMr5is1g725iI" alt="ajouter" />
              Ajouter manuellement
            </TabsTrigger>
            <TabsTrigger value="upload" className="w-1/2 text-center gap-2">
              <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/add.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL2FkZC5zdmciLCJpYXQiOjE3NDIxMDAxNDgsImV4cCI6MTc3MzYzNjE0OH0.YMS7REaBUvx2dUI-7j2NgN3BoEA_By8bmW_12dS1Dco" alt="charger" />
              Charger une liste
            </TabsTrigger>
          </TabsList>

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
              {/* Display Class Name */}
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
                      value={student.firstName}
                      onChange={(e) => {
                        const updatedStudents = [...students];
                        updatedStudents[index].firstName = e.target.value;
                        setStudents(updatedStudents);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`lastName-${index}`}>Nom</Label>
                    <Input
                      id={`lastName-${index}`}
                      value={student.lastName}
                      onChange={(e) => {
                        const updatedStudents = [...students];
                        updatedStudents[index].lastName = e.target.value;
                        setStudents(updatedStudents);
                      }}
                      required
                    />
                  </div>
                </div>
              ))}

              <div className='flex justify-end gap-2'>
                <Button variantType="secondary" onClick={handleAddStudentField}>
                  <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/add.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL2FkZC5zdmciLCJpYXQiOjE3NDIxMDAxNDgsImV4cCI6MTc3MzYzNjE0OH0.YMS7REaBUvx2dUI-7j2NgN3BoEA_By8bmW_12dS1Dco" alt="ajouter" />
                  Ajouter un autre élève
                </Button>
                <Button variantType="primary">Valider</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
