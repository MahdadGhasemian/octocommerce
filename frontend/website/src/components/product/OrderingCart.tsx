'use client'

import { Minus, PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Item } from '@/lib/store/features/cart/cartSlice'
import {
  addItemToCart,
  clearItemFromCart,
  selectCart,
  updateItemQuantityCart
} from '@/lib/store/features/cart/cartSlice'

import basicService, { Product } from '@/services/basic.service'
import { formatPrice } from '@/utils/priceFormatter'

interface Props {
  product: Product
}

const OrderingCart: React.FC<Props> = (data: Props) => {
  // ** Props
  const { product } = data

  // ** Store
  const dispatch = useDispatch()
  const { items } = useSelector(selectCart)

  // ** Global State
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [quantity, setQuantity] = useState<number>(1)
  const [availableQuantity, setAvailableQuantity] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // ** Vars
  const { id, sale_price, discount_amount, discount_percentage } = product
  const sale_price_after_discount = sale_price - discount_amount
  const item: Item = {
    ...product
  }

  const getItem = (id: number) => {
    return items?.find(item => item.id === id)
  }

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.stopPropagation()

    if (!availableQuantity || quantity + 1 > availableQuantity) return

    setQuantity(quantity + 1)
    dispatch(updateItemQuantityCart({ id, quantity: quantity + 1 }))
    setIsEditMode(true)
  }

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.stopPropagation()

    if (quantity > 1) {
      setQuantity(quantity - 1)
      dispatch(updateItemQuantityCart({ id, quantity: quantity - 1 }))
      setIsEditMode(true)
    } else {
      setQuantity(0)
      dispatch(clearItemFromCart({ id }))
      setIsEditMode(false)
    }
  }

  const handleChangeClick = (quantity: number) => {
    if (!availableQuantity || quantity > availableQuantity) return

    if (!quantity || quantity === undefined || quantity === null || quantity < 0) return

    setQuantity(quantity)
    dispatch(updateItemQuantityCart({ id, quantity }))
    setIsEditMode(true)
  }

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.stopPropagation()

    if (!isEditMode) {
      setQuantity(1)
      dispatch(addItemToCart({ item, quantity: 1 }))
      setIsEditMode(true)
    }
  }

  useEffect(() => {
    const item = getItem(id)
    if (item?.quantity) {
      setQuantity(item.quantity)
      setIsEditMode(true)
    } else {
      setIsEditMode(false)
    }

    const fetchAvailableQuantity = async () => {
      try {
        setIsLoading(true)
        const available_quantity = 0

        setAvailableQuantity(available_quantity)
      } catch (error) {
        error
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailableQuantity()
  }, [])

  return (
    <div className='flex flex-row xl:flex-col border-x-0 border-y xl:border xl:rounded-md w-full gap-2 sm:gap-4 xl:gap-10 px-4 pb-6 pt-4 xl:pb-10 xl:pt-10 justify-evenly xl:justify-start items-center place-items-center xl:items-stretch bg-white'>
      {/* Available Not */}
      {!isLoading && availableQuantity === 0 ? (
        <p className='text-neutral-700 text-right text-body-1 text-wrap'>
          این کالا فعلا موجود نیست اما می‌توانید جهت استعلام قیمت با ما در تماس باشید.
        </p>
      ) : (
        <div className='flex flex-row xl:flex-col xl:rounded-md w-full gap-2 sm:gap-4 xl:gap-10 justify-evenly xl:justify-start items-center place-items-center xl:items-stretch bg-white'>
          {/* Available Quantity */}
          <div className='hidden md:flex flex-row items-center bg-gray-100 rounded-lg px-4 py-2 xl:py-4 shadow-md xl:shadow-none gap-2 '>
            <h4 className='text-md md:text-lg text-gray-700'>موجودی: </h4>
            {isLoading ? (
              <span className='loading loading-ring text-success loading-xs'></span>
            ) : (
              <span className='text-md md:text-xl font-bold text-success'>{availableQuantity}</span>
            )}
            <h4 className='text-md md:text-lg text-neutral-600'>عدد</h4>
          </div>

          {/* Add To Basket */}
          <div className='flex flex-row justify-around items-center gap-0 md:gap-4 w-full flex-wrap'>
            {isEditMode ? (
              <div>
                <label className='flex input input-bordered items-center justify-end gap-2'>
                  <input
                    type='text'
                    className='grow max-w-6 sm:max-w-16 xl:max-w-screen-xl'
                    value={getItem(id)?.quantity}
                    onChange={e => {
                      handleChangeClick(+e.target.value)
                    }}
                  />
                  <button className='btn btn-circle btn-sm hover:text-primary' onClick={handleRemoveClick}>
                    <Minus />
                  </button>
                  <button className='btn btn-circle btn-sm hover:text-primary' onClick={handleAddClick}>
                    <PlusIcon />
                  </button>
                </label>
              </div>
            ) : (
              <button className='btn md:btn-wide btn-primary text-primary-content text-center' onClick={handleBtnClick}>
                <div className='flex flex-col gap-2'>
                  <div>افزودن به سبد خرید</div>
                  {/* Available Quantity */}
                  <div className='flex md:hidden flex-row items-center bg-gray-100 rounded-lg shadow-md xl:shadow-none gap-2 py-1 px-2'>
                    <h4 className='text-md md:text-lg text-gray-700'>موجودی: </h4>
                    {isLoading ? (
                      <span className='loading loading-ring text-success loading-xs'></span>
                    ) : (
                      <span className='text-md md:text-xl font-bold text-success'>{availableQuantity}</span>
                    )}
                    <h4 className='text-md md:text-lg text-neutral-600'>عدد</h4>
                  </div>
                </div>
              </button>
            )}

            {/* Pricing */}
            <div className='flex gap-1 text-primary text-2xl md:text-3xl justify-end'>
              <div className='flex flex-col'>
                {discount_percentage > 0 ? (
                  <div className='flex items-center justify-end w-full'>
                    <h5 className='line-through ml-1 text-lg text-neutral-300' data-testid='price-no-discount'>
                      {formatPrice(sale_price)}
                    </h5>
                    <div className='badge badge-primary' data-testid='discount-percentage'>
                      {Number(discount_percentage)}٪
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className='flex flex-row gap-2'>
                  <h3 data-testid='price-with-discount'>{formatPrice(sale_price_after_discount)}</h3>
                  <h3 className='text-2xl'>تومان</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderingCart
