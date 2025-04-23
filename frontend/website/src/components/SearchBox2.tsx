'use client';

import * as React from 'react';

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

export default function SearchBox2() {
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

  const handleRatesCheckboxChange = (rate: number) => {
    setValues((prev) => {
      return {
        ...prev,
        selectedRates: prev.selectedRates.includes(rate)
          ? prev.selectedRates.filter((item) => +item !== +rate)
          : [...prev.selectedRates, +rate],
      };
    });
  };

  return (
    <div className='border-2 border-natural shadow-sm rounded-md w-full h-full px-4 pb-10'>
      <ul className='menu rounded-box me-10'>
        <li>
          <a>دسته بندی ها</a>
        </li>
        <li>
          <details open>
            <summary>Parent</summary>
            <ul>
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
              <li>
                <details open>
                  <summary>Parent</summary>
                  <ul>
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
      <div className='divider my-6'></div>
      <h3 className='mb-4'>بازه قیمتی</h3>
      <input
        type='range'
        min={0}
        max='100'
        value={values.priceValue}
        className='range range-xs range-primary'
        onChange={(e) => setValues({ ...values, priceValue: +e.target.value })}
      />
      <div className='divider my-6'></div>
      <h3 className='mb-4'>برند ها</h3>
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
      <div className='divider my-6'></div>
      <div className='me-20'>
        <div className='form-control'>
          <div className='flex flex-row'>
            <label className='label cursor-pointer gap-4'>
              <input
                type='checkbox'
                className='checkbox checkbox-primary'
                checked={values.onSale}
                onChange={(e) =>
                  setValues({ ...values, onSale: e.target.checked })
                }
              />
              <span className='label-text'>حراجی</span>
            </label>
          </div>
        </div>
        <div className='form-control'>
          <div className='flex flex-row'>
            <label className='label cursor-pointer gap-4'>
              <input
                type='checkbox'
                className='checkbox checkbox-primary'
                checked={values.inStock}
                onChange={(e) =>
                  setValues({ ...values, inStock: e.target.checked })
                }
              />
              <span className='label-text'>موجود</span>
            </label>
          </div>
        </div>
        <div className='form-control'>
          <div className='flex flex-row'>
            <label className='label cursor-pointer gap-4'>
              <input
                type='checkbox'
                className='checkbox checkbox-primary'
                checked={values.featured}
                onChange={(e) =>
                  setValues({ ...values, featured: e.target.checked })
                }
              />
              <span className='label-text'>ویژگی</span>
            </label>
          </div>
        </div>
      </div>
      <div className='divider my-6'></div>
      <h3 className='mb-4'>براساس امتیاز</h3>
      <div className='me-20'>
        {[0, 1, 2, 3, 4].map((rate) => {
          return (
            <div className='form-control' key={`rating-${rate}`}>
              <div className='flex flex-row'>
                <label className='label cursor-pointer gap-4'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-primary'
                    checked={values.selectedRates.includes(rate)}
                    onChange={() => handleRatesCheckboxChange(rate)}
                  />
                  <div className='rating'>
                    {[0, 1, 2, 3, 4].map((i) => {
                      return (
                        <input
                          key={`star-${i}`}
                          type='radio'
                          className='mask mask-star-2 bg-success'
                          defaultChecked={+rate === +i}
                        />
                      );
                    })}
                  </div>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
