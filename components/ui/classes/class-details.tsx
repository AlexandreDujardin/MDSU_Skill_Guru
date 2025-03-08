'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AddStudentForm } from '@/components/ui/classes/add-student-form';
import { deleteClass } from '@/app/actions/classes';

interface Student {
  id: string;
  first_name: string;
  last_name: string;
}

interface ClassItem {
  id: string;
  name: string;
  niveau_classe: string;
  annee_promotion: string;
  nom_ecole: string;
  students: Student[];
}

export function ClassDetails({ classItem }: { classItem: ClassItem }) {
  const [students, setStudents] = useState(classItem.students);

  const handleDeleteClass = async () => {
    await deleteClass(classItem.id);
    window.location.href = '/classes'; // Rediriger après suppression
  };

  return (
    <div>
      {/* Header de la classe */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{classItem.name}</h1>
          <p className="text-lg text-muted-foreground">{classItem.niveau_classe} • {classItem.annee_promotion}</p>
        </div>
        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
          {classItem.nom_ecole}
        </span>
      </div>

      {/* Affichage des élèves */}
      {students.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold">Élèves ({students.length})</h2>
          <ul className="space-y-2 mt-4">
            {students.map((student) => (
              <li key={student.id} className="flex justify-between items-center p-2 border rounded">
                <span>{student.first_name} {student.last_name}</span>
              </li>
            ))}
          </ul>
          <AddStudentForm classId={classItem.id} />
        </div>
      ) : (
        // Cas où il n'y a pas d'élèves
        <div className="text-center border rounded-lg p-6 bg-gray-100">
          <p className="text-lg text-gray-600">Vous n’avez pas encore créé de profils élèves.</p>
          <img src="/images/classes/no-student.svg" alt="No students" className="w-48 mx-auto mt-4" />
          <AddStudentForm classId={classItem.id} />
        </div>
      )}

      {/* Bouton de suppression de la classe */}
      <Button variant="destructive" className="mt-6" onClick={handleDeleteClass}>
        Supprimer la classe
      </Button>
    </div>
  );
}
