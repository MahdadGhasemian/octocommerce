import React, { ChangeEvent, useEffect, useState } from 'react';

interface NumberInputProps {
  initialValue?: number;
  onChange?: (value: number | '') => void;
}

// Convert Persian digits to Latin digits for parsing
const persianToLatinDigits = (str: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const latinDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return str.replace(
    /[۰-۹]/g,
    (char) => latinDigits[persianDigits.indexOf(char)]
  );
};

// Format number with commas in Persian locale
const formatNumberWithCommas = (number: number): string => {
  return new Intl.NumberFormat('fa-IR', {
    style: 'decimal',
  }).format(number);
};

const NumberInput: React.FC<NumberInputProps> = ({
  initialValue = 0,
  onChange,
}) => {
  const [value, setValue] = useState<string>(
    formatNumberWithCommas(initialValue)
  );

  useEffect(() => {
    setValue(formatNumberWithCommas(initialValue));
  }, [initialValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Replace commas and convert Persian digits to Latin digits
    const rawValue = persianToLatinDigits(
      event.target.value.replace(/,/g, '').replace(/٬/g, '')
    );
    const numberValue = parseFloat(rawValue);

    if (!isNaN(numberValue)) {
      setValue(formatNumberWithCommas(numberValue));
      if (onChange) {
        onChange(numberValue);
      }
    } else {
      setValue('');
      if (onChange) {
        onChange('');
      }
    }
  };

  return (
    <input
      type='text'
      value={value}
      onChange={handleChange}
      className='input w-full max-w-xs focus:border-transparent focus:outline-none text-2xl text-black/75 border-b-1 border-b-base-200 rounded-none'
      dir='ltr'
    />
  );
};

export default NumberInput;
