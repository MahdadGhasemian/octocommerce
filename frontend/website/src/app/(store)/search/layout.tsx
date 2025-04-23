import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=''>
      {/* <div className='flex gap-4'> */}
      {/* <div className='float-start'>
          <div className='sticky top-28'>
            <SearchBox />
          </div>
        </div> */}
      <div className='max-w-[1680px] mx-auto'>
        <div className='flex mx-10'>{children}</div>
      </div>
      {/* </div> */}
    </div>
  );
}
