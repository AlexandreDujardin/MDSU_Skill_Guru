'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  students: Student[];
}

interface ClassListProps {
  classes: Class[];
}

export function ClassList({ classes }: ClassListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {classes.map((classItem) => (
        <Card key={classItem.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-bold">{classItem.name}</CardTitle>
              <EditClassForm classId={classItem.id} initialName={classItem.name} />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={() => deleteClass(classItem.id)}
            >
              Supprimer
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Élèves ({classItem.students.length})</h3>
                <AddStudentForm classId={classItem.id} />
              </div>
              <div className="space-y-2">
                {classItem.students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <span>
                      {student.first_name} {student.last_name}
                    </span>
                    <div className="flex gap-2">
                      <EditStudentForm
                        studentId={student.id}
                        initialFirstName={student.first_name}
                        initialLastName={student.last_name}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
