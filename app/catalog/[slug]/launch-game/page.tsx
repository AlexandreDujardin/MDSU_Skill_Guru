"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft } from "lucide-react";
import { QRCodeModal } from "@/components/ui/games/GameQRCode";

const supabase = createClient();

const sessionUrl = "https://www.figma.com/proto/grbDi5SAuHoVkyBavRmO9D/Workspace---Maquettes-principales?node-id=446-2911&t=5F9ydD2RgwWtH3pq-1&scaling=scale-down&content-scaling=fixed&page-id=368%3A7725&starting-point-node-id=368%3A7727&show-proto-sidebar=1";

const roles = [
  "Responsable technique",
  "Chargé de communication",
  "Analyste des risques",
  "Responsable ressources",
];

export default function GameLaunchPage() {
  const router = useRouter();
  const { gameSlug, classId, scenarioId } = useGameStore();

  interface Student {
    id: number;
    first_name: string;
    last_name: string;
  }

  interface TeamMember extends Student {
    role: string;
  }

  const [students, setStudents] = useState<Student[]>([]);
  const [teams, setTeams] = useState<TeamMember[][]>([]);
  const [className, setClassName] = useState<string | null>(null);
  const [gameName, setGameName] = useState<string | null>(null);
  const [scenario, setScenario] = useState<any | null>(null);

  useEffect(() => {
    if (!gameSlug || !classId || !scenarioId) {
      router.push("/"); // Redirection si les données sont absentes
      return;
    }

    async function fetchData() {
      // 🔹 Récupérer la classe et ses élèves
      const { data: classData, error } = await supabase
        .from("classes")
        .select("id, name, students(*)")
        .eq("id", classId)
        .single();

      if (classData) {
        setClassName(classData.name);
        setStudents(classData.students || []);
      }

      const { data: gameData, error: gameError } = await supabase
        .from("games")
        .select("title")
        .eq("slug", gameSlug)
        .maybeSingle(); // ✅ Utiliser maybeSingle() pour éviter l'erreur si aucune donnée

      console.log("🎮 Résultat de la requête jeu:", gameData);

      if (gameData && gameData.title) {
        setGameName(gameData.title);
      } else {
        console.warn("⚠️ Aucun jeu trouvé avec ce slug:", gameSlug);
      }


      if (error) console.error("❌ Erreur lors de la récupération des élèves:", error);
      if (gameError) console.error("❌ Erreur lors de la récupération du jeu:", gameError);
    }

    fetchData();
  }, [classId, gameSlug]);

  // 🔹 Définition des scénarios en dur
  const scenarios = [
    {
      id: "1",
      title: "Lancement d’une application",
      livrables: "Cahier des charges, Prototype, Campagne marketing.",
      objectifs: "Respecter le budget, respecter les délais, assurer une qualité optimale.",
      niveaux: ["Débutant"],
    },
    {
      id: "2",
      title: "Organisation d’un événement international",
      livrables: "Plan de communication, Logistique détaillée, Bilan post-événement.",
      objectifs: "Attirer un nombre cible de participants, maîtriser les coûts, assurer une couverture médiatique.",
      niveaux: ["Débutant", "Intermédiaire", "Avancé"],
    },
    {
      id: "3",
      title: "Développement d’un produit innovant",
      livrables: "Étude de marché, Prototype, Plan de lancement commercial.",
      objectifs: "Valider l’intérêt du marché, assurer la faisabilité technique, respecter le time-to-market.",
      niveaux: ["Débutant", "Intermédiaire"],
    },
  ];

  useEffect(() => {
    const selectedScenario = scenarios.find((s) => s.id === scenarioId);
    setScenario(selectedScenario);
  }, [scenarioId]);

  useEffect(() => {
    if (students.length > 0) {
      const shuffled = [...students].sort(() => Math.random() - 0.5);
      const teamCount = 3;
      const teamsArr: TeamMember[][] = Array.from({ length: teamCount }, () => []);

      // Répartition des chefs de projet (1 par équipe)
      for (let i = 0; i < teamCount; i++) {
        if (shuffled.length > 0) {
          const leader = shuffled.pop();
          if (leader) {
            teamsArr[i].push({ ...leader, role: "Chef de projet" });
          }
        }
      }

      // Répartition des autres rôles
      let roleIndex = 0;
      while (shuffled.length > 0) {
        for (let i = 0; i < teamCount; i++) {
          if (shuffled.length === 0) break;
          const student = shuffled.pop();
          if (student && student.id !== undefined && student.first_name !== undefined && student.last_name !== undefined) {
            teamsArr[i].push({ ...student, role: roles[roleIndex] });
          }
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      setTeams(teamsArr);
    }
  }, [students]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href={`/catalog/${gameSlug}`} className="flex items-center gap-2 text-text-tertiary text-body1 hover:underline">
            <ArrowLeft size={18} />
            Retour au jeu
          </Link>
          <h1 className="text-text-primary text-h2-m font-bold">{gameName ? gameName : gameSlug}</h1>
        </div>
        <QRCodeModal sessionUrl={sessionUrl} scenarioTitle={scenario?.title || "Inconnu"} />
      </div>

      {/* 🔹 Onglets pour gérer les équipes & scénario */}
      <Tabs defaultValue="teams">
        <TabsList className="flex w-3/4 pb-4 items-center justify-center mx-auto">
          <TabsTrigger value="teams" className="text-lg font-semibold flex-1 flex justify-center items-center gap-2 py-3">Les équipes</TabsTrigger>
          <TabsTrigger value="progress" className="text-lg font-semibold flex-1 flex justify-center items-center gap-2 py-3">Avancée des équipes</TabsTrigger>
          <TabsTrigger value="events" className="text-lg font-semibold flex-1 flex justify-center items-center gap-2 py-3">Événements</TabsTrigger>
        </TabsList>

        {/* 🔹 Onglet Équipes */}
        <TabsContent value="teams">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ✅ Colonne 1 - Répartition des équipes */}
            <Card className="p-6 bg-background-surface">
              <div className="flex justify-start items-center mb-6 gap-2">
                <h2 className="text-xl font-bold">Les équipes</h2>
                <Badge className="bg-button-primary text-text-alternative"> 3 équipes </Badge>
              </div>
              <div className="space-y-6">
                {teams.map((team, index) => (
                  <div key={index} className="p-4 text-white rounded-lg">
                  <div className="flex justify-between items-center bg-button-primary p-4 rounded-t-lg gap-3">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-semibold">Équipe {index + 1}</h3>
                      <Badge className="bg-border-default text-text-primary">{team.length} membres</Badge>
                    </div>
                    <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/classes/pen-white.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbGFzc2VzL3Blbi13aGl0ZS5zdmciLCJpYXQiOjE3NDIyNDk4NDEsImV4cCI6MTc3Mzc4NTg0MX0.3BcIFEsGNhFkX-D4rk9UegNEoTK6GpK2-zrzc6aoVg4" alt="Modifier" />
                  </div>
                  <div className="border border-border-default rounded-b-xl overflow-hidden">
                    <table className="w-full border-collapse">
                      <tbody>
                        {team.map((student, studentIndex) => (
                          <tr
                            key={student.id}
                            className={`${
                              studentIndex % 2 === 0
                                  ? "bg-white"
                                  : "bg-gray-100"
                            } hover:bg-gray-50`}
                          >
                            <td className="p-3 text-text-primary"><strong className="text-text-tertiary">Rôle :</strong> {student.role}</td>
                            <td className="p-3 text-text-primary">
                            <strong className="text-text-tertiary">Nom prénom :</strong> {student.first_name} {student.last_name}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                ))}                
              </div>
            </Card>

            {/* ✅ Colonne 2 - Détails du scénario */}
            <div className="flex flex-col gap-6">
              <Card className="p-6 bg-background-surface">
                {scenario ? (
                  <CardContent>
                    <div className="flex justify-start items-center mb-6 gap-2">
                      <h2 className="text-xl font-bold">Scénario</h2>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Badge className="bg-button-primary text-text-alternative">N°{scenario.id}</Badge>
                        {scenario.title}
                      </h3>
                    </div>
                    <div className="space-y-4 bg-background-elevated p-4 rounded-lg">
                      <h3 className="font-semibold text-text-primary text-h3-m">Détails</h3>
                      <p className="mt-2 text-sm text-gray-700"><strong>Objectifs :</strong> {scenario.objectifs}</p>
                      <p className="text-sm text-gray-700 mt-2">
                        <strong>Livrables :</strong> {scenario.livrables}
                      </p>
                    </div>
                  </CardContent>
                ) : (
                  <p className="text-gray-500">Aucun scénario sélectionné.</p>
                )}
              </Card>
              <Card className="p-6 bg-background-surface">
                {scenario ? (
                  <CardContent>
                    <div className="flex justify-between items-center gap-2">
                      <h2 className="text-xl font-bold">Demande de validation</h2>
                      <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/bell-dark.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy9iZWxsLWRhcmsuc3ZnIiwiaWF0IjoxNzQyMjUwMjgxLCJleHAiOjE3NzM3ODYyODF9.chH_7raecyZ1c_RtGnBy5rUa454Sq-46RTwa9ago-48" alt="" />
                    </div>
                    <p className="text-text-tertiary">Aucune demande de validation pour le moment.</p>
                    <div className="flex justify-center mt-6">
                      <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/no-validation.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy9uby12YWxpZGF0aW9uLnN2ZyIsImlhdCI6MTc0MjI0OTUzMCwiZXhwIjoxNzczNzg1NTMwfQ.xGFwUmWahlCF-1GMf5ep2Qkv9IopF166AE6mAL1TNas" alt="" className="h-56"/>
                    </div>
                  </CardContent>
                ) : (
                  <p className="text-gray-500">Aucun scénario sélectionné.</p>
                )}
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* 🔹 Onglet Avancée des équipes */}
        <TabsContent value="progress">
          <div className="text-center p-6">
            <p className="text-gray-500">Cette section affichera la progression des équipes.</p>
          </div>
        </TabsContent>

        {/* 🔹 Onglet Événements */}
        <TabsContent value="events">
          <div className="text-center p-6">
            <p className="text-gray-500">Les événements seront affichés ici.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
