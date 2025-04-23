import * as React from 'react'

import OrderingCart from '@/components/product/OrderingCart'
import ProductGallery from '@/components/product/ProductGallery'

import { Product } from '@/services/basic.service'

type ProductProps = {
  product: Product
}

export default function ProductDetail({ product }: ProductProps) {
  const { name, description } = product

  return (
    <section>
      <div className='flex flex-col xl:flex-row xl:flex-nowrap gap-10'>
        {/* Image */}
        <div className='order-1 flex-grow'>
          <ProductGallery product={product} />
        </div>
        {/* Info */}
        <div className='order-2 flex flex-col gap-6  basis-1/2 flex-grow'>
          <div>
            <h1 className='text-h4 text-neutral-900 pointer-events-none'>{name}</h1>
            <div className='divider mt-1'></div>
          </div>

          {description ? (
            <div>
              <div className='flex'>
                <h2 className='grow-0 text-h5 border-b-2 border-primary'>معرفی</h2>
              </div>
              <p className='text-body-1 text-neutral-800 mt-2 text-justify leading-8 whitespace-pre-line'>
                {description}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* Cart */}
        <div className='hidden xl:flex xl:flex-col xl:order-3 max-w-96'>
          <OrderingCart product={product} />
        </div>
      </div>
    </section>
  )
}
