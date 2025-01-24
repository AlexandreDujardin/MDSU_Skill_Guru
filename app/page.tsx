import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import Link from 'next/link'

export default function Home() {
  return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                Master Any Skill with Expert Guidance
              </h1>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Connect with top mentors, track your progress, and achieve your learning goals faster than ever before.
              </p>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/auth/sign-up">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
  )
}

