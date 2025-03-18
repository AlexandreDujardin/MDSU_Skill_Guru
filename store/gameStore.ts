import { create } from "zustand";

interface GameState {
  gameSlug: string;
  level: string;
  classId: string;
  scenarioId: string | null;
  setGameConfig: (gameSlug: string, level: string, classId: string, scenarioId: string | null) => void;
  resetGameConfig: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameSlug: "",
  level: "",
  classId: "",
  scenarioId: null,
  setGameConfig: (gameSlug, level, classId, scenarioId) =>
    set({ gameSlug, level, classId, scenarioId }),
  resetGameConfig: () =>
    set({ gameSlug: "", level: "", classId: "", scenarioId: null }),
}));
