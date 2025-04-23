'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectBillingContact,
  selectDeliveryContact,
  setBillingContact,
  setDeliveryContact,
} from '@/lib/store/features/cart/cartSlice';

import Heading from '@/components/ui/heading';
import ContactInfoManager from '@/components/users/ContactInfoManager';
import ContactSelector from '@/components/users/ContactSelector';

import basicService, { Contact } from '@/services/basic.service';

export default function SelectContactInfo() {
  // ** Store
  const dispatch = useDispatch();
  const deliveryContact = useSelector(selectDeliveryContact);
  const billingContact = useSelector(selectBillingContact);

  // ** State
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState<Partial<Contact>[]>([]);

  // ** Functions
  const handleSelectDeliveryContactId = (id: number) => {
    const delivery = contacts.find(_ => _.id === id);

    if (delivery) dispatch(setDeliveryContact(delivery));
    else dispatch(setDeliveryContact(null));
  };

  const handleSelectBillingContactId = (id: number) => {
    const billingContact = contacts.find(_ => _.id === id);
    if (billingContact) dispatch(setBillingContact(billingContact));
    else dispatch(setBillingContact(null));
  };

  // Fetch when the component mounts
  useEffect(() => {
    const fetchContact = async () => {
      try {
        setIsLoading(true);
        const result = await basicService.getAllContact();
        if (result?.data?.length) {
          setContacts(result.data);
        }
      } catch (error) {
        error;
      } finally {
        setIsLoading(false);
      }
    };

    fetchContact();
  }, []);

  return (
    <div className='flex flex-col items-start justify-between text-base-content gap-4 xl:gap-10 border rounded-lg w-full p-4 md:p-10'>
      <div className='flex flex-col md:flex-row items-center justify-between w-full gap-4'>
        <Heading variant='titleMedium' className=''>
          انتخاب آدرس‌ها
        </Heading>

        <ContactInfoManager onChange={setContacts} />
      </div>

      {/* Loading Overlay */}
      {isLoading ? (
        <div className='flex justify-center w-full my-20'>
          <span className='loading loading-ring text-success loading-lg'></span>
        </div>
      ) : (
        <div className='w-full flex gap-4 flex-col'>
          {/* Delivery Contact */}
          <div className='border rounded-lg p-4 md:p-10'>
            <Heading variant='titleMedium'>آدرس تحویل</Heading>
            <div className='w-full flex flex-col gap-2'>
              <ContactSelector
                contacts={contacts}
                onSelected={handleSelectDeliveryContactId}
                defaultContactId={deliveryContact?.id}
              />
            </div>
          </div>

          {/* Billing Contact */}
          <div className='border rounded-lg p-4 md:p-10'>
            <Heading variant='titleMedium'>آدرس صورتحساب</Heading>
            <div className='w-full flex flex-col gap-2'>
              <ContactSelector
                contacts={contacts}
                onSelected={handleSelectBillingContactId}
                defaultContactId={billingContact?.id}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
