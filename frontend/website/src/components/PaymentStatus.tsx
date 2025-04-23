'use client';

import { CheckCircle, X } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type PaymentStatusProps = {
  status?: 'success' | 'error';
  message?: string;
};

const PaymentStatus: React.FC<PaymentStatusProps> = ({ status, message }) => {
  // ** Hooks
  const searchParams = useSearchParams();

  // Extract status and message from query if not passed as props
  const queryStatus = searchParams.get('status') as 'success' | 'error';
  const queryMessage = searchParams.get('message') as string;
  const order_id = searchParams.get('order_id') as string;
  const payment_order_id = searchParams.get('payment_order_id') as string;
  const amount = searchParams.get('amount') as string;
  const transaction_id = searchParams.get('transaction_id') as string;
  const retrival_ref_number = searchParams.get('retrival_ref_number') as string;

  const displayStatus = status || queryStatus;
  const displayMessage =
    message ||
    queryMessage ||
    (displayStatus === 'success'
      ? 'پرداخت با موفقیت انجام شد.'
      : 'روند پرداخت با خطایی مواجه شد!');

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='max-w-xl rounded-lg bg-white py-10 px-14 shadow-md'>
        {displayStatus === 'success' ? (
          <div className='text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600'>
              <CheckCircle size={32} />
            </div>
            <h2 className='text-2xl font-semibold text-green-600'>
              پرداخت موفق
            </h2>
            <p className='mt-2 text-gray-600'>{displayMessage}</p>

            <div className='mt-4 text-sm space-y-2'>
              <p>
                <strong>شماره سفارش:</strong> {order_id}
              </p>
              <p>
                <strong>شماره پرداخت:</strong> {payment_order_id}
              </p>
              <p>
                <strong>مبلغ:</strong> {amount} تومان
              </p>
              {transaction_id && (
                <p>
                  <strong>کد تراکنش:</strong> {transaction_id}
                </p>
              )}
              {retrival_ref_number && (
                <p>
                  <strong>شماره مرجع:</strong> {retrival_ref_number}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className='text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600'>
              <X size={32} />
            </div>
            <h2 className='text-2xl font-semibold text-red-600'>
              پرداخت ناموفق
            </h2>
            <p className='mt-2 text-gray-600'>{displayMessage}</p>
          </div>
        )}
        <Link href='/profile/orders'>
          <button className='btn btn-secondary text-secondary-content w-full mt-14'>
            سفارش ها
          </button>
        </Link>
        <Link href='/'>
          <button className='btn btn-primary btn-outline w-full mt-6'>
            بازگشت به صفحه اصلی
          </button>
        </Link>
        {queryStatus === 'success' && (
          <p className='text-neutral-500 text-xs mt-4 mb-3 w-full text-justify'>
            پرداخت شما با موفقیت انجام شد. سفارش خود را می‌توانید از قسمت{' '}
            <Link href='/profile/orders'>
              <span className='font-bold text-blue-600 hover:text-blue-800 transition-colors'>
                سفارش‌ها
              </span>
            </Link>{' '}
            پیگیری نمایید.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
