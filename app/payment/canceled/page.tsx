import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { XIcon } from 'lucide-react'

export default async function CanceledPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
      <main className="flex-1 container py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="rounded-full h-12 w-12 bg-red-100 text-red-600 mx-auto mb-4 flex items-center justify-center">
            <XIcon className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Paiement annulé</h1>
          <p className="text-muted-foreground mb-8">
            Votre paiement a été annulé. Si vous avez des questions, merci de contacter notre équipe support.
          </p>
          <Button asChild>
            <Link href="/offers">Retour sur les offres</Link>
          </Button>
        </div>
      </main>
  )
}

