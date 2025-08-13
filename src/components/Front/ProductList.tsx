import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ProductCard } from './ProductCard'
import { Product } from '@/payload-types'

export const ProductList: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })

  // Fetch products from the 'products' collection
  const products = await payload.find({
    collection: 'products',
    limit: 12,
    sort: '-createdAt',
    draft: false,
    overrideAccess: false,
    depth: 1, // Asegura que el campo 'image' incluya el objeto Media
  })

  const productDocs = products.docs as Product[] || []

  if (productDocs.length === 0) {
    return <p className="text-center text-gray-500">No hay productos disponibles aún.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productDocs.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}