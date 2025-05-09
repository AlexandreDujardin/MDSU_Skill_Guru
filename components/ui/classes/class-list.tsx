'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { EditClassForm } from './edit-class-form';
import { deleteClass } from '@/app/actions/classes';
import { AddClassForm } from './add-class-form';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const supabase = createClient();

interface Student {
  id: string;
  custom_id: string;
  first_name: string;
  last_name: string;
  class_id: string;
  class_name?: string; // ✅ Ajouté
  niveau?: string; // ✅ Ajouté
  ecole?: string; // ✅ Ajouté
}

interface Class {
  id: string;
  name: string;
  niveau_classe: string;
  annee_promotion: string;
  nom_ecole: string;
  slug: string;
  students: Student[];
}

export function ClassList() {
  const [classList, setClassList] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [openEditModal, setOpenEditModal] = useState<string | null>(null);
  const router = useRouter();

  // ✅ Fetch classes initially
  const fetchClassesAndStudents = async () => {
    setLoading(true);
  
    // ✅ Récupération de l'utilisateur connecté
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      console.error("❌ Erreur: utilisateur non connecté.");
      setLoading(false);
      return;
    }
  
    // ✅ Filtrer les classes par user_id
    const { data, error } = await supabase
      .from('classes')
      .select('*, students(id, custom_id, first_name, last_name, class_id)')
      .eq("user_id", session.user.id) // ✅ Ajout du filtre
      .order('created_at', { ascending: true });
  
    if (error) {
      console.error('❌ Erreur lors de la récupération des classes:', error);
    } else {
      // ✅ Transformer les données pour inclure les étudiants et attribuer le bon contexte
      const allStudents = data?.flatMap((classItem) => 
        classItem.students.map((student: Student) => ({
          ...student,
          class_name: classItem.name, // ✅ Assignation du nom de la classe
          niveau: classItem.niveau_classe,
          ecole: classItem.nom_ecole,
        }))
      ) || [];
  
      setClassList(
        data?.map((classItem) => ({
          ...classItem,
          students: classItem.students ?? [], // Assurer un tableau vide si aucun étudiant
        })) ?? []
      );
  
      setStudents(allStudents);
    }
  
    setLoading(false);
  };

  // ✅ Subscribe to real-time updates
  useEffect(() => {
    fetchClassesAndStudents(); // Load initial data

    const classChannel = supabase
      .channel('classes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'classes' },
        (payload) => {
          console.log('🔄 Realtime update for classes:', payload);
          fetchClassesAndStudents(); // Refresh on change
        }
      )
      .subscribe();

    const studentChannel = supabase
      .channel('students')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'students' },
        (payload) => {
          console.log('🔄 Realtime update for students:', payload);
          fetchClassesAndStudents(); // Refresh on change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(classChannel);
      supabase.removeChannel(studentChannel);
    };
  }, []);

  // ✅ Handle class deletion & update UI
  const handleDeleteClass = async (classId: string) => {
    try {
      await deleteClass(classId);
      setClassList((prev) => prev.filter((classItem) => classItem.id !== classId)); // Remove deleted class from UI
      toast.success('✅ Classe supprimée avec succès !');
      router.refresh();
    } catch (error) {
      toast.error('❌ Erreur lors de la suppression.');
      console.error('Erreur lors de la suppression:', error);
    }
  };

  return (
    <div className="p-6">
      {/* 🔹 Tabs Navigation */}
      <Tabs defaultValue="classes">
        <TabsList className="flex w-3/4 pb-4 items-center justify-center mx-auto">
          <TabsTrigger value="classes" className="text-lg font-semibold flex-1 flex justify-center items-center gap-2 py-3">
            <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/classes.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL2NsYXNzZXMuc3ZnIiwiaWF0IjoxNzQyMTAwMjYzLCJleHAiOjE3NzM2MzYyNjN9.y9WmDLuuHt3T2_5MKqEVGmlXfM7_5-4nkQnh2YTCbPM" alt="classes" className="h-5"/> 
            Mes classes
          </TabsTrigger>
          
          <TabsTrigger value="students" className="text-lg font-semibold flex-1 flex justify-center items-center gap-2 py-3">
            <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/icon2.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL2ljb24yLnN2ZyIsImlhdCI6MTc0MjEwMDQwNCwiZXhwIjoxNzczNjM2NDA0fQ.v2nFhvbEuuxJAWlIwwRsxlWHQugxVWjA3Er9tj11jVE" alt="students" className="h-5"/>
            Liste de tous mes élèves
          </TabsTrigger>
        </TabsList>

        {/* 🔹 Class List (if tab is "classes") */}
        <TabsContent value="classes" className='bg-background-surface p-6 rounded-lg border border-border-default'>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-text-primary">Mes Classes</h1>
            <AddClassForm />
          </div>

          {loading ? (
            <p className="text-center text-gray-500 mt-6">Chargement...</p>
          ) : classList.length === 0 ? (
            <div className="flex flex-col mt-10 h-[calc(80vh-10rem)] w-full">
              <p className="text-text-tertiary text-lg">Vous n’avez pas encore créé de classe.</p>
              <div className='flex justify-center'>
                <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/no-student.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL25vLXN0dWRlbnQuc3ZnIiwiaWF0IjoxNzQyMTAwNDczLCJleHAiOjE3NzM2MzY0NzN9.CxlYoHPEn8KS4BhvWvwDNiOZ8mEnIoTKIXPkbb0UkGc" alt="No class" className="w-62 mt-4" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {classList.map((classItem) => (
                <Card key={classItem.id} className="relative flex flex-col cursor-pointer hover:shadow-md transition-shadow">
                  <Link href={`/classes/${classItem.slug}`} className="flex-1 p-4">
                    <CardHeader>
                      <CardTitle className="h3-d">{classItem.name}</CardTitle> 
                      <p className="text-sm text-text-primary">{classItem.niveau_classe}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="mt-2 text-sm text-text-primary font-semibold">{classItem.students.length} élèves</p>
                      <span className="bg-button-primary text-text-alternative text-sm rounded-full px-3 py-1 inline-flex items-center gap-2 w-auto">
                        <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/icon.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL2ljb24uc3ZnIiwiaWF0IjoxNzQyMTAwNDU3LCJleHAiOjE3NzM2MzY0NTd9.EdeLVeOo_UMC67Vmc9NFmQfI1fUDU0mAOvyGjiLIhEM" alt="" className='h-4' />
                        {classItem.nom_ecole}
                      </span>
                    </CardContent>
                  </Link>

                  {/* 3-Dots Menu */}
                  <div className="absolute top-3 right-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-md bg-background-primary">
                        <MoreVertical size={20} />
                      </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setOpenEditModal(classItem.id)} className="cursor-pointer">Modifier</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClass(classItem.id)} className="text-text-error cursor-pointer">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Edit Class Modal */}
                  {openEditModal === classItem.id && (
                    <EditClassForm
                      classId={classItem.id}
                      initialName={classItem.name}
                      open={openEditModal === classItem.id}
                      setOpen={setOpenEditModal}
                    />
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* 🔹 Students List (if tab is "students") */}
        <TabsContent value="students">
          <div className="space-y-6">
            {/* 🔹 Table Title */}
            <h1 className="text-2xl font-bold text-text-primary">Tous mes élèves</h1>

            {/* 🔹 Student Table */}
            {students.length > 0 ? (
              <div className="overflow-x-auto">
                <Table className="border border-border-default rounded-lg overflow-hidden">
                  <TableHeader className="bg-button-primary text-text-alternative">
                    <TableRow>
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
                        <TableCell className="px-4 py-3 font-semibold">{student.last_name}</TableCell>
                        <TableCell className="px-4 py-3">{student.first_name}</TableCell>
                        <TableCell className="px-4 py-3">{student.class_name}</TableCell>
                        <TableCell className="px-4 py-3">{student.niveau}</TableCell>
                        <TableCell className="px-4 py-3">{student.ecole}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              // 🛑 No students found
              <div className="text-center border rounded-lg p-6 bg-background-surface h-[calc(90vh-10rem)] w-full">
                <p className="text-lg text-gray-600">Vous n’avez pas encore ajouté d’élèves.</p>
                <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/no-student.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL25vLXN0dWRlbnQuc3ZnIiwiaWF0IjoxNzQyMTAwNDczLCJleHAiOjE3NzM2MzY0NzN9.CxlYoHPEn8KS4BhvWvwDNiOZ8mEnIoTKIXPkbb0UkGc" alt="No students" className="w-62 mx-auto mt-4" />
              </div>
            )}
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
