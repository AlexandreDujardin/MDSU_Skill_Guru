"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";

const supabase = createClient();

const niveaux = ["Débutant", "Intermédiaire", "Avancé"];

const scenarios = [
  {
    id: 1,
    title: "Lancement d’une application",
    livrables: "Cahier des charges, Prototype, Campagne marketing.",
    objectifs: "Respecter le budget, respecter les délais, assurer une qualité optimale.",
    niveaux: ["Débutant"],
  },
  {
    id: 2,
    title: "Organisation d’un événement international",
    livrables: "Plan de communication, Logistique détaillée, Bilan post-événement.",
    objectifs: "Attirer un nombre cible de participants, maîtriser les coûts, assurer une couverture médiatique.",
    niveaux: ["Débutant", "Intermédiaire", "Avancé"],
  },
  {
    id: 3,
    title: "Développement d’un produit innovant",
    livrables: "Étude de marché, Prototype, Plan de lancement commercial.",
    objectifs: "Valider l’intérêt du marché, assurer la faisabilité technique, respecter le time-to-market.",
    niveaux: ["Débutant", "Intermédiaire"],
  },
];

interface GameLaunchSheetProps {
  open: boolean;
  onClose: () => void;
}

export function GameLaunchSheet({ open, onClose }: GameLaunchSheetProps) {
  const [step, setStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedScenario, setSelectedScenario] = useState<{ id: number; title: string; livrables: string; objectifs: string; niveaux: string[] } | null>(null);
  const [userClasses, setUserClasses] = useState<{ id: number; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchClasses() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("classes")
        .select("id, name")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: true });

      if (error) console.error("❌ Erreur lors de la récupération des classes :", error);
      else setUserClasses(data || []);
    }

    fetchClasses();
  }, []);

  const { slug } = useParams() as { slug: string };
  const { setGameConfig } = useGameStore();

  const handleConfirm = () => {
    if (!selectedLevel || !selectedClass || !selectedScenario) {
      console.error("❌ Vous devez sélectionner un niveau, une classe et un scénario !");
      return;
    }

    setGameConfig(slug, selectedLevel, selectedClass, selectedScenario.id.toString());

    router.push(`/catalog/${slug}/launch-game`);
  };


  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="overflow-y-auto max-h-screen">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold text-primary">Préparer le jeu</SheetTitle>
        </SheetHeader>

        {step === 1 ? (
          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-semibold">Niveau du scénario</label>
              <Select onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Niveau de la classe" />
                </SelectTrigger>
                <SelectContent>
                  {niveaux.map((niveau) => (
                    <SelectItem key={niveau} value={niveau}>{niveau}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-semibold">Choisir une classe</label>
              <Select onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une classe" />
                </SelectTrigger>
                <SelectContent>
                  {userClasses.length > 0 ? (
                    userClasses.map((classe) => (
                      <SelectItem key={classe.id} value={classe.id.toString()}>{classe.name}</SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>Aucune classe disponible</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variantType="secondary" onClick={onClose}>Annuler</Button>
              <Button
                variantType="primary"
                disabled={!selectedLevel || !selectedClass}
                onClick={() => setStep(2)}
              >
                Suivant
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            <h2 className="text-lg font-semibold text-text-primary">Choix du scénario</h2>
            <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-screen">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`p-4 border rounded-lg cursor-pointer ${selectedScenario?.id === scenario.id ? "border-border-active" : "border-border-default"}`}
                  onClick={() => setSelectedScenario(scenario)}
                >
                  <h3 className="font-semibold">{scenario.title}</h3>
                  <p className="text-sm text-text-tertiary">
                    <strong>Livrables :</strong> {scenario.livrables}
                  </p>
                  <p className="text-sm text-text-tertiary">
                    <strong>Objectifs :</strong> {scenario.objectifs}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {scenario.niveaux.map((niveau) => (
                      <span key={niveau} className="px-3 py-1 text-xs rounded-xl bg-button-primary text-text-alternative">
                        {niveau}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variantType="secondary" onClick={() => setStep(1)}>Retour</Button>
              <Button
                variantType="primary"
                disabled={!selectedScenario}
                onClick={handleConfirm}
              >
                Confirmer
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
