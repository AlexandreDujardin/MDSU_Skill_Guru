'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addClass(formData: FormData) {
  const supabase = createClient();
  const name = formData.get('name') as string;

  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  if (!session?.user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('classes')
    .insert({
      name,
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

export async function addStudent(formData: FormData) {
  const supabase = createClient();
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const classId = formData.get('classId') as string;

  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  if (!session?.user) throw new Error('Not authenticated');

  // Check if the class belongs to the user
  const { data: classData, error: classError } = await supabase
    .from('classes')
    .select('id')
    .eq('id', classId)
    .eq('user_id', session.user.id)
    .single();

  if (classError || !classData) {
    throw new Error('You are not authorized to add students to this class');
  }

  // Insert the student
  const { error } = await supabase
    .from('students')
    .insert({
      first_name: firstName,
      last_name: lastName,
      class_id: classId,
    });

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

