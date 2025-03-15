"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ToggleViewProps {
  onChange: (view: "list" | "grid") => void;
}

export const ToggleView = ({ onChange }: ToggleViewProps) => {
  const [view, setView] = useState<"list" | "grid">("grid");

  return (
    <div className="flex items-center gap-4">
      <Button 
        className="bg-transparent focus:bg-background-elevated focus:border-border-default focus:border hover:bg-transparent  text-text-primary"
        variant={view === "list" ? "primary" : "secondary"}
        onClick={() => { setView("list"); onChange("list"); }}
      >
        <img src="/images/games/list.svg" alt="liste" />
        Liste
      </Button>
      
      {/* 🔥 Ligne verticale entre les boutons */}
      <div className="w-[1px] h-6 bg-border-default"></div>

      <Button 
        className="bg-transparent focus:bg-background-elevated focus:border-border-default focus:border hover:bg-transparent  text-text-primary"
        variant={view === "grid" ? "primary" : "secondary"}
        onClick={() => { setView("grid"); onChange("grid"); }}
      >
        <img src="/images/games/grid.svg" alt="grille" />
        Grille
      </Button>
    </div>
  );
};
