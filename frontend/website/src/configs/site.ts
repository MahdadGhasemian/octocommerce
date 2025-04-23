import { BaseUrl } from '@/configs/settings';

export const siteConfig = {
  title: 'اُکتو کامرس',
  main_title: 'فروشگاه اُکتو کامرس',
  description: 'نمونه یک فروشگاه آنلاین به همراه پنل مدیریت فروشگاه',
  application_name: 'اُکتو کامرس',
  phoneNumbers: ['0123456789', '01234567891', '01234567892'],
  supportPhoneNumber: '+0123456789',
  /** Without additional '/' on the end */
  url: `${BaseUrl}`,
  landing: {
    block1: {
      item1: {
        src: '/images/landing-images/1UF-400V-P-20MM.jpg',
        alt: '1UF-400V-P-20MM',
        link: 'search/category-335',
        title: 'انواع خازن های فیلم',
        btnText: 'مشاهده',
      },
      item2: {
        src: '/images/landing-images/STM32F103C8T6.jpg',
        alt: 'STM32F103C8T6',
        link: 'search/category-436',
        title: 'میکروکنترلرهای آرم ARM',
        btnText: 'همین حالا خرید کن',
      },
      item3: {
        src: '/images/landing-images/smd.jpg',
        alt: 'smd',
        link: 'users/login',
        title: 'انواع قطعات الکترونیک',
        description:
          'فروشگاه آنلاین اُکتو کامرس مجموعه‌ای گسترده از خازن‌، سلف‌ و مقاومت‌های SMD و THD را برای شما مشتریان گرامی تهیه کرده و با افتخار آماده ارسال می‌باشد.',
        btnText: 'ورود و خرید قطعات الکترونیک',
      },
    },
    block2: {
      products: [
        {
          name: 'بورد آماده STM32F103C8T6',
          description:
            'ماژول میکروکنترلر STM32F103C8T6 که می توان بر روی بردبورد هم نصب کرد. میکروکنترلر STM32F103C8T6 با هسته ARM Cortex M3 با حافظه 64KB و فرکانس کاری 72MHz ساخت شرکت ST می باشد.',
          src: '/images/landing-images/بورد-آماده-STM32F103C8T6.jpg',
          alt: 'محصول',
          link: 'product/4126',
          price: 90600,
          isHot: true,
        },
        {
          name: 'میکروکنترلر STM32F030C8T6',
          description:
            'میکروکنترلر STM32F030C8T6 یکی از میکروکنترلر های محبوب و اقتصادی شرکت ST است که دارای هسته ARM 32 بیتی از نوع CORTEX M0 با معماری از نوع RISC می باشد.',
          src: '/images/landing-images/STM32F030C8T6.jpg',
          alt: 'محصول',
          link: 'product/3514',
          price: 40400,
        },
        {
          name: 'تک سویچ مدل B3F 4055',
          src: '/images/landing-images/B3F-4055.jpg',
          description: 'تک سویچ امرون (CHINA) 10 mm 2-Pole Type Light Touch Switches 2mm Height',
          alt: 'B3F 4055',
          link: 'product/1738',
          price: 1560,
          isNew: true,
        },
        {
          name: 'LCD 4.3 INCH HY0430SC047 40',
          src: '/images/landing-images/LCD-4.3-INCH-HY0430SC047-40.jpg',
          alt: 'محصول',
          description: 'نمایشگر 4.3 اینچ مدل HY0430SC047 با 40 پین ',
          link: 'product/4570',
          price: 558500,
        },
      ],
    },
  },
};
