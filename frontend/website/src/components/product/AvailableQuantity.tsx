'use client';

import { useEffect, useState } from 'react';

import basicService from '@/services/basic.service';

interface Props {
  product_id: number;
  onAvailableQuantityChange: (quantity: number | null) => void;
}

const AvailableQuantity = (data: Props) => {
  // ** Props
  const { product_id, onAvailableQuantityChange } = data;

  // ** State
  const [availableQuantity, setAvailableQuantity] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAvailableQuantity = async () => {
      try {
        setIsLoading(true);
        const available_quantity  = 0;

        setAvailableQuantity(available_quantity);
        onAvailableQuantityChange(available_quantity);
      } catch (error) {
        error;
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableQuantity();
  }, [product_id]);

  return (
    <div className='flex flex-row items-center bg-gray-100 rounded-lg px-4 py-2 xl:py-4 shadow-md xl:shadow-none gap-2 '>
      {!isLoading && availableQuantity === 0 ? (
        <p className='text-neutral-700 text-right text-body-1 text-wrap'>
          این کالا فعلا موجود نیست اما می‌توانید جهت استعلام قیمت با ما در تماس
          باشید.
        </p>
      ) : (
        <>
          <h4 className='text-md md:text-lg text-gray-700'>موجودی: </h4>
          {isLoading ? (
            <span className='loading loading-ring text-success loading-xs'></span>
          ) : (
            <span className='text-md md:text-xl font-bold text-success'>
              {availableQuantity}
            </span>
          )}
          <h4 className='text-md md:text-lg text-neutral-600'>عدد</h4>
        </>
      )}
    </div>
  );
};

export default AvailableQuantity;
