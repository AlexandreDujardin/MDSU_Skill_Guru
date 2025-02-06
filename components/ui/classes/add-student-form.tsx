'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addStudents } from '@/app/actions/classes';

interface AddStudentFormProps {
  classId: string;
}

export function AddStudentForm({ classId }: AddStudentFormProps) {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([{ firstName: '', lastName: '' }]);

  const handleAddStudentField = () => {
    setStudents([...students, { firstName: '', lastName: '' }]);
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
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Ajouter des élèves</SheetTitle>
        </SheetHeader>
        <form
          action={async (formData) => {
            formData.append('classId', classId);
            formData.append('students', JSON.stringify(students)); // Send array of students
            await addStudents(formData);
            setOpen(false);
          }}
          className="space-y-4 mt-6"
        >
          {students.map((student, index) => (
            <div key={index} className="space-y-2 border p-3 rounded-lg">
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
          <Button type="submit" className="w-full">Ajouter</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
