'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AddStudentForm } from '@/components/ui/classes/add-student-form';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { toast } from 'sonner';
import { deleteStudent } from '@/app/actions/classes';

const supabase = createClient();
interface Student {
  id: string;
  custom_id: string;
  first_name: string;
  last_name: string;
  class_id: string;
}

interface Class {
  id: string;
  name: string;
  niveau_classe: string;
  annee_promotion: string;
  nom_ecole: string;
  students: Student[];
}

export function ClassDetails({ classItem }: { classItem: Class }) {
  const [students, setStudents] = useState<Student[]>(classItem.students || []);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const router = useRouter();

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('class_id', classItem.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('❌ Error fetching students:', error);
    } else {
      setStudents(data || []);
    }
  };

  /** ✅ Subscribe to real-time updates */
  useEffect(() => {
    fetchStudents(); // Load initial students

    const channel = supabase
      .channel(`students:${classItem.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'students', filter: `class_id=eq.${classItem.id}` },
        (payload) => {
          console.log('🔄 Realtime update received:', payload);

          if (payload.eventType === 'INSERT') {
            setStudents((prev) => [...prev, payload.new as Student]); // ✅ Add new student
          } else if (payload.eventType === 'DELETE') {
            setStudents((prev) => prev.filter((s) => s.id !== payload.old?.id)); // ✅ Remove deleted student
          } else if (payload.eventType === 'UPDATE') {
            setStudents((prev) =>
              prev.map((s) => (s.id === payload.new.id ? (payload.new as Student) : s))
            ); // ✅ Update student
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel); // Cleanup on unmount
    };
  }, [classItem.id]);

    
  
    // ✅ Toggle selection of a student
    const toggleStudentSelection = (studentId: string) => {
      setSelectedStudents((prevSelected) =>
        prevSelected.includes(studentId)
          ? prevSelected.filter((id) => id !== studentId)
          : [...prevSelected, studentId]
      );
    };
  
    // ✅ Select/Deselect All Students
    const toggleSelectAll = () => {
      if (selectedStudents.length === students.length) {
        setSelectedStudents([]); // Deselect all
      } else {
        setSelectedStudents(students.map((s) => s.id)); // Select all
      }
    };
  
    // ✅ Delete Selected Students
    const handleDelete = async () => {
      try {
        await Promise.all(selectedStudents.map((id) => deleteStudent(id)));
        toast.success(`✅ ${selectedStudents.length} étudiant(s) supprimé(s) !`);
        setSelectedStudents([]); // Clear selection after delete
      } catch (error) {
        toast.error("❌ Erreur lors de la suppression.");
        console.error("Erreur:", error);
      }
    };

  return (
    <div className="space-y-6">
      {/* Header de la classe */}
      <div className="flex items-center justify-between">
        <div className='flex flex-row items-center space-x-4'>
          <button 
            onClick={() => router.push('/classes')} 
            className='flex items-center gap-2 text-text-tertiary text-body1 hover:underline'
          >
            <ArrowLeft size={18} />
            Mes classes
          </button>
          <h1 className="text-text-primary text-h2-m font-bold">{classItem.name}</h1>
          <p className="text-body1 text-text-secondary">{classItem.niveau_classe}</p>
        </div>
        <span className="bg-border-default text-text-tertiary px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/icon2.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL2ljb24yLnN2ZyIsImlhdCI6MTc0MjEwMDQwNCwiZXhwIjoxNzczNjM2NDA0fQ.v2nFhvbEuuxJAWlIwwRsxlWHQugxVWjA3Er9tj11jVE" alt="ecole" className='h-5'/>
          {classItem.nom_ecole}
        </span>
      </div>

      {/* Student Table */}
      {students.length > 0 ? (
      <div className='space-y-4'>
        <div className="flex justify-between items-center">
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="Rechercher"
                className="w-full h-12 pl-4 pr-10 border border-gray-300 rounded-md text-text-primary focus:border-primary focus:ring-primary focus:outline-none"
              />
            </div>

            <Button variantType="secondary" className="mt-4" asChild>
              <AddStudentForm classId={classItem.id} />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <div className="">
              {/* 🔹 Action Buttons */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {selectedStudents.length} sélectionné(s)
                </p>
                <div className="flex gap-2">
                  {selectedStudents.length === 1 && (
                    <Button variantType="tertiary" className='font-semibold'>
                      <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/pen_update.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL3Blbl91cGRhdGUuc3ZnIiwiaWF0IjoxNzQyMTAwNTI1LCJleHAiOjE3NzM2MzY1MjV9.rXvgj8kP4RxNHVsE-bil8QmFxQ7SgwG2sphmrdJPhQU" alt="update" />
                      Modifier
                    </Button>
                  )}
                  {selectedStudents.length > 0 && (
                    <Button variantType="tertiary" className='font-semibold' onClick={handleDelete}>
                      <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/trashcan.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL3RyYXNoY2FuLnN2ZyIsImlhdCI6MTc0MjEwMDU0NiwiZXhwIjoxNzczNjM2NTQ2fQ.uNRJSpBrtuP1tpkOI8VfMvBlveHNiNQ5uH4Vm5UNNiE" alt="delete" />
                      Supprimer
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <Table className="border border-border-default rounded-lg overflow-hidden">
              <TableHeader className="bg-button-primary text-text-alternative">
                <TableRow>
                  <TableHead className="px-4 py-3">
                    <Checkbox
                      className="bg-background-primary checked:bg-transparent checked:border-primary"
                      checked={selectedStudents.length === students.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="px-4 py-3 text-left">ID</TableHead>
                  <TableHead className="px-4 py-3 text-left">Nom</TableHead>
                  <TableHead className="px-4 py-3 text-left">Prénom</TableHead>
                  <TableHead className="px-4 py-3 text-left">Classe</TableHead>
                  <TableHead className="px-4 py-3 text-left">Niveau</TableHead>
                  <TableHead className="px-4 py-3 text-left">École</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody className="border border-border-default rounded-lg">
                {students.map((student, index) => (
                  <TableRow
                    key={student.id}
                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-50`}
                  >
                    <TableCell className="px-4 py-3">
                      <Checkbox
                        className="border-border-active"
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={() => toggleStudentSelection(student.id)}
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700">
                      #{student.custom_id}
                    </TableCell>
                    <TableCell className="px-4 py-3 font-semibold uppercase">
                      {student.last_name}
                    </TableCell>
                    <TableCell className="px-4 py-3">{student.first_name}</TableCell>
                    <TableCell className="px-4 py-3 uppercase">{classItem.name}</TableCell>
                    <TableCell className="px-4 py-3">{classItem.niveau_classe}</TableCell>
                    <TableCell className="px-4 py-3">{classItem.nom_ecole}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        // Cas où il n'y a pas d'élèves
        <div className="text-center border rounded-lg p-6 bg-background-surface h-[calc(90vh-10rem)] w-full">
          <div className='flex flex-row justify-between items-center space-x-4'>
            <p className="text-lg text-gray-600">Vous n’avez pas encore créé de profils élèves.</p>
            <Button variantType="secondary" asChild>
              <AddStudentForm classId={classItem.id} />
            </Button>
          </div>
          <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/no-student.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL25vLXN0dWRlbnQuc3ZnIiwiaWF0IjoxNzQyMTAwNDczLCJleHAiOjE3NzM2MzY0NzN9.CxlYoHPEn8KS4BhvWvwDNiOZ8mEnIoTKIXPkbb0UkGc" alt="No students" className="w-62 mx-auto mt-4" />
        </div>
      )}
    </div>
  );
}
