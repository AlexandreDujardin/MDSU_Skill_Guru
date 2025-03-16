'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function KeyMetrics() {
  // Liste des métriques affichées
  const metrics = [
    { title: "Nombre total de sessions de jeux" },
    { title: "Étudiants actifs" },
    { title: "Engagement moyen" },
  ];

  return (
    <div className="bg-background-surface p-6 rounded-lg border border-border-default">
      {/* Titre et bouton */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-text-primary">Activité et chiffres clés</h2>
        <Button variantType="secondary" asChild>
          <Link href="/suivi">
            Suivi pédagogique
            <ChevronRight size={16} />
          </Link>
        </Button>
      </div>

      {/* Sous-titre */}
      <p className="text-text-tertiary mb-6">
        Pour plus de chiffres clés, rendez-vous dans le Suivi Pédagogique.
      </p>

      {/* Cartes des métriques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-4">
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-lg text-text-primary">Pas de données à afficher</p>
              <p className="text-sm text-green-600 flex items-center gap-2 mt-2">
                ✖ Pas de données à afficher
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
