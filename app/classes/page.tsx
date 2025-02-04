import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/app/DashboardLayout'
import { PageLayout } from "@/components/PageLayout";
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
    <PageLayout>
      <div className="flex justify-between items-center mb-8">
        <AddClassForm />
      </div>
      <ClassList classes={classes || []} />
    </PageLayout>
  )
}

