'use client';

import { Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useRequireLogin } from '@/hooks/useRequireLogin';

import CopyToClipboard from '@/components/CopyToClipboard';
import OrderEmpty from '@/components/OrderEmpty';
import Heading from '@/components/ui/heading';

import basicService, { DeliveryType, Order, PaymentType } from '@/services/basic.service';
import { retryCreatePayment } from '@/services/payment-retry';
import { formatPrice } from '@/utils/priceFormatter';

import BaleLogo from '~/svg/BaleLogo.svg';
import TelegramLogo from '~/svg/TelegramLogo.svg';
import WhatsappLogo from '~/svg/WhatsappLogo.svg';

type TAB = {
  id: string;
  shortTitle: string;
  title: string;
  filter: string;
  filterQuery: string;
  emptyText: string;
};

const tabs: TAB[] = [
  {
    id: 'tab1',
    shortTitle: 'جاری',
    title: 'جاری',
    filter: 'pending,confirmed',
    filterQuery: '$in',
    emptyText: 'هنوز هیچ سفارشی ندادید',
  },
  {
    id: 'tab2',
    shortTitle: 'تحویل',
    title: 'تحویل شده',
    filter: 'completed',
    filterQuery: '$eq',
    emptyText: '',
  },
  {
    id: 'tab3',
    shortTitle: 'مرجوع',
    title: 'مرجوع شده',
    filter: 'cancelled',
    filterQuery: '$eq',
    emptyText: '',
  },
  {
    id: 'tab4',
    shortTitle: 'لغو',
    title: 'لغو شده',
    filter: 'rejected',
    filterQuery: '$eq',
    emptyText: '',
  },
];

const paymentInfo = {
  accountName: 'بانک',
  branchName: '',
  customerName: 'نام شرکت',
  accountNumber: '1234567890',
  shebaNumber: 'IR12345 000000 1234567890',
  shebaNumberToCopy: 'IR123450000001234567890',
};

const supportInfo = {
  phoneNumber: '02112345678',
  mobilePhoneSale1: '09129632744',
  mobilePhoneSale2: '09129632744',
  mobilePhoneSupport1: '09129632744',
  email: 'info@octocommerce.ir',
  telegramUsername: 'octocommerce',
  whatsappPhone: '989129632744',
  whatsappText: '',
  baleUsernmae: 'octocommerce',
};

const DeliveryTypeMap = new Map<DeliveryType, string>([
  [DeliveryType.POST_NORAMAL, 'پست عادی'],
  [DeliveryType.POST_FAST, 'پست پیشتاز'],
  [DeliveryType.TIPAX, 'تی پاکس'],
  [DeliveryType.RIDER, 'پیک'],
  [DeliveryType.SELF_PICKUP, 'تحویل حضوری'],
]);

