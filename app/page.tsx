import { UserClasses } from '@/components/ui/classes/UserClasses'
import { KeyMetrics } from '@/components/ui/follow-up/KeyMetrics'
import { RecommendedGames } from '@/components/ui/games/RecommendedGames'
import { TutorialsSection } from '@/components/ui/onboarding/TutorialSection'
import { UserPlaylists } from '@/components/ui/playlists/UserPlaylists'


export default function Home() {
  return (
        <main className="flex-1 space-y-6">
          <section className="space-y-6 pb-8 pt-6">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 justify-center">
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary font-bold">
                Bienvenue sur SKILL GURU              
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
  )
}

