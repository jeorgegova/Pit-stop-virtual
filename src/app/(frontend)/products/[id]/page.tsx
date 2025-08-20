import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Product } from '@/payload-types'
import BuyButton from '@/components/Front/BuyButton'

interface ProductPageProps {
  params: { id: string }
}

const ProductDetailPage = async ({ params }: ProductPageProps) => {
  const id = params.id
  const payload = await getPayload({ config: configPromise })

  try {
    const productQuery = await payload.findByID({
      collection: 'products',
      id,
      depth: 2,
      draft: false,
      overrideAccess: false,
    })

    const product = productQuery as Product

    if (!product) {
      notFound()
    }

    const imageUrl =
      typeof product.image === 'object' && product.image?.url ? product.image.url : null
    const imageAlt =
      typeof product.image === 'object' && product.image?.alt
        ? product.image.alt
        : product.name

    const compatibles = product.compatibles || []

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Imagen */}
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-lg overflow-hidden">
            {imageUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${imageUrl}`}
                alt={imageAlt || 'Producto'}
                width={800}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Imagen no disponible</span>
              </div>
            )}
          </div>

          {/* Detalles */}
          <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
            {product.category && (
              <span className="text-sm tracking-widest uppercase text-primary">
                {product.category}
              </span>
            )}

            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

            {product.description && (
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            )}

            {product.price !== undefined && (
              <p className="text-3xl font-bold text-green-600">
                ${product.price.toLocaleString()}
              </p>
            )}

            {compatibles.length > 0 ? (
              <div>
                <h2 className="text-lg font-semibold mb-2">🚗 Automotores Compatibles</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  {compatibles.map((compatible, index) => (
                    <li key={index}>
                      {compatible.vehicle || 'Vehículo no especificado'}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-400 italic">
                No hay automotores compatibles especificados.
              </p>
            )}

            {/* Botón */}
            <div className="pt-4">
              <BuyButton />
            </div>
          </div>
        </div>

        {/* Más detalles */}
        <div className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">Más Detalles</h2>
          <p className="text-gray-700 leading-relaxed">
            {product.description || 'No hay más detalles disponibles para este producto.'}
          </p>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    return (
      <p className="text-center text-red-500 mt-20">
        Error al cargar el producto. Intenta nuevamente.
      </p>
    )
  }
}

export default ProductDetailPage
