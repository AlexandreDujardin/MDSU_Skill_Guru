import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { DashboardLayout } from '@/app/DashboardLayout'
import { ClassList } from './class-list'
import { AddClassForm } from './add-class-form'

export default async function ClassesPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  const { data: classes } = await supabase
    .from('classes')
    .select(`
      id,
      name,
      students (
        id,
        first_name,
        last_name
      )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Mes classes</h1>
          <AddClassForm />
        </div>
        <ClassList classes={classes || []} />
      </main>
    </div>
  )
}

