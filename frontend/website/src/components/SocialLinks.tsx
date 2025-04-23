import Link from 'next/link';

import AparatLogo from '~/svg/AparatLogo.svg';
import InstagramLogo from '~/svg/InstagramLogo.svg';
import LinkedinLogo from '~/svg/LinkedinLogo.svg';
import TwitterLogo from '~/svg/TwitterLogo.svg';

const SocialLinks = () => {
  return (
    <div className='flex flex-col justify-evenly items-start'>
      <h4 className='mb-3 text-lg text-neutral-700'>همراه ما باشید!</h4>
      <div className='flex items-center gap-1 md:gap-4'>
        <Link href='https://www.instagram.com/octocommerce.ir/' passHref target='_blank'>
          <InstagramLogo className='w-12 h-12' />
        </Link>
        <Link href='https://twitter.com/octocommerce' passHref target='_blank'>
          <div className='flex'>
            <TwitterLogo className='w-12 h-12' />
          </div>
        </Link>
        <Link href='https://www.linkedin.com/in/octocommerce' passHref target='_blank'>
          <div className='flex'>
            <LinkedinLogo className='w-12 h-12' />
          </div>
        </Link>
        <Link href='https://www.aparat.com/octocommerce/' passHref target='_blank'>
          <div className='flex'>
            <AparatLogo className='w-12 h-12' />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SocialLinks;
