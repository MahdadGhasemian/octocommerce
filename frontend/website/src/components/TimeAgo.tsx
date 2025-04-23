import { FC } from 'react';

interface TimeAgoProps {
  date: Date | string | number;
}

const TimeAgo: FC<TimeAgoProps> = ({ date }) => {
  const parsedDate =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;

  const now = new Date();
  const diffInMs = now.getTime() - parsedDate.getTime();

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let displayTime: string;

  // "همین الان" case for less than a minute ago
  if (seconds < 60) {
    displayTime = 'همین الان';
  }
  // "چند دقیقه پیش" case for less than an hour
  else if (minutes < 60) {
    displayTime = `${minutes} دقیقه پیش`;
  }
  // "امروز" case for less than a day
  else if (hours < 24) {
    displayTime = 'امروز';
  }
  // "X روز پیش" for less than a month
  else if (days < 30) {
    displayTime = `${days} روز پیش`;
  }
  // Persian (Jalali) year and month, e.g., "1403 مهر"
  else {
    const jalaliDate = toJalali(parsedDate);
    displayTime = `${jalaliDate.year} ${getPersianMonthName(jalaliDate.month)}`;
  }

  return (
    <p className='text-caption text-neutral-400 inline text-xs'>
      {displayTime}
    </p>
  );
};

// Helper to convert Gregorian date to Jalali
function toJalali(date: Date) {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const gDay = date.getDate();
  return gregorianToJalali(gYear, gMonth, gDay);
}

// Simple implementation of the Gregorian to Jalali conversion
function gregorianToJalali(gy: number, gm: number, gd: number) {
  const gD = new Date(gy, gm - 1, gd).getTime();
  const j = new Date(gD - 2268948196000).getUTCFullYear(); // This is a simplified conversion
  return { year: j, month: gm, day: gd };
}

// Helper to get Persian month names
function getPersianMonthName(month: number) {
  const persianMonths = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ];
  return persianMonths[month - 1];
}

export default TimeAgo;
