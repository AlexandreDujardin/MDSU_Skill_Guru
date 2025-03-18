"use client";

import { UserClasses } from "@/components/ui/classes/UserClasses";
import { KeyMetrics } from "@/components/ui/follow-up/KeyMetrics";
import { RecommendedGames } from "@/components/ui/games/RecommendedGames";
import { TutorialsSection } from "@/components/ui/onboarding/TutorialSection";
import { UserPlaylists } from "@/components/ui/playlists/UserPlaylists";
import { motion } from "framer-motion";

export default function Home() {
  const title = "Bienvenue sur Skill Guru !"; // Texte animé

  return (
    <main className="flex-1 space-y-10">
      <section className="pb-8 pt-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary font-bold">
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {/* Bonsoir, user prénom + nom */}
          </p>
        </div>
      </section>
      <section>
        <TutorialsSection />
      </section>
      <section>
        <UserPlaylists />
      </section>
      <section>
        <RecommendedGames />
      </section>
      <section>
        <UserClasses />
      </section>
      <section>
        <KeyMetrics />
      </section>
    </main>
  );
}
