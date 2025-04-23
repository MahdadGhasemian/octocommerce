'use client';

import { AlignJustify } from 'lucide-react';

import AuthButton from '@/components/AuthButton';
import CartButton from '@/components/cart/CartButton';
import HomeIcon from '@/components/icons/home-icon';
import Link from '@/components/ui/link';

const MobileNavigation: React.FC = () => {
  return (
    <>
      <div className='flex sm:hidden fixed z-50 -bottom-0.5 items-center justify-between shadow-lg body-font bg-base-100 w-full h-14 px-4 md:px-6 lg:px-8 text-skin-muted pb-0.5'>
        {/* Home */}
        <Link href='/'>
          <HomeIcon />
        </Link>

        <AlignJustify />

        {/* Cart */}
        <CartButton />

        {/* Auth */}
        <AuthButton />
      </div>
    </>
  );
};

export default MobileNavigation;