export default function Page() {
  // ** Hooks
  const { isLoggedIn, ensureLoggedIn } = useRequireLogin();

  // ** State
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [paymentLoadingId, setPaymentLoadingId] = useState<number | null>(null);

  // ** Functions
  const fetchOrders = async (tab: TAB) => {
    setLoading(true);
    try {
      const filters = [{ id: 'order_status', value: tab.filter, operator: tab.filterQuery }];

      setActiveTab(tab);
      const response = await basicService.getAllOrder(100, 1, undefined, filters);
      setOrders(response.data);
    } finally {
      setLoading(false);
    }
  };

  const isOrderOnlinePayable = (order: Order) => {
    return order.order_items.every(item => item.product.is_online_payment_allowed);
  };

  useEffect(() => {
    if (isLoggedIn) fetchOrders(activeTab);
  }, [activeTab, isLoggedIn]);

  useEffect(() => {
    // Ensure the user is logged in
    if (!ensureLoggedIn()) {
      return;
    }
  }, []);

  const handlePayment = async (order: Order) => {
    // Ensure the user is logged in
    if (!ensureLoggedIn()) {
      return;
    }

    try {
      setPaymentLoadingId(order.id);

      // Create Payment
      const paymentData = {
        order_id: order.id,
        amount: +order.total,
        payment_type: PaymentType.ONLINE,
      };

      const payment = await retryCreatePayment(paymentData);
      const redirect_url = payment?.redirect_url;

      setPaymentLoadingId(null);

      if (redirect_url) {
        if (typeof window !== 'undefined') {
          window.location.href = redirect_url;
        }
      }
    } catch (error) {
      setPaymentLoadingId(null);
    }
  };

  return (
    <div className='flex flex-col items-start justify-between text-base-content gap-4 xl:gap-10 border rounded-lg w-full xl:pb-10'>
      {/* Title */}
      <div className='ps-4 pt-4 flex xl:flex-col items-center xl:items-start gap-2 w-full select-none'>
        <Heading variant='titleMedium' className=''>
          تاریخچه سفارشات
        </Heading>
      </div>

      {/* Note */}
      <div className='flex flex-col gap-2 justify-center items-start w-full select-none'>
        {/* Bank Account Info */}
        <div className='flex flex-col sm:flex-row flex-wrap gap-2 px-4 items-start justify-start w-full'>
          <CopyToClipboard textToCopy={paymentInfo.accountNumber} defaultResultText='شماره حساب کپی شد!'>
            <div className='flex flex-row gap-2 justify-center items-center text-nowrap'>
              <span className='text-sm text-neutral-400'>شماره حساب:</span>
              {paymentInfo.accountNumber}
            </div>
          </CopyToClipboard>
          <CopyToClipboard textToCopy={paymentInfo.shebaNumberToCopy} defaultResultText='شماره شبا کپی شد!'>
            <div className='flex flex-row gap-2 justify-center items-center text-nowrap'>
              <span className='text-sm text-neutral-400'>شماره شبا:</span>
              {paymentInfo.shebaNumber}
            </div>
          </CopyToClipboard>
          <div className='flex flex-row gap-2 justify-center items-center text-nowrap'>
            <span className='text-sm text-neutral-400'>نزد:</span>
            {paymentInfo.accountName}
          </div>
          <div className='flex flex-row gap-2 justify-center items-center text-nowrap'>
            <span className='text-sm text-neutral-400'>شعبه:</span>
            {paymentInfo.branchName}
          </div>
          <div className='flex flex-row gap-2 justify-center items-center text-nowrap'>
            <span className='text-sm text-neutral-400'>به نام:</span>
            {paymentInfo.customerName}
          </div>
        </div>
        {/* Support Info */}
        <div className='flex flex-col sm:flex-row flex-wrap gap-2 border-b px-4 pb-4 items-start sm:items-center justify-start w-full'>
          <CopyToClipboard textToCopy={supportInfo.email} defaultResultText='آدرس ایمیل کپی شد!'>
            <div className='flex flex-row gap-2 justify-center items-center text-nowrap'>
              <span className='text-sm text-neutral-400'>ایمیل:</span>
              {supportInfo.email}
            </div>
          </CopyToClipboard>
          <CopyToClipboard textToCopy={supportInfo.phoneNumber} defaultResultText='شماره تلفن کپی شد!'>
            <div className='flex flex-row gap-2 justify-center items-center text-nowrap'>
              <span className='text-sm text-neutral-400'>تلفن پشتیبانی:</span>
              {supportInfo.phoneNumber}
            </div>
          </CopyToClipboard>

          <CopyToClipboard
            textToCopy={supportInfo.mobilePhoneSale1.replaceAll(' ', '')}
            defaultResultText='شماره موبایل کپی شد!'
          >
            <div className='flex flex-row gap-2 justify-center items-center text-nowrap'>
              <span className='text-sm text-neutral-400'>شماره موبایل پشتیبانی :</span>
              <span dir='ltr'>{supportInfo.mobilePhoneSale1}</span>
            </div>
          </CopyToClipboard>

          <div className='flex flex-row gap-2 justify-center items-center text-nowrap'>
            <a href={`https://wa.me/${supportInfo.whatsappPhone}`} target='_blank' rel='noopener noreferrer'>
              <WhatsappLogo className='w-12 h-12 cursor-pointer' />
            </a>
            <a href={`https://t.me/${supportInfo.telegramUsername}`} target='_blank' rel='noopener noreferrer'>
              <TelegramLogo className='w-12 h-12 cursor-pointer' />
            </a>
            <a href={`https://ble.ir/${supportInfo.baleUsernmae}`} target='_blank' rel='noopener noreferrer'>
              <BaleLogo className='w-9 h-9 cursor-pointer' />
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='w-full'>
        {/* Tab headers */}
        <div role='tablist' className='tabs tabs-bordered w-full flex'>
          {tabs.map(tab => (
            <div key={tab.id}>
              <input
                type='radio'
                name={tab.title}
                role='tab'
                className='hidden'
                id={tab.id}
                checked={activeTab.id === tab.id}
                onChange={() => setActiveTab(tab)}
              />
              <label
                htmlFor={tab.id}
                className={`tab-label cursor-pointer py-2 px-4 w-full text-center border-0 border-b-2 text-nowrap ${
                  activeTab.id === tab.id ? 'border-primary ' : 'text-neutral-400'
                }`}
              >
                <span className='sm:hidden'>{tab.shortTitle}</span>
                <span className='hidden sm:inline'>{tab.title}</span>
              </label>
            </div>
          ))}
        </div>

        {/* Tab content */}
        <div role='tabpanel' className='p-10 flex flex-col gap-4'>
          {loading ? (
            // Loading
            <div className='flex w-full justify-center items-center mt-10'>
              <progress className='progress progress-primary w-56'></progress>
            </div>
          ) : orders?.length ? (
            orders?.map(order => (
              <div key={`order-${order.id}`}>
                {paymentLoadingId === order.id ? (
                  <div className='w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 py-10'>
                    <div className='bg-white rounded-lg shadow-lg p-6  text-center'>
                      <p className='text-lg font-medium text-gray-800 mb-4'>در حال انتقال به صفحه پرداخت...</p>
                      <p className='text-sm text-gray-500 mb-6 text-nowrap'>
                        لطفاً کمی صبر کنید. در حال پردازش اطلاعات شما هستیم.
                      </p>
                      <progress className='progress progress-primary w-full'></progress>
                    </div>
                  </div>
                ) : (
                  // Orders
                  <div className='flex flex-col justify-items-center gap-0 border rounded-md'>
                    {/* Short Order Info */}
                    <div className='flex flex-col md:flex-row gap-2 md:gap-10 border-b p-4 items-end md:items-center justify-between'>
                      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 justify-start w-full sm:w-auto'>
                        {/* Order Code */}
                        <div>
                          <span className='text-sm text-neutral-400'>{'کد سفارش '}</span>
                          {order.order_invoice_number}
                        </div>
                        {/* Total */}
                        <div>
                          <span className='text-sm text-neutral-400'>{'مبلغ '}</span>
                          <span className=''>
                            {formatPrice(order.total)}
                            <span className='text-sm'>{' تومان'}</span>
                          </span>
                        </div>
                        {/* Is Paid */}
                        <div>
                          <span className='text-sm text-neutral-400'>{'وضعیت پرداخت '}</span>
                          {order.is_paid ? (
                            <span className='text-success font-bold'>پرداخت شده</span>
                          ) : (
                            <span className='text-error font-bold'>پرداخت نشده</span>
                          )}
                        </div>
                        {/* Delivery Method */}
                        <div>
                          <span className='text-sm text-neutral-400'>{'روش ارسال '}</span>
                          {DeliveryTypeMap.get(order.delivery?.delivery_type)}
                        </div>
                      </div>
                      <div className='flex flex-row gap-4 grow w-full sm:w-auto justify-end'>
                        {/* Payment */}
                        {!order.is_paid && isOrderOnlinePayable(order) && (
                          <div className='w-full sm:w-auto'>
                            <button className='btn btn-primary btn-sm w-full' onClick={e => handlePayment(order)}>
                              پرداخت
                            </button>
                          </div>
                        )}
                        {/* PDF Link */}
                        {order?.pdf_file_url ? (
                          <div className='w-full sm:w-auto'>
                            <Link href={order.pdf_file_url} target='_blank'>
                              <span className='btn btn-secondary btn-sm btn-outline w-full flex flex-row flex-nowrap'>
                                <span className='lg:hidden'>دانلود</span>
                                <span className='hidden lg:flex'>دانلود پیش فاکتور</span>
                                <Download size={18} />
                              </span>
                            </Link>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    {/* Items (Products) */}
                    <div className='flex flex-col md:flex-row gap-2 md:gap-4 p-4'>
                      {order?.order_items?.map(orderItem => (
                        <div key={`order-item-${orderItem.id}`}>
                          {/* Product Image */}
                          <Link
                            href={`/product/${orderItem?.product?.product_code}/${orderItem?.product?.name}`}
                            className='w-full flex justify-center'
                          >
                            <div className='tooltip tooltip-info' data-tip={orderItem.product.name}>
                              <Image
                                src={orderItem?.product?.image ?? '/assets/placeholder/cart-item.svg'}
                                width={100}
                                height={100}
                                loading='eager'
                                alt={orderItem?.product?.name || 'تصویر محصول'}
                                className='object-cover bg-skin-thumbnail'
                              />
                              <div>{`تعداد : ${orderItem.quantity}`}</div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            // Empty Order
            <OrderEmpty text={activeTab.emptyText} />
          )}
        </div>
      </div>
    </div>
  );
}
