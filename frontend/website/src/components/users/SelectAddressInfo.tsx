'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectBillingAddress,
  selectDeliveryAddress,
  setBillingAddress,
  setDeliveryAddress,
} from '@/lib/store/features/cart/cartSlice';

import Heading from '@/components/ui/heading';
import AddressInfoManager from '@/components/users/AddressInfoManager';
import AddressSelector from '@/components/users/AddressSelector';

import basicService, { Address } from '@/services/basic.service';

export default function SelectAddressInfo() {
  // ** Store
  const dispatch = useDispatch();
  const deliveryAddress = useSelector(selectDeliveryAddress);
  const billingAddress = useSelector(selectBillingAddress);

  // ** State
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState<Partial<Address>[]>([]);

  // ** Functions
  const handleSelectDeliveryAddressId = (id: number) => {
    const delivery = addresses.find(_ => _.id === id);

    if (delivery) dispatch(setDeliveryAddress(delivery));
    else dispatch(setDeliveryAddress(null));
  };

  const handleSelectBillingAddressId = (id: number) => {
    const billingAddress = addresses.find(_ => _.id === id);
    if (billingAddress) dispatch(setBillingAddress(billingAddress));
    else dispatch(setBillingAddress(null));
  };

  // Fetch when the component mounts
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setIsLoading(true);
        const result = await basicService.getAllAddress();
        if (result?.data?.length) {
          setAddresses(result.data);
        }
      } catch (error) {
        error;
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddress();
  }, []);

  return (
    <div className='flex flex-col items-start justify-between text-base-content gap-4 xl:gap-10 border rounded-lg w-full p-4 md:p-10'>
      <div className='flex flex-col md:flex-row items-center justify-between w-full gap-4'>
        <Heading variant='titleMedium' className=''>
          انتخاب آدرس‌ها
        </Heading>

        <AddressInfoManager onChange={setAddresses} />
      </div>

      {/* Loading Overlay */}
      {isLoading ? (
        <div className='flex justify-center w-full my-20'>
          <span className='loading loading-ring text-success loading-lg'></span>
        </div>
      ) : (
        <div className='w-full flex gap-4 flex-col'>
          {/* Delivery Address */}
          <div className='border rounded-lg p-4 md:p-10'>
            <Heading variant='titleMedium'>آدرس تحویل</Heading>
            <div className='w-full flex flex-col gap-2'>
              <AddressSelector
                addresses={addresses}
                onSelected={handleSelectDeliveryAddressId}
                defaultAddressId={deliveryAddress?.id}
              />
            </div>
          </div>

          {/* Billing Address */}
          <div className='border rounded-lg p-4 md:p-10'>
            <Heading variant='titleMedium'>آدرس صورتحساب</Heading>
            <div className='w-full flex flex-col gap-2'>
              <AddressSelector
                addresses={addresses}
                onSelected={handleSelectBillingAddressId}
                defaultAddressId={billingAddress?.id}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
