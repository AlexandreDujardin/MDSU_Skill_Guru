'use client'

import { useState } from 'react'
import { Product } from 'stripe'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createCheckoutSession } from '../actions'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false)
  const price = product.default_price as Stripe.Price
  const amount = price.unit_amount ? price.unit_amount / 100 : 0
  const currency = price.currency?.toUpperCase() || 'USD'

  const handleSubscribe = async () => {
    try {
      setLoading(true)
      const { url } = await createCheckoutSession(price.id)
      window.location.href = url
    } catch (error) {
      console.error('Error:', error)
      // You might want to show an error toast here
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {product.images?.[0] && (
          <div className="aspect-video relative mb-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        )}
        <div className="space-y-2">
          {product.features?.map((feature, index) => (
            <div key={index} className="flex items-center">
              <CheckIcon className="mr-2 h-4 w-4" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          {new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency,
          }).format(amount)}
          <span className="text-sm font-normal text-muted-foreground">/mois</span>
        </div>
        <Button onClick={handleSubscribe} disabled={loading}>
          {loading ? 'Loading...' : 'Subscribe'}
        </Button>
      </CardFooter>
    </Card>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

