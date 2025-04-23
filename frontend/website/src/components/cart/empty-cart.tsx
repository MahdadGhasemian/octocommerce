import Image from 'next/image';

import Heading from '@/components/ui/heading';
import Text from '@/components/ui/text';

const EmptyCart: React.FC = () => {
  return (
    <div className='px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center'>
      <div className='flex mx-auto w-[220px] md:w-auto'>
        <Image
          src='/images/empty-box.png'
          alt='Your cart is empty.'
          width={270}
          height={240}
        />
      </div>
      <Heading variant='titleMedium' className='mb-1.5 pt-8'>
        سبد خرید شما خالی است.
      </Heading>
      <Text>لطفا محصولات را به سبد خریدتان اضافه نمایید.</Text>
    </div>
  );
};

export default EmptyCart;
