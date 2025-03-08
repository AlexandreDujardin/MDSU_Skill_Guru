'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addClass(formData: FormData) {
  const supabase = createClient();
  const name = formData.get('name') as string;
  const nom_ecole = formData.get('nom_ecole') as string;
  const niveau_classe = formData.get('niveau_classe') as string;
  const annee_promotion = formData.get('annee_promotion') as string;

  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  if (!session?.user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('classes')
    .insert({
      name,
      nom_ecole,
      niveau_classe,
      annee_promotion,
      user_id: session.user.id, // Include the authenticated user's ID
    });

  if (error) throw error;

  revalidatePath('/classes');
}

export async function deleteClass(classId: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from('classes')
    .delete()
    .eq('id', classId)

  if (error) throw error

  revalidatePath('/classes')
}

export async function addStudents(formData: FormData) {
  const supabase = createClient();
  const classId = formData.get('classId') as string;
  const students = JSON.parse(formData.get('students') as string); // Parse the array of students

  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  if (!session?.user) throw new Error('Not authenticated');

  // Verify the class belongs to the user
  const { data: classData, error: classError } = await supabase
    .from('classes')
    .select('id')
    .eq('id', classId)
    .eq('user_id', session.user.id)
    .single();

  if (classError || !classData) {
    throw new Error('Vous n’êtes pas autorisé à ajouter des élèves à cette classe.');
  }

  // Insert multiple students at once
  const { error } = await supabase
    .from('students')
    .insert(students.map((student: any) => ({
      first_name: student.firstName,
      last_name: student.lastName,
      class_id: classId,
    })));

  if (error) throw error;

  revalidatePath('/classes');
}


export async function deleteStudent(studentId: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', studentId)

  if (error) throw error

  revalidatePath('/classes')
}

export async function updateClass(formData: FormData) {
  const supabase = createClient();
  const classId = formData.get('classId') as string;
  const name = formData.get('name') as string;

  const { error } = await supabase
    .from('classes')
    .update({ name })
    .eq('id', classId);

  if (error) throw error;

  revalidatePath('/classes');
}

export async function updateStudent(formData: FormData) {
  const supabase = createClient();
  const studentId = formData.get('studentId') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;

  const { error } = await supabase
    .from('students')
    .update({ first_name: firstName, last_name: lastName })
    .eq('id', studentId);

  if (error) throw error;

  revalidatePath('/classes');
}

