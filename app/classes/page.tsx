import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { PageLayout } from "@/components/PageLayout";
import { ClassList } from '@/components/ui/classes/class-list';
import { AddClassForm } from '@/components/ui/classes/add-class-form';

export default async function ClassesPage() {
  const supabase = createClient();
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
      <ClassList classes={classes || []} />
    </div>
  );
}
