import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/payload-types'

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { name, description, price, image, category } = product

  // Maneja el campo image, que puede ser (number | null) | Media
  const imageUrl = typeof image === 'object' && image?.url ? image.url : null
  const imageAlt = typeof image === 'object' && image?.alt ? image.alt : name

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      {imageUrl ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${imageUrl}`}
          alt={imageAlt}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Imagen no disponible</span>
        </div>
      )}
      <div className="p-4">
        {category && (
          <span className="text-xs uppercase text-gray-500 mb-2 block">
            {category}
          </span>
        )}
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        {description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>
        )}
        {price && (
          <p className="text-lg font-bold text-green-600 mb-4">
            ${price.toLocaleString()}
          </p>
        )}
        <Link
          href={`/products/${product.id}`} // Usa el ID para la URL
          className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  )
}