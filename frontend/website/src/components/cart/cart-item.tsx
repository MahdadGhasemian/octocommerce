import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

import { addItemToCart, removeItemFromCart, selectCart } from '@/lib/store/features/cart/cartSlice'

import Counter from '@/components/ui/counter'

import { formatPriceToman } from '@/utils/priceFormatter'

type CartItemProps = {
  item: any
  variant?: 'default' | 'button'
}

const CartItem: React.FC<CartItemProps> = (props: CartItemProps) => {
  // ** Props
  const { item, variant = 'default' } = props

  // ** Store
  const dispatch = useDispatch()

  // ** Global State
  const { items } = useSelector(selectCart)

  // ** Vars
  const isInStock = (id: number) => {
    const item = items?.find(item => item.id === id)
    if (item && item.quantity !== undefined && item.stock !== undefined) {
      return item.quantity < item.stock
    }
    // return false;
    return true
  }
  const outOfStock = !isInStock(item.id)

  return (
    <div
      className={clsx(
        variant === 'default' ? 'grid-cols-4' : 'grid-cols-3',
        'w-full h-auto grid  gap-4 justify-items-start items-start bg-skin-fill py-4 px-4 border-b border-skin-one border-opacity-70 last:border-b-0'
      )}
      title={item?.name}
    >
      {/* Product Image */}
      <Link href={`/product/${item.product_code}/${item.name}`} className='w-full flex justify-center'>
        <Image
          src={item?.image ?? '/assets/placeholder/cart-item.svg'}
          width={100}
          height={100}
          loading='eager'
          alt={item.name || 'تصویر محصول'}
          className='object-cover bg-skin-thumbnail'
        />
      </Link>
      {/* Product Name */}
      <div
        className={clsx(
          variant === 'default' ? 'col-span-3' : 'col-span-2',
          'text-skin-base text-13px sm:text-sm lg:text-15px transition-all leading-5 hover:text-skin-primary'
        )}
      >
        {item?.name}
      </div>

      {/* Counter */}
      <div className='flex flex-row justify-center items-center w-full'>
        <Counter
          value={item.quantity}
          onIncrement={() => dispatch(addItemToCart({ item, quantity: 1 }))}
          onDecrement={() => dispatch(removeItemFromCart({ id: item.id, quantity: 1 }))}
          variant='cart'
          disabled={outOfStock}
        />
      </div>
      {/* Price */}
      <div
        className={clsx(
          variant === 'default' ? 'col-span-3' : 'col-span-2',
          'flex font-semibold text-sm md:text-base text-skin-base leading-5 flex-shrink-0 min-w-[65px] md:min-w-[80px] justify-end'
        )}
      >
        {formatPriceToman((item.sale_price || 0) * (item.quantity || 0))}
      </div>
    </div>
  )
}

export default CartItem
