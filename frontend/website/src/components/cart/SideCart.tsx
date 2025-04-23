'use client';

import { useDispatch, useSelector } from 'react-redux';

import { resetCart, selectCart } from '@/lib/store/features/cart/cartSlice';
import { cn } from '@/lib/utils';

import CartItem from '@/components/cart/cart-item';
import EmptyCart from '@/components/cart/empty-cart';
import CloseIcon from '@/components/icons/close-icon';
import DeleteIcon from '@/components/icons/delete-icon';
import Heading from '@/components/ui/heading';
import Link from '@/components/ui/link';
import Scrollbar from '@/components/ui/scrollbar';
import Text from '@/components/ui/text';

export interface SideCardProps {
  title?: string;
  content?: string;
  children?: React.ReactNode;
}

const SideCard: React.FC<SideCardProps> = (props: SideCardProps) => {
  // ** Store
  const dispatch = useDispatch();

  const { children } = props;
  const { items, total, isEmpty } = useSelector(selectCart);

  return (
    <div className='drawer z-50'>
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        {/* Page content here */}
        <label htmlFor='my-drawer'>
          <div className=''>{children}</div>
        </label>
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <div className='flex flex-col h-full justify-between bg-base-200 text-base-content min-h-full w-96 p-4'>
          {/* Sidebar content here */}
          <div className='w-full flex justify-between items-center relative ps-5 md:ps-7 border-b border-skin-base'>
            <Heading variant='titleMedium'>سبد خرید</Heading>
            <div className='flex items-center'>
              {!isEmpty && (
                <button
                  className='flex flex-shrink items-center text-15px transition duration-150 ease-in focus:outline-none text-skin-base opacity-50 hover:opacity-100 -me-1.5'
                  aria-label='کل سبد خالی کن'
                  onClick={() => dispatch(resetCart())}
                >
                  <DeleteIcon />
                  <span className='ps-1'>کل سبد خالی کن</span>
                </button>
              )}

              <button
                className='flex text-2xl items-center justify-center px-4 md:px-6 py-6 lg:py-7 focus:outline-none transition-opacity text-skin-base hover:opacity-60'
                aria-label='close'
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          {!isEmpty ? (
            <Scrollbar className='cart-scrollbar w-full flex-grow'>
              <div className='w-full px-1'>
                {items?.map((item) => (
                  <CartItem item={item} key={item.id} />
                ))}
              </div>
            </Scrollbar>
          ) : (
            <EmptyCart />
          )}
          <div className='border-t border-skin-base px-5 md:px-7 pt-5 md:pt-6 pb-5 md:pb-6'>
            <div className='flex place-content-between pb-5 md:pb-7'>
              <Heading className='mb-2.5'>مجموع:</Heading>
              <div className='flex-shrink-0 font-semibold text-base md:text-lg text-skin-base -mt-0.5 min-w-[80px] text-end'>
                {total}
              </div>
            </div>
            <Text className='leading-6 w-full'>
              مبلغ نهایی و تخفیف ها هنگام پردازش سبد خرید نهایی خواهند شد
            </Text>
            <div className='flex flex-col'>
              <Link
                href='/'
                className={cn(
                  'w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-skin-inverted bg-skin-primary focus:outline-none transition duration-300 hover:bg-opacity-90',
                  {
                    'cursor-not-allowed !text-skin-base !text-opacity-25 bg-skin-button-disable hover:bg-skin-button-disable':
                      isEmpty,
                  }
                )}
              >
                <div className='btn btn-success btn-wide rounded-none py-0.5'>
                  پرداخت
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCard;
