'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import PriceRange from '@/components/PriceRange';
import CategorySearchBox from '@/components/search/CategorySearchBox';

import {
  encodeCategoryId,
  encodeCategoryName,
} from '@/utils/name-encode-decode';

interface Brand {
  name: string;
}

const brands: Brand[] = [
  { name: 'سامسونگ' },
  { name: 'اپل' },
  { name: 'شیاومی' },
  { name: 'ال جی' },
  { name: 'زیبا' },
];

interface Values {
  priceValue: number;
  selectedBrands: string[];
  onSale: boolean;
  inStock: boolean;
  featured: boolean;
  selectedRates: number[];
}

export default function SearchBoxFull() {
  const router = useRouter();

  const [values, setValues] = React.useState<Values>({
    priceValue: 40,
    selectedBrands: [],
    onSale: false,
    inStock: false,
    featured: false,
    selectedRates: [],
  });

  const handleCheckboxChange = (brandName: string) => {
    setValues((prev) => {
      return {
        ...prev,
        selectedBrands: prev.selectedBrands.includes(brandName)
          ? prev.selectedBrands.filter((name) => name !== brandName)
          : [...prev.selectedBrands, brandName],
      };
    });
  };

  return (
    <div className='flex flex-col border-2 border-natural shadow-sm rounded-md px-4 pb-10'>
      {/* Title */}
      <div className='collapse'>
        <input type='checkbox' />
        <div className='collapse-title font-medium'>
          <div className='text-subtitle-strong flex items-center'>فیلترها</div>
        </div>
      </div>
      <div className='divider opacity-50 my-0'></div>
      {/* Categories */}
      <CategorySearchBox
        onChange={(category) => {
          router.push(
            `/search/${encodeCategoryId(String(category?.id))}/${
              category?.id !== 1 && category?.name
                ? encodeCategoryName(category.name)
                : ''
            }`
          );
        }}
      />
      <div className='divider opacity-50 my-0'></div>
      {/* Brands */}
      <div className='collapse collapse-arrow'>
        <input type='checkbox' />
        <div className='collapse-title font-medium'>
          <div className='text-subtitle-strong flex items-center'>برند</div>
        </div>
        <div className='collapse-content'>
          <div className='me-20'>
            {brands.map((brand) => {
              return (
                <div className='form-control' key={brand.name}>
                  <div className='flex flex-row'>
                    <label className='label cursor-pointer gap-4'>
                      <input
                        type='checkbox'
                        className='checkbox checkbox-primary'
                        checked={values.selectedBrands.includes(brand.name)}
                        onChange={() => handleCheckboxChange(brand.name)}
                      />
                      <span className='label-text'>{brand.name}</span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='divider opacity-50 my-0'></div>
      {/* Price Range */}
      <div className='collapse collapse-arrow'>
        <input type='checkbox' />
        <div className='collapse-title font-medium'>
          <div className='text-subtitle-strong flex items-center'>
            محدوده قیمت
          </div>
        </div>
        <div className='collapse-content'>
          <div className='me-20 w-full pe-4'>
            <PriceRange initialMinValue={425429} initialMaxValue={1952587} />
          </div>
        </div>
      </div>
      <div className='divider opacity-50 my-0'></div>
      {/* In Stock */}
      <div className='collapse'>
        <div className='collapse-title font-medium'>
          <div>
            <div className='form-control w-52'>
              <label className='label cursor-pointer'>
                <span className='text-subtitle-strong flex items-center'>
                  فقط کالاهای موجود
                </span>
                <input
                  type='checkbox'
                  className='toggle toggle-primary'
                  checked={values.onSale}
                  onChange={(e) =>
                    setValues({ ...values, onSale: e.target.checked })
                  }
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
