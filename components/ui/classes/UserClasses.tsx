'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Users } from 'lucide-react';

const supabase = createClient();

export function UserClasses() {
  const [classes, setClasses] = useState<{ 
    id: string; 
    name: string; 
    niveau_classe: string; 
    slug: string; 
    nom_ecole: string; 
    student_count: number; // ✅ Ajout du nombre d'élèves
  }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClasses() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('classes')
        .select('id, name, niveau_classe, slug, nom_ecole, students(count)') // ✅ Récupère le nombre d'élèves
        .eq('user_id', session.user.id) // 🔹 Filtrer par user_id
        .order('created_at', { ascending: true });

      if (error) console.error('❌ Erreur de chargement des classes:', error);
      else {
        // ✅ Transformer les données pour inclure le nombre d’élèves
        const formattedData = data.map((classItem) => ({
          ...classItem,
          student_count: classItem.students[0]?.count || 0, // 🔥 Récupération du count
        }));

        setClasses(formattedData);
      }
      setLoading(false);
    }

    fetchClasses();
  }, []);

  return (
    <div className="bg-background-surface p-6 rounded-lg border border-border-default">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-text-primary">Mes dernières classes en activité</h2>
        <Button variantType="secondary" asChild>
          <Link href="/classes">
            Voir toutes les classes
            <ChevronRight size={16} />
          </Link>
        </Button>
      </div>

      {/* ✅ Affichage des classes avec design amélioré */}
      {loading ? (
        <p>Chargement...</p>
      ) : classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((classItem) => (
            <Card key={classItem.id} className="relative flex flex-col cursor-pointer hover:shadow-md transition-shadow">
              <Link href={`/classes/${classItem.slug}`} className="flex-1 p-4">
                <CardHeader >
                  <CardTitle className="text-lg font-semibold">{classItem.name}</CardTitle>
                  <p className="text-sm text-text-primary">{classItem.niveau_classe}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col justify-center items-start gap-2 mt-2">
                    <span className="flex items-center gap-2 text-sm text-gray-700">
                      <Users size={16} className="text-gray-500" />
                      {classItem.student_count} {classItem.student_count > 1 ? 'élèves' : 'élève'}
                    </span>
                    <span className="bg-button-primary text-text-alternative text-sm rounded-full px-3 py-1 inline-flex items-center gap-2">
                      <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/icon.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL2ljb24uc3ZnIiwiaWF0IjoxNzQyMTAwNDU3LCJleHAiOjE3NzM2MzY0NTd9.EdeLVeOo_UMC67Vmc9NFmQfI1fUDU0mAOvyGjiLIhEM" alt="" className="h-4" />
                      {classItem.nom_ecole}
                    </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex-col items-center text-center rounded-lg p-6 bg-background-surface w-full min-h-[300px] flex justify-center">
          <p className="text-lg text-text-tertiary">Vous n’avez pas encore créé de classe.</p>
          <Button variantType="tertiary" className="mt-4 max-w-fit" asChild>
            <Link href="/classes">
              <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/add.svg" alt="Créer" />
              Créer une classe
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
