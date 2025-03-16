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
        onClick={() => { setView("list"); onChange("list"); }}
      >
        <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/list.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy9saXN0LnN2ZyIsImlhdCI6MTc0MjEwMDY2MSwiZXhwIjoxNzczNjM2NjYxfQ._PRv9urag7WjLcIPwXMUbBDByKzLvs8HWehiUHHn2Zc" alt="liste" />
        Liste
      </Button>
      
      {/* 🔥 Ligne verticale entre les boutons */}
      <div className="w-[1px] h-6 bg-border-default"></div>

      <Button 
        className="bg-transparent focus:bg-background-elevated focus:border-border-default focus:border hover:bg-transparent  text-text-primary"
        onClick={() => { setView("grid"); onChange("grid"); }}
      >
        <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/grid.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy9ncmlkLnN2ZyIsImlhdCI6MTc0MjEwMDYyOSwiZXhwIjoxNzczNjM2NjI5fQ.-_ZkpE67HJJbDMwSVs0FzdcnCQLONoM46UcPihCyf5I" alt="grille" />
        Grille
      </Button>
    </div>
  );
};
