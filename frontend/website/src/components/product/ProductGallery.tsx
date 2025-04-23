'use server'

import { X } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'

import { Product } from '@/services/basic.service'

type ProductGalleryProps = {
  product: Product
}

const ProductGallery: React.FC<ProductGalleryProps> = (props: ProductGalleryProps) => {
  // ** Props
  const { product } = props

  // ** Vars
  const { name, image, images } = product

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col items-center'>
        <label className='rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 cursor-pointer' htmlFor='gallery_modal'>
          <Image
            className='w-full h-full max-h-48 md:max-h-96 xl:max-h-none object-cover'
            src={`${image}`}
            alt={`${name}`}
            width={500}
            height={500}
          />
        </label>
        <div className='flex flex-row gap-2'>
          {images?.slice(0, 5)?.map((image, index) => {
            return (
              <label
                key={`images${index}`}
                className='p-2 border rounded-lg cursor-pointer border-complete-200 md:w-24'
                htmlFor='gallery_modal'
              >
                <Image className='object-cover ' src={`${image}`} alt={`${name}-${index}`} width={96} height={96} />
              </label>
            )
          })}
        </div>
      </div>

      <input type='checkbox' id='gallery_modal' className='modal-toggle' />
      <div className='modal' role='dialog'>
        <div className='modal-box w-full h-full max-w-screen-2xl bg-black'>
          <div className='flex flex-col h-full'>
            {/*  */}
            <div className='flex place-content-end'>
              <label htmlFor='gallery_modal' className='btn'>
                <X />
              </label>
            </div>

            {/*  */}
            <div className='carousel w-full grow'>
              {images.map((image, index) => {
                const prevIndex = (index - 1 + images.length) % images.length
                const nextIndex = (index + 1) % images.length

                return (
                  <div
                    key={`product-image-${index}`}
                    id={`slide${index + 1}`}
                    className='carousel-item relative w-full'
                  >
                    <div className='flex w-full items-center justify-center'>
                      <Image
                        className='object-cover'
                        src={`${image}`}
                        alt={`${name}-${index}`}
                        width={1024}
                        height={1024}
                      />
                    </div>

                    <div className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'>
                      <a href={`#slide${prevIndex + 1}`} className='btn btn-circle'>
                        ❮
                      </a>
                      <a href={`#slide${nextIndex + 1}`} className='btn btn-circle'>
                        ❯
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductGallery
