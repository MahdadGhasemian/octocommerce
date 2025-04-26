'use client';

import React, { useEffect, useState } from 'react';

import AddressInfo from '@/components/users/AddressInfo';
import AddressInfoManager from '@/components/users/AddressInfoManager';

import basicService, { Address } from '@/services/basic.service';

export default function Addresses() {
  // ** State
  const [addresses, setAddresses] = useState<Partial<Address>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ** Functions
  const fetchAddresses = async () => {
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

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className='flex flex-col items-start justify-between gap-4 xl:gap-10 w-full xl:pb-10 p-4'>
      <div className='ps-4 pt-4 flex xl:flex-col items-center xl:items-start gap-2 w-full'>
        <h2 className='text-xl font-bold'>آدرس ها</h2>
      </div>

      <AddressInfoManager />

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
        {addresses?.map(address => (
          <AddressInfo key={address.id} address={address} variant='card' />
        ))}
      </div>
    </div>
  );
}
