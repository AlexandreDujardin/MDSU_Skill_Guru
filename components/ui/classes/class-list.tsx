'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AddStudentForm } from './add-student-form';
import { EditClassForm } from './edit-class-form';
import { EditStudentForm } from './edit-student-form';
import { deleteClass, deleteStudent } from '@/app/actions/classes';

interface Student {
  id: string;
  first_name: string;
  last_name: string;
}

interface Class {
  id: string;
  name: string;
  niveau_classe: string;
  annee_promotion: string;
  nom_ecole: string;
  students: Student[];
}

export function ClassList({ classes }: { classes: Class[] }) {
  return (
    <div className="flex flex-col space-y-4">
      {classes.map((classItem) => (
        <Link href={`/classes/${classItem.id}`} key={classItem.id} passHref>
          <Card className="flex flex-row space-y-4 cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col space-y-2 pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="h3-d">{classItem.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{classItem.niveau_classe} • {classItem.annee_promotion}</p>
                </div>
                <EditClassForm classId={classItem.id} initialName={classItem.name} />
              </div>
              <div className="flex justify-between items-center">
                <span className="bg-button-primary text-text-alternative text-sm rounded-xl px-4 py-1 min-w-fit justify-center items-center flex gap-2">
                  <img src="/images/classes/icon.svg" alt="ecole" className="h-4"/>
                  {classItem.nom_ecole}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex-row justify-between items-center">
                  <h3 className="font-semibold">{classItem.students.length} élèves</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
