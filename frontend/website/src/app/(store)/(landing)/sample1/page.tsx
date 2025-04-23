import * as React from 'react';

import LandingBlock1 from '@/components/landing/landing-block1';
import LandingBlock2 from '@/components/landing/landing-block2';

export default async function Page() {
  return (
    <div className=''>
      {/*  */}
      <LandingBlock1 />
      {/*  */}
      <LandingBlock2 />
    </div>
  );
}
