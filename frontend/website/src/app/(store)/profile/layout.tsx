import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='p-2 xl:px-64 xl:py-10'>
      <div>{children}</div>
    </div>
  );
}
