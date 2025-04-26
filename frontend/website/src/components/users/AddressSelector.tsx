'use client';

import React, { useEffect, useState } from 'react';

import AddressInfo from '@/components/users/AddressInfo';

import { Address } from '@/services/basic.service';

type AddressSelectorProps = {
  label?: string;
  addresses: Partial<Address>[];
  onSelected?: (addressId: number) => void;
  defaultAddressId?: number;
};

export default function AddressSelector(props: AddressSelectorProps) {
  // ** Props
  const { label, addresses, onSelected, defaultAddressId } = props;

  // ** State
  const [selectedAddressId, setSelectedAddressId] = useState<number>(-1);

  // ** Functions
  const handleAddressSelected = (addressId: number) => {
    setSelectedAddressId(addressId);
    if (onSelected) onSelected(addressId);
  };

  useEffect(() => {
    if (defaultAddressId) {
      setSelectedAddressId(defaultAddressId);
    }
  }, [defaultAddressId]);

  return (
    <div className='w-full flex flex-col justify-center items-start gap-4'>
      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text'>{label}</span>
        </div>
        <select
          className='select select-bordered'
          value={selectedAddressId}
          onChange={e => handleAddressSelected(+e.target.value)}
        >
          <option value={-1}>یک آدرس انتخاب نمایید</option>
          {addresses.map(address => (
            <option key={address.id} value={address.id} className='text-sm'>
              {address.title}
            </option>
          ))}
        </select>
      </label>
      <AddressInfo address={addresses.find(_ => _.id === selectedAddressId)} variant='short' />
    </div>
  );
}
