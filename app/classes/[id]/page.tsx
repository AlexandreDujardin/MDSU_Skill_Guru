import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { ClassDetails } from '@/components/ui/classes/class-details';

export default async function ClassPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  
  // Récupérer la classe
  const { data: classItem } = await supabase
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
    .eq('id', params.id)
    .single();

  if (!classItem) {
    notFound();
  }

  return <ClassDetails classItem={classItem} />;
}
