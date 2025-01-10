import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '../../components/navbar'

export default async function Dashboard() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-2xl font-bold mb-4">
          C'est le tableau de bord uniquement pour les utilisateurs connectés
        </h1>
        <p>Bienvenue, {session.user.email}</p>
      </main>
    </div>
  )
}

