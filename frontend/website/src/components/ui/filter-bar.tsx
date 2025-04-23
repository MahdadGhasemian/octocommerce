export default function FilterBar() {
  return (
    <div className='flex items-center border-complete-b-200 gap-4 sticky top-20 bg-neutral-000 lg:static'>
      <div className='break-words py-3'>
        <div className='flex items-center grow'>
          <div className='flex shrink-0 ml-2' data-cro-id='plp-sort-icon'>
            <svg className='w-6 h-6 fill-current text-gray-800'>
              <use xlinkHref='#sort'></use>
            </svg>
          </div>
          <p className='grow cursor-pointer whitespace-nowrap text-neutral-700 text-body2-strong'>
            <span className='relative'>مرتب سازی:</span>
          </p>
        </div>
      </div>
      <div className='flex gap-4'>
        <span
          className='cursor-pointer whitespace-nowrap text-body2-strong text-primary-700'
          data-cro-id='plp-sort'
        >
          مرتبط‌ترین
        </span>
        <span
          className='cursor-pointer whitespace-nowrap text-body-2 text-neutral-500'
          data-cro-id='plp-sort'
        >
          پربازدیدترین
        </span>
        <span
          className='cursor-pointer whitespace-nowrap text-body-2 text-neutral-500'
          data-cro-id='plp-sort'
        >
          جدیدترین
        </span>
        <span
          className='cursor-pointer whitespace-nowrap text-body-2 text-neutral-500'
          data-cro-id='plp-sort'
        >
          پرفروش‌ترین‌
        </span>
        <span
          className='cursor-pointer whitespace-nowrap text-body-2 text-neutral-500'
          data-cro-id='plp-sort'
        >
          ارزان‌ترین
        </span>
        <span
          className='cursor-pointer whitespace-nowrap text-body-2 text-neutral-500'
          data-cro-id='plp-sort'
        >
          گران‌ترین
        </span>
        <span
          className='cursor-pointer whitespace-nowrap text-body-2 text-neutral-500'
          data-cro-id='plp-sort'
        >
          سریع‌ترین ارسال
        </span>
        <span
          className='cursor-pointer whitespace-nowrap text-body-2 text-neutral-500'
          data-cro-id='plp-sort'
        >
          پیشنهاد خریداران
        </span>
        <span
          className='cursor-pointer whitespace-nowrap text-body-2 text-neutral-500'
          data-cro-id='plp-sort'
        >
          منتخب
        </span>
      </div>
      <div className='mr-auto block'>
        <span className='text-neutral-500 whitespace-nowrap text-body-2 ellipsis-1 xl:flex items-center gap-2'>
          ۳,۳۴۵ کالا
        </span>
      </div>
    </div>
  );
}
