import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { stripe } from '@/utils/stripe'
import { ProductList } from './product-list'
import { PageLayout } from '@/components/PageLayout'

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
    <PageLayout>
      <ProductList products={products} />
    </PageLayout>
  )
}

