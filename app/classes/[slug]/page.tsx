import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { ClassDetails } from '@/components/ui/classes/class-details';

interface ClassPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ClassPage({ params }: ClassPageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();

  // ✅ Fetch class using the slug
  const { data: classItem, error } = await supabase
    .from("classes")
    .select("*, students (*)")
    .eq("slug", resolvedParams.slug)
    .single();

  if (error || !classItem) {
    console.error("❌ Class not found:", error);
    return notFound();
  }

  return <ClassDetails classItem={classItem} />;
}
