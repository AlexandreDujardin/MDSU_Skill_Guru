import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ClassList } from '@/components/ui/classes/class-list';

export default async function ClassesPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  const { data: classes } = await supabase
  .from('classes')
  .select(`
    id,
    name,
    niveau_classe,
    annee_promotion,
    nom_ecole,
    students (
      id,
      first_name,
      last_name
    )
  `)
  .order('created_at', { ascending: false });


  return (
    <div>
      <ClassList />
    </div>
  );
}
