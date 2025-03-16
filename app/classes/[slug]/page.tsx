import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { ClassDetails } from '@/components/ui/classes/class-details';
import { PageProps } from "next"; // ✅ Ajout de l'import

export default async function ClassPage({ params }: PageProps<{ slug: string }>) {
  const supabase = createClient();

  // ✅ Fetch class using the slug
  const { data: classItem, error } = await supabase
    .from("classes")
    .select("*, students (*)")
    .eq("slug", params.slug)
    .single();

  if (error || !classItem) {
    console.error("❌ Class not found:", error);
    return notFound();
  }

  return <ClassDetails classItem={classItem} />;
}
