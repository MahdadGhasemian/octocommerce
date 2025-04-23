import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='max-w-[1680px] mx-auto'>{children}</div>;
}
