'use server';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { siteConfig } from '@/configs/site';

const { block2 } = siteConfig.landing;
const { products } = block2;

const LandingBlock2 = () => {
  return (
    <section className='my-20 -mx-4 sm:mx-0 lg:mx-8'>
      <div className='container mx-auto'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className='mx-auto mb-[65px] max-w-[510px] text-center'>
              <h2 className='mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px] md:leading-[1.2]'>
                محصولات ویژه‌ای که ممکن است شما دوست داشته باشید
              </h2>
              <span className='mx-auto mb-[18px] block h-[3px] w-[100px] bg-secondary'></span>
              <p className='text-base text-body-color dark:text-dark-6'>
                مجموعه‌ای از محصولات جدید و پرفروش برای شما. از تخفیف‌های ویژه و
                انتخاب‌های جذاب لذت ببرید!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 auto-rows-fr'>
        {products.map((item, index) => {
          return (
            <div
              key={`item-data-product-${index}`}
              className='card bg-base-100 shadow-xl h-full min-h-[390px] flex flex-col'
            >
              <figure className=''>
                <Image
                  className='object-cover w-full h-[250px]'
                  src={`${item.src}`}
                  alt={`${item.alt}`}
                  width={270}
                  height={250}
                />
              </figure>
              <div className='card-body'>
                <h2 className='card-title'>
                  {item.name}
                  {item.isNew && (
                    <div className='badge badge-secondary rounded-md'>جدید</div>
                  )}
                  {item.isHot && (
                    <div className='badge badge-primary rounded-md'>داغ</div>
                  )}
                </h2>
                <p className='mt-4 text-justify'>{item?.description}</p>
                <div className='card-actions justify-end mt-8'>
                  <Link href={item.link} target='_blank' className='w-full'>
                    <button className='btn w-full btn-outline btn-primary'>
                      خرید
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LandingBlock2;
