'use client';

import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setBillingContact, setDeliveryContact } from '@/lib/store/features/cart/cartSlice';

import basicService, { Contact } from '@/services/basic.service';

const Default_Value: Partial<Contact> = {
  title: '',
  name: '',
  phone: '',
  mobile_phone: '',
  address: '',
  city: '',
  postal_code: '',
  national_code: '',
  economic_code: '',
};

interface ContactInfoManagerProps {
  onChange?: (contacts: Partial<Contact>[]) => void;
}

export default function ContactInfoManager(props: ContactInfoManagerProps) {
  // ** Props
  const { onChange } = props;

  // ** State
  const [contacts, setContacts] = useState<Partial<Contact>[]>([]);
  const [contact, setContact] = useState<Partial<Contact>>();
  const [contactId, setContactId] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [detectedChanges, setDetectedChanges] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ** Store
  const dispatch = useDispatch();

  //
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map/'), {
        loading: () => <p>درحال بارگذاری نقشه ...</p>,
        ssr: false,
      }),
    []
  );

  // ** Functions
  const fetchContacts = async () => {
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

  const validation = (): boolean => {
    if (!contact?.latitude || !contact?.longitude) {
      setErrorMessage('برای سهولت در حمل کالا، انتخاب آدرس دقیق از روی نقشه نیاز هست.');

      return false;
    }

    if (!contact?.title) {
      setErrorMessage('در ادامه خرید اگر آدرس شما عنوان داشته باشه، خیلی راحت تر میتونید انتخاب آن را مدیریت کنید.');

      return false;
    }

    if (!contact.name) {
      setErrorMessage('لطفا نام خود یا نام شرکت خود را وارد نمایید.');

      return false;
    }

    if (!contact.address) {
      setErrorMessage('لطفا آدرس کامل را وارد نمایید.');

      return false;
    }

    return true;
  };

  const handleSaveContact = async () => {
    if (!validation()) return;

    try {
      setIsLoading(true);
      if (isEditMode) {
        // Edit Contact
        if (contact?.id) {
          await basicService.editContact(contact.id, contact);
        }
      } else if (isCreateMode) {
        // Create New Contact
        if (contact) {
          await basicService.createContact(contact);
        }
      }

      const contacts = await basicService.getAllContact();
      if (contacts?.data?.length) {
        setContacts(contacts.data);
      }
      if (onChange) onChange(contacts.data);
    } catch (error) {
      // Handle error if needed
    } finally {
      setDetectedChanges(false);
      setIsEditMode(false);
      setIsCreateMode(false);
      setContactId(-1);
      setContact(Default_Value);
      setIsLoading(false);
      dispatch(setDeliveryContact(null));
      dispatch(setBillingContact(null));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
    setDetectedChanges(true);
  };

  const handleLocationChange = (newLocation: { lat: number; lng: number }) => {
    setContact(prev => ({
      ...prev,
      latitude: newLocation?.lat,
      longitude: newLocation?.lng,
    }));
    setDetectedChanges(true);
  };

  const handleOnSelectContact = (value: number) => {
    setIsEditMode(true);
    setIsCreateMode(false);
    setContactId(value);
    const result = contacts?.find(_ => _.id === value);
    setContact(result);
  };

  const handleCreateNewContact = () => {
    setIsEditMode(false);
    setIsCreateMode(true);
    setContactId(-1);
    setContact(Default_Value);
  };

  const onOpenModal = () => {
    fetchContacts();
    setIsEditMode(false);
    setIsCreateMode(false);
    setContactId(-1);
    setContact(Default_Value);
  };

  return (
    <div>
      <div
        onClick={() => {
          const dialog = document?.getElementById('id_modal') as HTMLDialogElement | null;
          dialog?.showModal();
          onOpenModal();
        }}
      >
        <div className='btn btn-outline btn-primary text-primary-content btn-wide transition duration-200 text-sm'>
          افزودن آدرس جدید و یا ویرایش
        </div>
      </div>

      <dialog id='id_modal' className='modal'>
        <div className='modal-box md:max-w-4xl'>
          <form method='dialog'>
            <div className='flex justify-between items-center'>
              <h3 className='font-bold text-lg'>آدرس ها</h3>
              <button className='btn btn-sm btn-circle btn-ghost'>✕</button>
            </div>
          </form>
          <div className='divider mt-2 mb-6'></div>
          {/* Loading Overlay */}
          {isLoading ? (
            <div className='flex justify-center w-full my-10'>
              <span className='loading loading-ring text-success loading-lg'></span>
            </div>
          ) : (
            <div className='w-full flex flex-col gap-2'>
              <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                <select
                  className='select select-bordered w-full md:w-auto'
                  value={contactId}
                  onChange={e => {
                    const value = +e.target.value;
                    if (value >= 0) handleOnSelectContact(value);
                  }}
                  disabled={isCreateMode || isEditMode}
                >
                  <option disabled value={-1}>
                    برای ویرایش، آدرس را از اینجا انتخاب کنید
                  </option>
                  {contacts.map(contact => (
                    <option key={contact.id} value={contact.id} className='text-sm'>
                      {`${contact.title} - ${contact.name}`}
                    </option>
                  ))}
                </select>
                <button
                  className='btn btn-primary btn-outline w-full md:w-auto'
                  onClick={() => handleCreateNewContact()}
                  disabled={isCreateMode || isEditMode}
                >
                  افزودن آدرس جدید
                </button>
              </div>

              {(isEditMode || isCreateMode) && (
                <div className=''>
                  <div className='flex flex-col md:flex-row gap-4'>
                    {/* Items */}
                    <div className='flex-grow flex flex-col items-center justify-between text-base-content gap-4'>
                      {/* Title */}
                      <label className='form-control w-full'>
                        <span className='text-sm font-medium text-gray-500 mb-1'>عنوان</span>
                        <input
                          type='text'
                          placeholder='آدرس خانه، شرکت و ...'
                          className='input input-bordered w-full text-lg'
                          name='title'
                          value={contact?.title || ''}
                          onChange={handleInputChange}
                        />
                      </label>

                      {/* Name */}
                      <label className='form-control w-full'>
                        <span className='text-sm font-medium text-gray-500 mb-1'>نام کامل / نام شرکت</span>
                        <input
                          type='text'
                          placeholder='نام کامل / نام شرکت'
                          className='input input-bordered w-full text-lg'
                          name='name'
                          value={contact?.name || ''}
                          onChange={handleInputChange}
                        />
                      </label>

                      {/* Phone */}
                      <label className='form-control w-full'>
                        <span className='text-sm font-medium text-gray-500 mb-1'>تلفن ثابت با پیش شماره</span>
                        <input
                          type='text'
                          placeholder='تلفن ثابت با پیش شماره'
                          className='input input-bordered w-full text-lg'
                          name='phone'
                          value={contact?.phone || ''}
                          onChange={handleInputChange}
                        />
                      </label>

                      {/* Mobile Phone */}
                      <label className='form-control w-full'>
                        <span className='text-sm font-medium text-gray-500 mb-1'>شماره موبایل</span>
                        <input
                          type='text'
                          placeholder='شماره موبایل'
                          className='input input-bordered w-full text-lg'
                          name='mobile_phone'
                          value={contact?.mobile_phone || ''}
                          onChange={handleInputChange}
                        />
                      </label>

                      {/* Address */}
                      <label className='form-control w-full'>
                        <span className='text-sm font-medium text-gray-500 mb-1'>آدرس کامل</span>
                        <input
                          type='text'
                          placeholder='آدرس کامل'
                          className='input input-bordered w-full text-lg md:col-span-2'
                          name='address'
                          value={contact?.address || ''}
                          onChange={handleInputChange}
                        />
                      </label>

                      {/* City */}
                      <label className='form-control w-full'>
                        <span className='text-sm font-medium text-gray-500 mb-1'>شهر</span>
                        <input
                          type='text'
                          placeholder='شهر'
                          className='input input-bordered w-full text-lg'
                          name='city'
                          value={contact?.city || ''}
                          onChange={handleInputChange}
                        />
                      </label>

                      {/* Postal Code */}
                      <label className='form-control w-full'>
                        <span className='text-sm font-medium text-gray-500 mb-1'>کد پستی</span>
                        <input
                          type='text'
                          placeholder='کد پستی'
                          className='input input-bordered w-full text-lg'
                          name='postal_code'
                          value={contact?.postal_code || ''}
                          onChange={handleInputChange}
                        />
                      </label>

                      {/* National Code */}
                      <label className='form-control w-full'>
                        <span className='text-sm font-medium text-gray-500 mb-1'>کد ملی / شناسه ملی</span>
                        <input
                          type='text'
                          placeholder='کد ملی / شناسه ملی'
                          className='input input-bordered w-full text-lg'
                          name='national_code'
                          value={contact?.national_code || ''}
                          onChange={handleInputChange}
                        />
                      </label>

                      {/* Economic Code */}
                      <label className='form-control w-full'>
                        <span className='text-sm font-medium text-gray-500 mb-1'>کد اقتصادی</span>
                        <input
                          type='text'
                          placeholder='کد اقتصادی'
                          className='input input-bordered w-full text-lg'
                          name='economic_code'
                          value={contact?.economic_code || ''}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>

                    {/* Map */}
                    <label className='form-control w-full md:max-w-96 text-base-content'>
                      <span className='text-sm font-medium text-gray-500 mb-1'>انتخاب آدرس از روی نقشه</span>
                      <div className='w-full h-96'>
                        <Map
                          location={{
                            lat: contact?.latitude || 35.7172,
                            lng: contact?.longitude || 51.3995,
                          }}
                          onLocationChange={handleLocationChange}
                        />
                      </div>
                    </label>
                  </div>

                  {/* Message */}
                  {errorMessage && (
                    <div className='text-error border border-error rounded-md text-center my-4 py-1'>
                      {errorMessage}
                    </div>
                  )}

                  {/* Actions */}
                  <div className='flex felx-row gap-10 mt-4'>
                    {/* Save Button */}
                    <button
                      onClick={handleSaveContact}
                      className='btn btn-secondary text-lg font-medium flex-grow'
                      disabled={isLoading || !detectedChanges}
                    >
                      {isEditMode && 'ویرایش'}
                      {isCreateMode && 'ذخیره'}
                    </button>
                    {/* Cancel Button */}
                    <button onClick={onOpenModal} className='btn btn-error text-lg font-medium'>
                      {isEditMode && 'لغو ویرایش'}
                      {isCreateMode && 'لغو افزودن'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
