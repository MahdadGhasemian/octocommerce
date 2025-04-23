import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

import TomanIcon from '@/components/icons/toman-icon';

import { encodeProductName } from '@/utils/name-encode-decode';
import { formatPrice } from '@/utils/priceFormatter';

type PropsType = {
  isFirstPage: boolean;
  product_code: string;
  image: string;
  brand?: string;
  name: string;
  sale_price: number;
  discount_amount: number;
  discount_percentage: number;
  discount?: number;
  star?: number;
};

export default function ProductCard(props: PropsType) {
  const {
    isFirstPage,
    product_code,
    image,
    name,
    sale_price,
    discount_amount,
    discount_percentage,
  } = props;

  // ** Vars
  const sale_price_after_discount = sale_price - discount_amount;

  return (
    <div className='rounded-lg border shadow-sm hover:shadow-lg hover:scale-105 hover:bg-white transition duration-200 delay-100 ease-in-out h-full min-h-[390px]'>
      <Link
        className='block cursor-pointer relative bg-neutral-000 overflow-hidden grow py-3 px-4 lg:px-2 h-full '
        target='_blank'
        href={`/product/${product_code}/${encodeProductName(name)}`}
      >
        <div data-testid='product-card' className='h-full'>
          <article className='overflow-hidden flex flex-col items-stretch justify-start h-full'>
            <div className='flex grow flex-col items-stretch gap-10 py-4'>
              {/* Image */}
              <div className='flex items-start mx-auto'>
                <Image
                  src={image}
                  width={240}
                  height={240}
                  alt={name}
                  className='rounded-md object-contain  w-[240px] h-[240px]'
                  loading={isFirstPage ? 'eager' : 'lazy'}
                  placeholder='blur'
                  blurDataURL='/images/empty-box.png'
                  layout='intrinsic'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 240px'
                />
              </div>
              {/* Name and Price */}
              <div className='grow flex flex-col items-stretch justify-between'>
                {/* Name */}
                <div>
                  <h3 className='truncate-2-lines text-body2-strong text-neutral-700'>
                    {name}
                  </h3>
                </div>
                {/* Price */}
                <div className='w-full'>
                  {/* Top Row */}
                  <div
                    className={cn(
                      'flex justify-end items-center',
                      discount_percentage > 0
                        ? 'justify-between'
                        : 'justify-end'
                    )}
                  >
                    {/* Discount Percentage */}
                    {discount_percentage > 0 && (
                      <div
                        className='badge badge-primary text-sm font-medium'
                        data-testid='discount-percentage'
                      >
                        {Number(discount_percentage)}٪
                      </div>
                    )}

                    {/* Price After Discount */}
                    <div
                      className='text-lg font-semibold flex justify-center items-center'
                      data-testid='price-final'
                    >
                      {formatPrice(sale_price_after_discount)}
                      <span className='ml-1'>
                        <TomanIcon />
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className='flex justify-end items-center text-neutral-700'>
                    {/* Sale Price */}
                    <div
                      className={cn(
                        'text-sm line-through flex',
                        discount_percentage > 0
                          ? 'text-neutral-300'
                          : 'text-white'
                      )}
                      data-testid='price-no-discount'
                    >
                      {formatPrice(sale_price)}
                      <span className='ml-1 text-white'>
                        <TomanIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Link>
    </div>
  );
}
