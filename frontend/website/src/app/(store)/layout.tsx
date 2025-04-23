import * as React from 'react';
import { Fragment } from 'react';

import '@/styles/globals.css';

import Footer from '@/components/Footer';
import MobileNavigation from '@/components/layout/mobile-navigation/mobile-navigation';
import Navbar from '@/components/navbar/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Fragment>
        <header>
          {/* <NavBar2 /> */}
          <Navbar />
        </header>
        <div className='flex-grow mt-20 md:mt-40 mb-20'>
          {/* <FilterBar /> */}
          {children}
        </div>
        <Footer />
        <MobileNavigation />
      </Fragment>
    </div>
  );
}
