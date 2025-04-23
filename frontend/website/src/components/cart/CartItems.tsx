import React from 'react';
import { useSelector } from 'react-redux';

import { selectCart } from '@/lib/store/features/cart/cartSlice';

import CartItem from '@/components/cart/cart-item';
import EmptyCart from '@/components/cart/empty-cart';
import Heading from '@/components/ui/heading';

const CartItems = () => {
  // ** Store
  const { items, isEmpty } = useSelector(selectCart);

  // ** Vars
  const itemsCount = items.length;

  return (
    <div className='flex flex-col items-start justify-between text-base-content gap-2 xl:gap-10 border rounded-lg w-full p-2 md:p-10'>
      <div className='flex xl:flex-col items-center xl:items-start gap-2'>
        <Heading variant='titleMedium'>سبد خرید شما</Heading>
        <div className='text-neutral-500'>{itemsCount} کالا</div>
      </div>

      {!isEmpty ? (
        items?.map((item) => <CartItem item={item} key={item.id} />)
      ) : (
        <div className='flex justify-center w-full'>
          <EmptyCart />
        </div>
      )}
    </div>
  );
};

export default CartItems;
