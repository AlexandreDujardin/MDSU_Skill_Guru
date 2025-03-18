"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { BarChart, LineChart, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Bar, Line, Pie, Cell, Legend } from "recharts";
import { Activity, Users, Trophy } from "lucide-react";

// 📌 Données JSON (simule une API)
const data = {
  sessions: 35,
  active_students: 120,
  engagement: "78%",
  best_class: "Classe de 3ème A",
  most_played_game: "Skill Project",
  most_used_scenario: "Lancement d'une application",
  success_rate: "85%",
  top_performing_students: [
    { name: "Paul Barrau", score: "92%" },
    { name: "Lucie Petit", score: "88%" },
    { name: "Diana Som", score: "84%" }
  ],
  sessions_by_month: [
    { month: "Jan", sessions: 10 },
    { month: "Fév", sessions: 15 },
    { month: "Mar", sessions: 20 },
    { month: "Avr", sessions: 18 },
    { month: "Mai", sessions: 25 }
  ],
  engagement_progression: [
    { month: "Jan", engagement: 65 },
    { month: "Fév", engagement: 72 },
    { month: "Mar", engagement: 75 },
    { month: "Avr", engagement: 78 },
    { month: "Mai", engagement: 80 }
  ],
  players_distribution: [
    { level: "Débutant", "count": 60 },
    { level: "Intermédiaire", "count": 40 },
    { level: "Avancé", "count": 20 }
  ]
};

export default function TrackingPage() {
  const [stats, setStats] = useState<any | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setStats(data);
    }, 500);
  }, []);

  if (!stats) {
    return <p className="text-center text-gray-500 mt-10">Chargement des statistiques...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* 🔹 Titre de la page */}
      <h1 className="text-3xl font-bold text-text-primary">Suivi Pédagogique</h1>
      <p className="text-gray-500">Résumé des performances et statistiques des sessions de jeux.</p>

      {/* 🔹 Section Statistiques Clés */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center p-4 bg-background-surface">
          <Activity size={40} className="text-blue-500" />
          <CardContent className="ml-4">
            <CardTitle>{stats.sessions}</CardTitle>
            <p className="text-gray-500">Sessions jouées</p>
          </CardContent>
        </Card>

        <Card className="flex items-center p-4 bg-background-surface">
          <Users size={40} className="text-green-500" />
          <CardContent className="ml-4">
            <CardTitle>{stats.active_students}</CardTitle>
            <p className="text-gray-500">Élèves actifs</p>
          </CardContent>
        </Card>

        <Card className="flex items-center p-4 bg-background-surface">
          <Trophy size={40} className="text-yellow-500" />
          <CardContent className="ml-4">
            <CardTitle>{stats.success_rate}</CardTitle>
            <p className="text-gray-500">Taux de réussite</p>
          </CardContent>
        </Card>
      </div>

      {/* 📊 Graphique : Sessions par Mois */}
      <Card className="p-6 bg-background-surface">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Évolution des sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.sessions_by_month}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sessions" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 📈 Graphique : Progression Engagement */}
      <Card className="p-6 bg-background-surface">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Progression de l'engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.engagement_progression}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="engagement" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 🍩 Graphique : Répartition des joueurs */}
      <Card className="p-6 bg-background-surface">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Répartition des niveaux</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={stats.players_distribution} dataKey="count" nameKey="level" cx="50%" cy="50%" outerRadius={80} fill="#6366F1">
                <Cell fill="#6366F1" />
                <Cell fill="#10B981" />
                <Cell fill="#F59E0B" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 🏆 Top Performers */}
      <Card className="p-6 bg-background-surface space-y-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Top élèves</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="border border-border-default bg-background-primary">
            <TableHeader className="">
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.top_performing_students.map((student: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center gap-2">
                    <Trophy size={20} className="text-yellow-500" /> 
                    {student.name}</TableCell>
                  <TableCell>{student.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
