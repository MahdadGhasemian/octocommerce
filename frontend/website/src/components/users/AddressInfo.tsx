'use client';

import React from 'react';

import Map from '@/components/map';

import { Address } from '@/services/basic.service';

interface AddressInfoProps {
  address?: Partial<Address>;
  variant: 'detail' | 'short' | 'card';
}

export default function AddressInfo(props: AddressInfoProps) {
  // ** Props
  const { address, variant = 'detail' } = props;

  const renderField = ({ label, value, fullWidth }: { label: string; value?: string; fullWidth?: boolean }) => (
    <div className={`flex flex-col gap-1 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <span className='text-sm font-medium text-gray-500'>{label}</span>
      <div className='p-2 rounded-md border bg-gray-100 text-base text-gray-700 min-h-[40px] flex items-center'>
        {value || <span className='text-gray-400'>-</span>}
      </div>
    </div>
  );

  return (
    <div>
      {variant === 'short' ? (
        <div className='flex flex-col gap-1'>
          <div>{address?.title}</div>
          <div>{address?.address}</div>
          <div>
            <span>کد پستی :‌ </span>
            {address?.postal_code}
          </div>
          <div>
            <span>کد ملی : </span>
            {address?.national_code}
          </div>
        </div>
      ) : variant === 'detail' ? (
        <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2'>
          {/* Title */}
          {renderField({ label: 'عنوان', value: address?.title })}
          {/* Phone */}
          {renderField({
            label: 'تلفن ثابت با پیش شماره',
            value: address?.phone,
          })}
          {/* Mobile Phone */}
          {renderField({ label: 'شماره موبایل', value: address?.mobile_phone })}
          {/* Address (Full Width) */}
          {renderField({
            label: 'آدرس کامل',
            value: address?.address,
            fullWidth: true,
          })}
          {/* City */}
          {renderField({ label: 'شهر', value: address?.city })}
          {/* Postal Code */}
          {renderField({ label: 'کد پستی', value: address?.postal_code })}
          {/* National Code */}
          {renderField({
            label: 'کد ملی / شناسه ملی',
            value: address?.national_code,
          })}
          {/* Economic Code */}
          {renderField({ label: 'کد اقتصادی', value: address?.economic_code })}
        </div>
      ) : (
        <div className='card bg-base-100 w-full shadow-xl flex flex-col justify-between border'>
          <div className='card-body flex-grow'>
            <h2 className='card-title'>{address?.title}</h2>
            <p className={`${address?.address ? '' : 'invisible'}`}>{address?.address || 'Placeholder Address'}</p>
          </div>
          <figure className='flex-shrink-0'>
            {/* Map */}
            <div className='w-full h-96 z-40'>
              <Map
                location={{
                  lat: address?.latitude || 35.7172,
                  lng: address?.longitude || 51.3995,
                }}
                scrollWheelZoom={false}
                locationAsCenter={true}
                readOnly={true}
                title={address?.title}
              />
            </div>
          </figure>
        </div>
      )}
    </div>
  );
}
