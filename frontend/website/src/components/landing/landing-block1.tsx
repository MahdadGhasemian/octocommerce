'use server';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { siteConfig } from '@/configs/site';

const { block1 } = siteConfig.landing;
const { item1, item2, item3 } = block1;

const LandingBlock1 = () => {
  return (
    <section className='my-4 -mx-4 sm:mx-0 lg:mx-8'>
      <div className='flex flex-col lg:flex-row flex-wrap lg:flex-nowrap gap-4 lg:gap-8'>
        {/*  */}
        <div className='flex flex-row lg:flex-col flex-wrap justify-between gap-4 lg:gap-8 lg:w-1/3'>
          <div className='flex-grow'>
            <Link href={item1.link} target='_blank'>
              <div className='relative h-[223px]'>
                <Image
                  src={item1.src}
                  width={370}
                  height={225}
                  loading='eager'
                  alt={item1.alt}
                  className='object-cover object-center h-full w-full'
                />

                <div className='absolute inset-0 top-0 flex h-full w-full items-center justify-start p-6 sm:p-9'>
                  <div className='max-w-[180px] text-right'>
                    <h3>
                      <p className='mb-3 block text-xl font-bold hover:text-primary xl:text-2xl text-nowrap'>
                        {item1.title}
                      </p>
                    </h3>
                    <p className='text-base font-medium hover:text-primary'>
                      {item1.btnText}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className='flex-grow'>
            <Link href={item2.link} target='_blank'>
              <div className='relative h-[223px]'>
                <Image
                  src={item2.src}
                  width={370}
                  height={225}
                  loading='eager'
                  alt={item2.alt}
                  className='object-cover object-center h-full w-full'
                />

                <div className='absolute inset-0 top-0 flex h-full w-full items-center justify-start p-6 sm:p-9'>
                  <div className='max-w-[180px] text-right'>
                    <h3>
                      <p className='mb-3 block text-xl font-bold hover:text-primary xl:text-2xl text-nowrap'>
                        {item2.title}
                      </p>
                    </h3>
                    <p className='text-base font-medium hover:text-primary'>
                      {item2.btnText}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/*  */}
        <div className='flex-grow'>
          <Link href={item3.link} target='_blank'>
            <div className='relative h-[370px] md:h-[480px]'>
              <Image
                src={item3.src}
                width={770}
                height={480}
                loading='eager'
                alt={item3.alt}
                className='object-cover object-center h-full w-full'
              />

              <div className='absolute inset-0 flex items-center justify-end px-8 md:px-12'>
                <div className='max-w-[420px]'>
                  <h3>
                    <p className='mb-5 block text-2xl font-bold hover:text-primary sm:text-4xl'>
                      {item3.title}
                    </p>
                  </h3>
                  <p className='mb-9 text-base text-body-color text-justify'>
                    {item3.description}
                  </p>
                  <p className='inline-flex items-center justify-center rounded-md bg-primary px-7 py-[13px] text-center text-base font-medium text-white hover:bg-blue-dark'>
                    {item3.btnText}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingBlock1;
