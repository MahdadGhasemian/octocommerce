'use client'

import { useDispatch, useSelector } from 'react-redux'

import { addItemToCart, removeItemFromCart, selectCart } from '@/lib/store/features/cart/cartSlice'

import PlusIcon from '@/components/icons/plus-icon'
import Counter from '@/components/ui/counter'

interface Props {
  data: any
  variation?: any
  disabled?: boolean
}

const AddToCart: React.FC<Props> = ({ data, disabled }: Props) => {
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
    return false
  }

  const getItem = (id: number) => {
    return items?.find(item => item.id === id)
  }
  const isInCart = (id: number) => !!getItem(id)
  const item = data
  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.stopPropagation()

    dispatch(addItemToCart({ item, quantity: 1 }))
  }
  const handleRemoveClick = (e: any) => {
    e.stopPropagation()
    dispatch(removeItemFromCart({ id: item.id, quantity: 1 }))
  }
  const outOfStock = isInCart(item?.id) && !isInStock(item.id)
  const iconSize = '19'
  return !isInCart(item?.id) ? (
    <button
      className='bg-skin-primary rounded-full w-8 lg:w-10 h-8 lg:h-10 text-skin-inverted text-4xl flex items-center justify-center focus:outline-none'
      aria-label='Count Button'
      onClick={handleAddClick}
      disabled={disabled || outOfStock}
    >
      <PlusIcon width={iconSize} height={iconSize} />
    </button>
  ) : (
    <Counter
      value={getItem(item.id)?.quantity || 0}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      disabled={outOfStock}
    />
  )
}

export default AddToCart
