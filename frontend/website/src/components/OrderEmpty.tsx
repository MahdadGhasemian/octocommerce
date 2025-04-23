import React, { FC } from 'react';

import Text from '@/components/ui/text';

import EmptyList from '~/svg/EmptyList.svg';

interface Props {
  text?: string;
}

const OrderEmpty: FC<Props> = (props: Props) => {
  // ** Props
  const { text } = props;

  return (
    <div className='px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center'>
      <div className='flex mx-auto w-[220px] md:w-auto'>
        <EmptyList className='w-48 md:w-64' />
      </div>
      <Text>{text}</Text>
    </div>
  );
};

export default OrderEmpty;
