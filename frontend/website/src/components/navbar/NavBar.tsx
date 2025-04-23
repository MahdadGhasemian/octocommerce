'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import AuthButton from '@/components/AuthButton'
import CartButton from '@/components/cart/CartButton'

import basicService, { Category, Product } from '@/services/basic.service'
import { encodeCategoryId, encodeCategoryName, encodeProductName } from '@/utils/name-encode-decode'
import { replacePersianNumbers } from '@/utils/number'

// import MenuItems from '@/components/navbar/MenuItems';
import Logo from '~/svg/Logo.svg'

const Navbar = () => {
  // ** State
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [productList, setProductList] = useState<Product[]>([])
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchIsActive, setSearchIsActive] = useState(false)

  // ** Functions
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timer)
      timer = setTimeout(() => func(...args), delay)
    }
  }

  const fetchResults = async (term: string) => {
    if (!term) {
      setProductList([])
      setCategoryList([])
      setShowDropdown(false)
      return
    }

    try {
      const fixedTerm = replacePersianNumbers(term)
      setIsLoading(true)
      const productFilters = [{ id: 'is_active', value: true, operator: '$eq' }]

      const [products, categories] = await Promise.all([
        basicService.getAllFastSearchProduct(10, 1, fixedTerm, productFilters).then(response => response.data),
        basicService.getAllFastSearchCategory(10, 1, fixedTerm).then(response => response.data)
      ])

      setProductList(products)
      setCategoryList(categories)
      setShowDropdown(true)
      setIsLoading(false)
    } catch (error) {
      error
    } finally {
      setIsLoading(false) // Hide loading indicator
    }
  }

  const debouncedFetchResults = useCallback(debounce(fetchResults, 500), [])

  // Fetch user info when the component mounts
  useEffect(() => {
    debouncedFetchResults(searchTerm)
  }, [searchTerm, debouncedFetchResults])

  return (
    <nav className='fixed top-0 left-0 w-full bg-white shadow-md z-40'>
      {/* Part 1: Search and User Logo */}
      <div className='flex flex-row justify-between items-center px-6 py-3 gap-4'>
        {/* Logo and Search input */}
        <div className='flex justify-between items-center gap-10 grow md:grow-1'>
          {/* Logo */}
          <div className='hidden sm:block'>
            <Link href='/'>
              {/* <Logo className='md:w-48 lg:w-64' /> */}
            </Link>
          </div>
          {/* Search input */}
          <div className='flex join-item grow'>
            {/* Search Label and Input */}
            <label className='input input-bordered input-secondary input-md border-opacity-20 flex items-center flex-grow lg:w-1/2 rounded-full sm:rounded-lg  bg-neutral-200 lg:bg-white'>
              <input
                type='text'
                className='text-neutral-400 px-10 grow'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onFocus={() => {
                  setSearchIsActive(true)
                  setShowDropdown(!!searchTerm)
                }}
                onBlur={e => {
                  // Prevent blur from hiding the dropdown if clicking inside it
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setTimeout(() => {
                      setSearchIsActive(false)
                      setSearchTerm('')
                      setShowDropdown(false)
                    }, 200)
                  }
                }}
              />

              <span className='absolute flex items-center gap-2 text-gray-500 pointer-events-none'>
                {/* Search Icon */}
                <button className='btn btn-circle btn-sm hover:text-primary btn-ghost'>
                  <Search size={18} className='text-neutral-400' />
                </button>

                {/* Search Text (e.g., "جستجو در") and Logo */}
                {!searchIsActive ? (
                  <div>
                    <div className='flex md:hidden gap-2 justify-center items-center place-items-center'>
                      <span className='whitespace-nowrap'>جستجو در</span>
                      {/* <Logo className='w-32' /> */}
                    </div>
                    <span className='hidden md:block whitespace-nowrap'>جستجو ...</span>
                  </div>
                ) : (
                  <div></div>
                )}
              </span>

              {/* Loading Progress Bar */}
              {isLoading && <progress className='progress progress-primary mx-1'></progress>}
            </label>

            {/* Dropdown for Search Results */}
            {showDropdown && (productList.length > 0 || categoryList.length > 0) && (
              <div
                className='absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50'
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div className='p-4'>
                  <h4 className='font-semibold mb-2 text-primary'>محصولات</h4>
                  <ul>
                    {productList.map(product => (
                      <li key={`product-search-item-${product.id}`} className='flex items-center gap-2 mb-2'>
                        <Image
                          key={`prodcut-search-image-${product.id}`}
                          src={product.image}
                          width={32}
                          height={32}
                          alt={product.name}
                          className='rounded-md object-contain  w-[32px] h-[32px]'
                          loading='lazy'
                          placeholder='blur'
                          blurDataURL='/images/empty-box.png'
                          layout='intrinsic'
                        />
                        <Link
                          href={`/product/${product.product_code}/${encodeProductName(product.name)}`}
                          className='hover:text-lg'
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <h4 className='font-semibold mt-4 mb-2 text-primary'>دسته بندی ها</h4>
                  <ul>
                    {categoryList.map(category => (
                      <li key={`category-search-item-${category.id}`} className='flex items-center gap-2 mb-2'>
                        <Link
                          href={`/search/${encodeCategoryId(String(category?.id))}/${encodeCategoryName(
                            category.name
                          )}`}
                          className='hover:text-lg'
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/*  */}
        <div className='hidden sm:flex gap-4 place-content-center items-center justify-center'>
          {/* Auth */}
          <AuthButton />
          {/* Cart */}
          <CartButton />
        </div>
      </div>

      {/* Part 2: Menu */}
      {/* <div id='menu' className='hidden md:block'>
        <MenuItems />
      </div> */}
    </nav>
  )
}

export default Navbar
