'use client'

import { ShoppingCart } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import { selectCart } from '@/lib/store/features/cart/cartSlice'
import { useRequireLogin } from '@/hooks/useRequireLogin'

import CartItem from '@/components/cart/cart-item'
import Heading from '@/components/ui/heading'
import Scrollbar from '@/components/ui/scrollbar'

import { formatPriceToman } from '@/utils/priceFormatter'

const CartButton: React.FC = () => {
  // ** Route
  const router = useRouter()

  // ** Hooks
  const { ensureLoggedIn } = useRequireLogin()

  //
  const pathname = usePathname()

  // ** Store
  const { total, items } = useSelector(selectCart)

  // ** Vars
  const itemsCount = items.length
  const noNeedToShow = pathname === '/checkout/cart'

  // ** Functions
  const handleNavigationToCart = () => {
    // Ensure the user is logged in
    if (!ensureLoggedIn()) {
      return
    }

    router.push('/checkout/cart')
  }

  return itemsCount && !noNeedToShow ? (
    <div className='dropdown dropdown-hover dropdown-bottom dropdown-end'>
      <div onClick={handleNavigationToCart} tabIndex={0} className='flex flex-row gap-4 items-center btn btn-ghost'>
        <div className='indicator'>
          <ShoppingCart style={{ transform: 'scaleX(-1)' }} />
          <div className='badge badge-sm badge-primary indicator-item indicator-start indicator-bottom'>
            <h2 className='font-bold text-white'>{itemsCount}</h2>
          </div>
        </div>
      </div>

      {/* Mobile view: Hide on larger screens */}
      <ul className='dropdown-content menu bg-base-100 rounded-box z-[1] px-0 py-4 shadow w-96 sm:hidden'>
        <div className='ps-4 pb-2 text-neutral-500'>{itemsCount} کالا</div>
        <Scrollbar className='cart-scrollbar flex-grow max-h-96'>
          <div className='w-full'>
            {items?.map(item => (
              <CartItem item={item} key={item.id} variant='button' />
            ))}
          </div>
        </Scrollbar>

        <div className='pt-5 pb-2 px-4 border-t border-skin-base flex justify-between'>
          <div className='flex flex-col'>
            <Heading className='mb-2.5'>مبلغ قابل پرداخت</Heading>
            <div className='font-semibold text-base text-skin-base'>{total}</div>
          </div>
          <div onClick={handleNavigationToCart}>
            <div className='btn btn-primary py-0.5'>ثبت سفارش</div>
          </div>
        </div>
      </ul>

      {/* Desktop view: Visible on larger screens */}
      <ul className='dropdown-content menu bg-base-100 rounded-box z-[1] px-0 py-4 shadow w-96 hidden sm:block'>
        <div className='ps-4 pb-2 text-neutral-500'>{itemsCount} کالا</div>
        <Scrollbar className='cart-scrollbar flex-grow max-h-96'>
          <div className='w-full'>
            {items?.map(item => (
              <CartItem item={item} key={item.id} variant='button' />
            ))}
          </div>
        </Scrollbar>

        <div className='pt-5 pb-2 px-4 border-t border-skin-base flex justify-between'>
          <div className='flex flex-col'>
            <Heading className='mb-2.5'>مبلغ قابل پرداخت</Heading>
            <div className='font-semibold text-base text-skin-base'>{formatPriceToman(total)}</div>
          </div>
          <div onClick={handleNavigationToCart}>
            <div className='btn btn-primary py-0.5'>ثبت سفارش</div>
          </div>
        </div>
      </ul>
    </div>
  ) : (
    <div onClick={handleNavigationToCart} className='flex flex-row gap-4 items-center btn btn-ghost'>
      <div className='indicator'>
        <ShoppingCart style={{ transform: 'scaleX(-1)' }} />
        {itemsCount ? (
          <div className='badge badge-sm badge-primary indicator-item indicator-start indicator-bottom'>
            <h2 className='font-bold text-white'>{itemsCount}</h2>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default CartButton
