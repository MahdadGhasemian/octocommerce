'use client';

import { CheckIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  resetCart,
  selectCart,
  selectDeliveryCost,
  selectDeliveryMethod,
  selectDeliveryMethodAreaRule,
  selectPackagingCost,
  selectRoundAmount,
  selectTaxAmount,
  setCartSetting,
} from '@/lib/store/features/cart/cartSlice';
import { useRequireLogin } from '@/hooks/useRequireLogin';

import CartSteps from '@/components/cart/CartSteps';

import { siteConfig } from '@/configs/site';
import authService from '@/services/auth.service';
import basicService, { AddOrder, DeliveryPricingType, PaymentType } from '@/services/basic.service';
import { retryCreatePayment } from '@/services/payment-retry';
import { formatPriceToman } from '@/utils/priceFormatter';

export default function Page() {
  // ** Hooks
  const { ensureLoggedIn } = useRequireLogin();

  // ** Store
  const dispatch = useDispatch();
  const { items, subtotal, total, isEmpty, deliveryAddress, billingAddress } = useSelector(selectCart);
  const taxAmount = useSelector(selectTaxAmount);
  const roundAmount = useSelector(selectRoundAmount);
  const packagingCost = useSelector(selectPackagingCost);
  const deliveryCost = useSelector(selectDeliveryCost);
  const deliveryMethod = useSelector(selectDeliveryMethod);
  const deliveryMethodAreaRule = useSelector(selectDeliveryMethodAreaRule);

  // ** State
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSetToPayOnline, setIsSetToPayOnline] = useState(true);
  const [paymentError, setPaymentError] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(false);
  const [needToSetName, setNeedToSetName] = useState(false);
  const [sessage, setMessage] = useState<string>();

  // ** Vars
  const itemsCount = items.length;

  // ** Functions
  const handleOrderClick = async (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.stopPropagation();

    // Ensure the user is logged in
    if (!ensureLoggedIn()) {
      setMessage('نیاز به ورود مجدد است');
      return;
    }

    // Ensure the delivery address is selected
    if (!deliveryAddress || !deliveryAddress.id) {
      setMessage('آدرس حمل را انتخاب کنید');
      return;
    }

    // Ensure the delivery method is selected
    if (!deliveryMethod || !deliveryMethod.id) {
      setMessage('روش حمل را انتخاب کنید');
      return;
    }

    try {
      const allowable_to_online_payment = items.every(item => item.is_online_payment_allowed);
      setIsSetToPayOnline(allowable_to_online_payment);
      setPaymentError(false);
      setIsLoading(true);
      setOpenModal(true);

      // Order ==============================
      // Create order
      const orderData: AddOrder = {
        delivery_method_id: deliveryMethod.id,
        delivery_method_area_rule_area_name:
          deliveryMethod.delivery_pricing_type === DeliveryPricingType.SELECTED_AREA
            ? deliveryMethodAreaRule?.area_name
            : undefined,
        delivery_address_id: deliveryAddress.id,
        billing_address_id: billingAddress?.id,

        order_items: items
          .filter(item => item.id && item.quantity)
          .map(item => {
            return {
              product_id: +item.id,
              quantity: item.quantity,
            };
          }),
        discount_percentage: 0,
      };
      const order = await basicService.createOrder(orderData);

      dispatch(resetCart());

      // Payment ============================
      if (allowable_to_online_payment) {
        try {
          // Create Payment
          const paymentData = {
            order_id: order.id,
            amount: +order.total,
            payment_type: PaymentType.ONLINE,
          };

          const payment = await retryCreatePayment(paymentData);
          const redirect_url = payment?.redirect_url;

          if (redirect_url) {
            if (typeof window !== 'undefined') {
              window.location.href = redirect_url;
            }
          }
        } catch (error) {
          setPaymentError(true);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setOpenModal(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      setIsInitLoading(true);

      const [setting, user] = await Promise.all([basicService.getSetting(), authService.getInfo()]);

      dispatch(setCartSetting(setting));
      setNeedToSetName(user.need_to_set_name);

      setIsInitLoading(false);
    };

    load();
  }, []);

  return (
    <div>
      {openModal ? (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 text-center max-w-md w-full mx-4'>
            <div className='flex flex-col items-center'>
              {/*  */}
              {isSetToPayOnline && isLoading && (
                <p className='text-lg font-medium text-gray-800'>در حال انتقال به صفحه پرداخت...</p>
              )}
              {!isSetToPayOnline && isLoading && (
                <p className='text-base font-medium text-gray-800'>
                  لطفاً کمی صبر کنید. در حال پردازش اطلاعات سفارش هستیم.
                </p>
              )}
              {isLoading && <progress className='progress progress-primary w-full mt-8 mb-4'></progress>}
              {/*  */}
              {!isSetToPayOnline && !isLoading && !paymentError && (
                <>
                  <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4'>
                    <CheckIcon className='w-8 h-8 text-green-500' />
                  </div>
                  <p className='text-xl font-semibold text-gray-900 mb-2'>سفارش شما با موفقیت ثبت شد!</p>
                  <p className='text-sm text-gray-600 mb-4 leading-relaxed'>
                    محصولی که در سبد خرید شما قرار دارد، نیازمند بررسی موجودی توسط تیم ما است. این فرایند ممکن است کمی
                    زمان‌بر باشد. نتیجه بررسی موجودی و تایید سفارش شما از طریق پیامک اطلاع‌رسانی خواهد شد.
                  </p>
                  <p className='text-sm text-gray-600 mb-6 leading-relaxed'>
                    می‌توانید وضعیت سفارش خود را از بخش سفارش‌های من مشاهده و پیگیری کنید.
                  </p>
                  <Link href='/profile/orders'>
                    <button className='btn btn-secondary text-secondary-content btn-wide transition duration-200 text-sm'>
                      مشاهده سفارش‌های من
                    </button>
                  </Link>
                  <Link href='/'>
                    <button className='btn btn-primary btn-outline w-wide mt-6'>بازگشت به صفحه اصلی</button>
                  </Link>
                </>
              )}
              {/*  */}
              {paymentError && (
                <div className='text-center'>
                  <p className='text-lg font-medium text-error mb-8'>
                    مشکلی در انتقال به صفحه پرداخت پیش آمد. لطفاً با پشتیبانی تماس بگیرید یا سفارشات خود را بررسی کنید.
                  </p>
                  <div className='flex justify-center gap-4'>
                    <Link href={`tel:${siteConfig.supportPhoneNumber}`}>
                      <button className='btn btn-primary transition duration-200 text-sm'>تماس با پشتیبانی</button>
                    </Link>
                    <Link href='/profile/orders'>
                      <button className='btn btn-secondary text-secondary-content transition duration-200 text-sm'>
                        مشاهده سفارش‌های من
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : isInitLoading ? (
        <div className='flex flex-col justify-between items-center gap-4 w-full mt-20'>
          {/*  */}
          <p className='text-base font-medium text-gray-800'>لطفاً کمی صبر کنید. در حال آماده سازی سبد خرید هستیم.</p>
          <progress className='progress progress-primary w-1/2 mt-8 mb-4'></progress>
        </div>
      ) : (
        <div className='flex flex-col xl:flex-row justify-between items-start gap-4 w-full'>
          <div className='flex flex-col w-full items-center'>
            {/* Message Part */}
            <p className='text-lg font-medium text-error mb-8'>{sessage}</p>

            {/* Cart Steps */}
            <CartSteps needToSetName={needToSetName} />
          </div>

          {/*  */}
          {!isEmpty && (
            <div className='flex flex-col gap-4 w-full xl:w-96 border rounded-lg p-10'>
              {/* SubTotal */}
              <div className='flex justify-between gap-1 text-neutral-500 text-sm w-full'>
                <div>
                  <span>{'قیمت کالاها '}</span>
                  <span>{`(${itemsCount})`}</span>
                </div>
                <div>{formatPriceToman(subtotal)}</div>
              </div>
              {/* Packaging Cost */}
              <div className='flex justify-between gap-1 text-neutral-500 text-sm w-full'>
                <div>
                  <span>بسته بندی</span>
                </div>
                <div>{formatPriceToman(packagingCost)}</div>
              </div>
              {/* Delivery Cost */}
              <div className='flex justify-between gap-1 text-neutral-500 text-sm w-full'>
                <div>
                  <span>هزینه حمل</span>
                </div>
                <div>{formatPriceToman(deliveryCost)}</div>
              </div>
              {/* Tax */}
              <div className='flex justify-between gap-1 text-neutral-500 text-sm w-full'>
                <div>
                  <span>ارزش افزوده</span>
                </div>
                <div>{formatPriceToman(taxAmount)}</div>
              </div>
              {/* Rounding Amount */}
              <div className='flex justify-between gap-1 text-neutral-500 text-sm w-full'>
                <div>
                  <span>مبلغ رندینگ</span>
                </div>
                <div>{formatPriceToman(roundAmount)}</div>
              </div>
              {/* Total */}
              <div className='flex justify-between gap-1 text-base-content text-sm w-full'>
                <div>جمع سبد خرید</div>
                <div>{formatPriceToman(total)}</div>
              </div>
              <button
                className='btn xl:w-full btn-primary text-primary-content'
                onClick={handleOrderClick}
                disabled={itemsCount === 0 || !deliveryMethod}
              >
                تایید و تکمیل سفارش
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
