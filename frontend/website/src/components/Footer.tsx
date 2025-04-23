import Link from 'next/link';
import * as React from 'react';

import SocialLinks from '@/components/SocialLinks';

// import Logo from '~/svg/Logo.svg';

export default function Footer() {
  return (
    <footer className='footer bg-base-200 text-base-content p-10 pb-20 lg:pb-10'>
      <div className='flex flex-col xl:flex-row w-full justify-between place-items-stretch'>
        <div className='flex flex-col flex-grow'>
          <div className='flex justify-between items-center select-none w-full'>
            <div
              className='ml-4'
              style={{ width: '195px', height: '30px', lineHeight: '0' }}
            >
              <Link href='/'>
                {/* <Logo className='w-48 md:w-64' /> */}
              </Link>
            </div>
          </div>

          <div className='mb-8 mt-5 md:mt-4 md:mb-0 flex flex-col md:flex-row items-start md:items-center flex-wrap lg:flex-nowrap text-body-2 text-neutral-700'>
            <p className='shrink-0'> تلفن های فروش و پشتیبانی : </p>
            <span className='hidden md:block'>&nbsp;</span>
            <p className='shrink-0' dir='ltr' data-cro-id='footer-phonenumber'>
              شماره اول
            </p>
            <div className='px-5 text-neutral-400 hidden md:block'>|</div>
            <p className='shrink-0' dir='ltr'>
              شماره دوم
            </p>
          </div>
          <div className='mb-8 mt-4 md:mt-3 md:mb-0 flex items-center flex-wrap flex-col lg:flex-nowrap text-body-2 text-neutral-700'>
            <p className='w-full mt-1 md:mt-0'>
              <span>آدرس : </span>
              <span>
                آدرس فروشگاه
              </span>
            </p>
            <p className='w-full mt-1'>
              <span>
                فعالیت فروشگاه به صورت اینترنتی است، لذا جهت خرید مراجعه
                نفرمایید.
              </span>
            </p>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 sm:gap-1 md:gap-14 justify-between md:justify-end items-center'>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
