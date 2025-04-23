import * as React from 'react';

import '@/styles/globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex mx-10'>
      <div className='max-w-[1680px] mx-auto'>{children}</div>
    </div>
  );
}
