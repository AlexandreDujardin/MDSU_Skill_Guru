import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
        <main className="flex-1">
          <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                SKILL GURUUUUUUUUUUUU
              </h1>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Bonsoir, Philippe Hermelin
              </p>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/auth/sign-up">Commence ton ascenscion</Link>
                </Button>
                <Button asChild size="lg" >
                  <Link href="/auth/sign-in">Ose te connecter, VAS-Y!!!!!!!!!!</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
  )
}

