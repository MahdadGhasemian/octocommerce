'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setAuth } from '@/lib/store/features/authSlice';

import { SubmitButton } from '@/components/SubmitButton';

import authService from '@/services/auth.service';
import { fixedMobileNumber, persianToLatinDigits } from '@/utils/number';

export default function Page() {
  // ** Route
  const router = useRouter();

  // ** Store
  const dispatch = useDispatch();

  // ** State
  const [mobilePhone, setMobilePhone] = useState<string>('');
  const [verifyCode, setVerifyCode] = useState<string>('');
  const [hashedCode, setHashedCode] = useState<string>('');
  const [isVerifyStep, setIsVerifyStep] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsVerifyStep(false);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // ** Vars
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  // ** Functions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage('');
    setIsLoading(true);
    if (!isVerifyStep) {
      try {
        const hashedCode = await authService.sendOtp(fixedMobileNumber(mobilePhone));
        setHashedCode(hashedCode);
        setIsVerifyStep(true);
        setTimeLeft(120);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage('خطا در ارسال کد. لطفاً دوباره تلاش کنید.');
      }
    } else {
      try {
        const user = await authService.confirmOtp(
          fixedMobileNumber(mobilePhone),
          persianToLatinDigits(verifyCode),
          hashedCode
        );

        dispatch(setAuth(user));

        router.push('/');
      } catch (error) {
        setErrorMessage('کد تایید نادرست است. لطفاً دوباره تلاش کنید.');
        setVerifyCode('');
        setIsLoading(false);
      }
    }
  };

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsVerifyStep(false);
    setErrorMessage('');
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form
        className='flex flex-col w-full max-w-xs md:max-w-sm gap-4 px-10 py-20 rounded-md border shadow-md'
        onSubmit={handleSubmit}
      >
        {isVerifyStep && (
          <button
            type='button'
            className='btn btn-circle bg-transparent border-transparent shadow-none outline-none'
            onClick={handleBackClick}
          >
            <ArrowRight className='text-neutral-600' />
          </button>
        )}

        <h1 className='text-h4 text-neutral-900 text-right w-full mt-4'>
          {!isVerifyStep ? <span>ورود | ثبت‌نام</span> : <span>کد تایید را وارد کنید</span>}
        </h1>
        {!isVerifyStep && <p className='text-body-2 text-neutral-700 mt-4 text-right w-full'>سلام!</p>}
        <p className='text-body-2 text-neutral-700 mb-4 text-right w-full'>
          {!isVerifyStep ? (
            <span>لطفا شماره موبایل خود را وارد کنید</span>
          ) : (
            <span>
              <span>کد تایید برای شماره</span>
              <span>&nbsp;</span>
              <span>{mobilePhone}</span>
              <span>&nbsp;</span>
              <span>پیامک شد</span>
            </span>
          )}
        </p>
        {!isVerifyStep ? (
          <input
            type='text'
            className='input input-bordered w-full input-primary'
            placeholder='شماره موبایل خود را وارد کنید'
            id='mobilePhone'
            name='mobilePhone'
            value={mobilePhone}
            onChange={e => setMobilePhone(e.target.value)}
            required
          />
        ) : (
          <input
            type='text'
            className='input input-bordered w-full input-primary'
            placeholder='کد پیامک شده را وارد نمایید'
            id='verifyCode'
            name='verifyCode'
            value={verifyCode}
            onChange={e => setVerifyCode(e.target.value)}
            required
          />
        )}
        <p className='text-body-2 text-neutral-700 mb-4 text-center w-full'>
          {isVerifyStep && (
            <span>
              <span className='countdown'>{seconds}</span>:<span className='countdown'>{minutes}</span>
              <span>&nbsp;</span>
              <span>مانده تا دریافت مجدد کد</span>
            </span>
          )}
        </p>
        {errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>}
        <SubmitButton className='w-full' text={!isVerifyStep ? 'ورود' : 'تایید'} loadingText='' loading={isLoading} />
      </form>
    </div>
  );
}
