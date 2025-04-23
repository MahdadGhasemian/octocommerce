'use client';

import * as React from 'react';

interface Values {
  priceValue: number;
  selectedBrands: string[];
  onSale: boolean;
  inStock: boolean;
  featured: boolean;
  selectedRates: number[];
}

export default function RatesFilter() {
  const [values, setValues] = React.useState<Values>({
    priceValue: 40,
    selectedBrands: [],
    onSale: false,
    inStock: false,
    featured: false,
    selectedRates: [],
  });

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
    <div className='flex flex-col border-2 border-natural shadow-sm rounded-md w-full h-full px-4 pb-10'>
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
