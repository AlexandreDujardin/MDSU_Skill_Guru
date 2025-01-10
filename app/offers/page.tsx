import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { stripe } from '@/utils/stripe'
import { ProductList } from './product-list'

export default async function OffersPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  const { data: products } = await stripe.products.list({
    active: true,
    expand: ['data.default_price'],
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Nos offres</h1>
        <ProductList products={products} />
      </main>
    </div>
  )
}

