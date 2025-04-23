'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setAuth } from '@/lib/store/features/authSlice';

import { DefaultFirstName, DefaultLastName } from '@/constants';
import authService, { User } from '@/services/auth.service';

export default function ProfileManage() {
  // ** State
  const [userInfo, setUserInfo] = useState<Partial<User>>();
  const [isLoading, setIsLoading] = useState(true);
  const [detectedChanges, setDetectedChanges] = useState(false);

  // ** Store
  const dispatch = useDispatch();

  // ** Functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
    setDetectedChanges(true);
  };

  const handleSaveInfo = async () => {
    try {
      setIsLoading(true);
      if (userInfo) {
        const updatedUser = await authService.saveInfo(userInfo);
        setUserInfo(updatedUser);
        dispatch(setAuth(updatedUser));
      }
      setIsLoading(false);
    } catch (error) {
      error;
    }
  };

  // Fetch user info when the component mounts
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const user = await authService.getInfo();

        const first_name = user.first_name === DefaultFirstName ? '' : user.first_name;
        const last_name = user.last_name === DefaultLastName ? '' : user.last_name;

        setUserInfo({
          first_name: first_name || '',
          last_name: last_name || '',
          mobile_phone: user.mobile_phone || '',
          need_to_set_name: user.need_to_set_name || false,
        });
        setIsLoading(false);
      } catch (error) {
        error;
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className='flex flex-col items-center justify-between text-base-content gap-4 xl:gap-10 w-full xl:pb-10 p-4'>
      <div className='ps-4 pt-4 flex xl:flex-col items-center xl:items-start gap-2 w-full'>
        <h2 className='text-xl font-bold'>مشخصات کاربری</h2>
      </div>

      {userInfo?.need_to_set_name && (
        <h3 className='text-base font-semibold text-primary leading-relaxed rtl'>
          برای تکمیل روند سفارش و سهولت در ارسال و پیگیری آن، لطفاً نام و نام خانوادگی یا نام شرکت را تکمیل نمایید.
        </h3>
      )}

      {isLoading ? (
        <div className='flex w-full justify-center items-center mt-10'>
          <progress className='progress progress-primary w-56'></progress>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2'>
          {/*  */}
          <label className='form-control w-full'>
            <span className='text-md font-medium text-gray-500 mb-1'>نام / نام شرکت</span>
            <input
              type='text'
              placeholder='نام / نام شرکت'
              className='input input-bordered w-full text-lg'
              name='first_name'
              value={userInfo?.first_name || ''}
              onChange={handleInputChange}
            />
          </label>

          {/*  */}
          <label className='form-control w-full'>
            <span className='text-md font-medium text-gray-500 mb-1'>نام خانوادگی</span>
            <input
              type='text'
              placeholder='نام خانوادگی'
              className='input input-bordered w-full text-lg'
              name='last_name'
              value={userInfo?.last_name || ''}
              onChange={handleInputChange}
            />
          </label>

          {/*  */}
          <label className='form-control w-full'>
            <span className='text-md font-medium text-gray-500 mb-1'>شماره موبایل</span>
            <input
              type='text'
              placeholder='شماره موبایل'
              className='input input-bordered w-full text-lg text-right'
              name='mobile_phone'
              disabled
              value={userInfo?.mobile_phone?.replace('+98', '0') || ''}
              dir='ltr'
            />
          </label>

          {/* Save Button */}
          <button
            onClick={handleSaveInfo}
            className='btn btn-secondary mt-4 w-full text-lg font-medium tracking-wide md:col-span-2'
            disabled={!detectedChanges}
          >
            ذخیره
          </button>
        </div>
      )}
    </div>
  );
}
